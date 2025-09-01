import type {
	IDataObject,
	ILoadOptionsFunctions,
	INodeExecutionData,
	INodePropertyOptions,
	INodeType,
	INodeTypeDescription,
	IPollFunctions,
	IHttpRequestOptions,
} from 'n8n-workflow';
import { NodeConnectionType } from 'n8n-workflow';

type Milliunits = number;

interface YnabStaticData {
	lastKnowledgeOfServer?: number;
	processedIds?: string[]; // ring buffer for tx/scheduled ids we've already emitted
	accountBalances?: Record<string, Milliunits>;
	categoryBalances?: Record<string, Milliunits>;
}

// after doing the entire regular node by hand, i got quite lazy and vibe coded the entire trigger.
// while it wasn't exactly one shot, it surprizingly ended up managing it.
// I am not extensivly testing this for now though. If you're here, i guess the vibes have failed you

const BASE_URL = 'https://api.ynab.com/v1';

function asCurrency(milli: Milliunits | undefined | null) {
	return milli == null ? null : milli / 1000;
}

async function apiRequest(
	this: ILoadOptionsFunctions | IPollFunctions,
	method: IHttpRequestOptions['method'],
	endpoint: string,
	qs?: IDataObject,
): Promise<any> {
	const options: IHttpRequestOptions = {
		method,
		url: `${BASE_URL}${endpoint}`,
		qs,
		returnFullResponse: false,
	};
	// Will inject Authorization and handle refresh based on `YnabApi` credentials
	// Do NOT call getCredentials() directly for auth.
	return await this.helpers.httpRequestWithAuthentication.call(this, 'YnabApi', options);
}

export class YnabTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'YNAB Trigger',
		name: 'ynabTrigger',
		icon: 'file:ynabLogo.svg',
		group: ['trigger'],
		version: 1,
		description: 'Trigger n8n with YNAB events using polling',
		subtitle: '={{$parameter["event"]}}',
		defaults: { name: 'YNAB Trigger' },
		polling: true,
		inputs: [],
		outputs: [NodeConnectionType.Main],
		credentials: [{ name: 'YnabApi', required: true }],
		properties: [
			{
				displayName: 'Event',
				name: 'event',
				type: 'options',
				default: 'transactionAdded',
				required: true,
				// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
				options: [
					{ name: 'Transaction Added', value: 'transactionAdded', description: 'New transaction created' },
					{ name: 'Transaction Updated', value: 'transactionUpdated', description: 'Existing transaction changed' },
					{ name: 'Account Balance Changed', value: 'accountBalanceChanged', description: 'Account balance delta' },
					{ name: 'Category Balance Changed', value: 'categoryBalanceChanged', description: 'Category balance delta' },
					{ name: 'Scheduled Transaction Created', value: 'scheduledTransactionCreated', description: 'New scheduled tx' },
					{ name: 'Scheduled Transaction Updated', value: 'scheduledTransactionUpdated', description: 'Scheduled tx changed' },
				],
			},
			{
				displayName: 'Filters',
				name: 'filters',
				type: 'collection',
				placeholder: 'Add Filter',
				default: {},
				displayOptions: { show: { event: ['transactionAdded', 'transactionUpdated'] } },
				// eslint-disable-next-line n8n-nodes-base/node-param-collection-type-unsorted-items
				options: [
					{
						displayName: 'Account Name or ID',
						name: 'accountId',
						type: 'options',
						typeOptions: { loadOptionsMethod: 'getAccounts' },
						default: '',
						description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
					},
					{
						displayName: 'Category Name or ID',
						name: 'categoryId',
						type: 'options',
						typeOptions: { loadOptionsMethod: 'getCategories' },
						default: '',
						description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
					},
					{
						displayName: 'Payee Name or ID',
						name: 'payeeId',
						type: 'options',
						typeOptions: { loadOptionsMethod: 'getPayees' },
						default: '',
						description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
					},
					{
						displayName: 'Minimum Amount',
						name: 'minAmount',
						type: 'number',
						default: 0,
						description: 'Trigger only if |amount| ≥ this value (currency units)',
					},
					{
						displayName: 'Transaction Type',
						name: 'transactionType',
						type: 'options',
						options: [
							{ name: 'All', value: 'all' },
							{ name: 'Uncategorized', value: 'uncategorized' },
							{ name: 'Unapproved', value: 'unapproved' },
						],
						default: 'all',
						description: 'Filter by transaction type',
					},
					{
						displayName: 'Include Transfers',
						name: 'includeTransfers',
						type: 'boolean',
						default: true,
						description: 'Whether to include transfer transactions',
					},
				],
			},
			{
				displayName: 'Options',
				name: 'options',
				type: 'collection',
				placeholder: 'Add Option',
				default: {},
				options: [
					{
						displayName: 'Whether Subtransactions Are Included',
						name: 'includeSubtransactions',
						type: 'boolean',
						default: false,
						description: 'Whether to include subtransactions for splits',
						displayOptions: { show: { '/event': ['transactionAdded', 'transactionUpdated'] } },
					},
					{
						displayName: 'Whether Deleted Are Included',
						name: 'includeDeleted',
						type: 'boolean',
						default: false,
						description: 'Whether to trigger for deleted items too',
					},
				],
			},
		],
	};

	methods = {
		loadOptions: {
			async getAccounts(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const { budgetId } = (await this.getCredentials('YnabApi')) as IDataObject;
				const res = await apiRequest.call(this, 'GET', `/budgets/${budgetId}/accounts`);
				const out: INodePropertyOptions[] = [{ name: 'All Accounts', value: '' }];
				for (const a of res?.data?.accounts ?? []) {
					if (!a.deleted && !a.closed) out.push({ name: a.name, value: a.id });
				}
				return out;
			},
			async getCategories(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const { budgetId } = (await this.getCredentials('YnabApi')) as IDataObject;
				const res = await apiRequest.call(this, 'GET', `/budgets/${budgetId}/categories`);
				const out: INodePropertyOptions[] = [{ name: 'All Categories', value: '' }];
				for (const g of res?.data?.category_groups ?? []) {
					if (g.hidden || g.deleted) continue;
					for (const c of g.categories ?? []) {
						if (!c.hidden && !c.deleted) out.push({ name: `${g.name}: ${c.name}`, value: c.id });
					}
				}
				return out;
			},
			async getPayees(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const { budgetId } = (await this.getCredentials('YnabApi')) as IDataObject;
				const res = await apiRequest.call(this, 'GET', `/budgets/${budgetId}/payees`);
				const out: INodePropertyOptions[] = [{ name: 'All Payees', value: '' }];
				for (const p of res?.data?.payees ?? []) if (!p.deleted) out.push({ name: p.name, value: p.id });
				// Keep "All Payees" on top
				return out.sort((a, b) => (a.name === 'All Payees' ? -1 : b.name === 'All Payees' ? 1 : a.name.localeCompare(b.name)));
			},
		},
	};

	async poll(this: IPollFunctions): Promise<INodeExecutionData[][] | null> {
		const state = this.getWorkflowStaticData('node') as YnabStaticData;
		const { budgetId } = (await this.getCredentials('YnabApi')) as IDataObject;

		const event = this.getNodeParameter('event') as string;
		const filters = this.getNodeParameter('filters', {}) as IDataObject;
		const options = this.getNodeParameter('options', {}) as IDataObject;

		const items: INodeExecutionData[] = [];

		// Ensure ring buffer exists
		state.processedIds ??= [];

		const includeDeleted = Boolean(options.includeDeleted);

		const pushAndTrim = (id: string) => {
			state.processedIds!.push(id);
			if (state.processedIds!.length > 1000) state.processedIds = state.processedIds!.slice(-500);
		};

		try {
			// ---------- Transactions (added/updated) ----------
			if (event === 'transactionAdded' || event === 'transactionUpdated') {
				const qs: IDataObject = {};
				if (state.lastKnowledgeOfServer != null) qs.last_knowledge_of_server = state.lastKnowledgeOfServer;

				if (filters.transactionType && filters.transactionType !== 'all') qs.type = filters.transactionType;

				let endpoint = `/budgets/${budgetId}/transactions`;
				if (filters.accountId) endpoint = `/budgets/${budgetId}/accounts/${filters.accountId}/transactions`;
				else if (filters.categoryId) endpoint = `/budgets/${budgetId}/categories/${filters.categoryId}/transactions`;
				else if (filters.payeeId) endpoint = `/budgets/${budgetId}/payees/${filters.payeeId}/transactions`;

				const res = await apiRequest.call(this, 'GET', endpoint, qs);
				const txs = res?.data?.transactions ?? [];
				const serverKnowledge = res?.data?.server_knowledge as number | undefined;
				for (const t of txs) {
					if (!includeDeleted && t.deleted) continue;
					if (filters.includeTransfers === false && t.transfer_account_id) continue;
					if (filters.minAmount && Math.abs(t.amount / 1000) < (filters.minAmount as number)) continue;

					const isNew = !state.processedIds!.includes(t.id);
					const fire =
						(event === 'transactionAdded' && isNew) ||
						(event === 'transactionUpdated' && !isNew);

					if (fire) {
						t.amount_currency = asCurrency(t.amount);
						t.event_type = isNew ? 'added' : 'updated';
						items.push({ json: t });

						if (options.includeSubtransactions && t.subtransactions?.length) {
							for (const s of t.subtransactions) {
								s.amount_currency = asCurrency(s.amount);
								s.parent_transaction_id = t.id;
								items.push({ json: s });
							}
						}
					}
					if (isNew) pushAndTrim(t.id);
				}
				if (serverKnowledge != null) state.lastKnowledgeOfServer = serverKnowledge;
			}

			// ---------- Account balance changes ----------
			else if (event === 'accountBalanceChanged') {
				const qs: IDataObject = {};
				if (state.lastKnowledgeOfServer != null) qs.last_knowledge_of_server = state.lastKnowledgeOfServer;

				const res = await apiRequest.call(this, 'GET', `/budgets/${budgetId}/accounts`, qs);
				const accounts = res?.data?.accounts ?? [];
				const serverKnowledge = res?.data?.server_knowledge as number | undefined;

				state.accountBalances ??= {};
				for (const a of accounts) {
					if (!includeDeleted && a.deleted) continue;
					const prev = state.accountBalances[a.id];
					const changed = prev !== undefined && prev !== a.balance;

					// Update snapshot first so next loop is correct
					state.accountBalances[a.id] = a.balance;

					if (changed) {
						a.previous_balance_currency = asCurrency(prev ?? null);
						a.balance_change = prev != null ? asCurrency(a.balance - prev) : null;
						a.balance_currency = asCurrency(a.balance);
						a.cleared_balance_currency = asCurrency(a.cleared_balance);
						a.uncleared_balance_currency = asCurrency(a.uncleared_balance);
						items.push({ json: a });
					}
				}
				if (serverKnowledge != null) state.lastKnowledgeOfServer = serverKnowledge;
			}

			// ---------- Category balance changes ----------
			else if (event === 'categoryBalanceChanged') {
				const res = await apiRequest.call(this, 'GET', `/budgets/${budgetId}/categories`);
				state.categoryBalances ??= {};

				for (const g of res?.data?.category_groups ?? []) {
					if (g.deleted) continue;
					for (const c of g.categories ?? []) {
						if (!includeDeleted && c.deleted) continue;
						const prev = state.categoryBalances[c.id];
						const changed = prev !== undefined && prev !== c.balance;

						// Update snapshot first
						state.categoryBalances[c.id] = c.balance;

						if (changed) {
							c.category_group_name = g.name;
							c.previous_balance_currency = asCurrency(prev ?? null);
							c.balance_change = prev != null ? asCurrency(c.balance - prev) : null;
							c.balance_currency = asCurrency(c.balance);
							c.activity_currency = asCurrency(c.activity);
							c.budgeted_currency = asCurrency(c.budgeted);
							items.push({ json: c });
						}
					}
				}
			}

			// ---------- Scheduled transactions (created/updated) ----------
			else if (event === 'scheduledTransactionCreated' || event === 'scheduledTransactionUpdated') {
				const qs: IDataObject = {};
				if (state.lastKnowledgeOfServer != null) qs.last_knowledge_of_server = state.lastKnowledgeOfServer;

				const res = await apiRequest.call(this, 'GET', `/budgets/${budgetId}/scheduled_transactions`, qs);
				const sched = res?.data?.scheduled_transactions ?? [];
				const serverKnowledge = res?.data?.server_knowledge as number | undefined;

				for (const st of sched) {
					if (!includeDeleted && st.deleted) continue;

					const isNew = !state.processedIds!.includes(st.id);
					const fire =
						(event === 'scheduledTransactionCreated' && isNew) ||
						(event === 'scheduledTransactionUpdated' && !isNew);

					if (fire) {
						st.amount_currency = asCurrency(st.amount);
						st.event_type = isNew ? 'created' : 'updated';
						items.push({ json: st });
					}
					if (isNew) pushAndTrim(st.id);
				}
				if (serverKnowledge != null) state.lastKnowledgeOfServer = serverKnowledge;
			}
		} catch (error: any) {
			// In manual mode surface the error; in production log & swallow
			if (this.getMode() === 'manual') throw error;
			this.logger.error(`YNAB Trigger error: ${error?.message ?? error}`, { error });
		}

		return items.length ? [items] : null;
	}
}

