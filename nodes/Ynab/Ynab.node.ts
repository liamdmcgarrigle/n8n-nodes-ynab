import {
    IDataObject,
    IExecuteFunctions,
    IHttpRequestOptions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
    NodeConnectionType,
    NodeOperationError,
} from 'n8n-workflow';
import { DateTime } from 'luxon';
import { resources } from './Resources';
import { budgetOperations } from './Descriptions/BudgetDescription';
import { accountsFields, accountsOperations } from './Descriptions/accountsDescription';
import { categoryFields, categoryOperations } from './Descriptions/categoryDescription';
import { getBugdetId } from './untils';
import { payeeFields, payeeOperations } from './Descriptions/payeeDescription';
import { payeeLocationsFields, payeeLocationsOperations } from './Descriptions/PayeeLocationsDescription';
import { monethsFields, monthsOperations } from './Descriptions/MonthsDescription';
import { transactionsFields, transactionsOperations } from './Descriptions/TransactionsDescription';
import { scheduledTransactionsFields, scheduledTransactionsOperations } from './Descriptions/ScheduledTransactionsDescription';

export class Ynab implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'YNAB',
		name: 'Ynab',
		group: ['Finance & Accounting'],
		version: 1,
		subtitle: '={{ $parameter["operation"] }}',
		description: 'Node for automating YNAB budget',
		defaults: {
			name: 'YNAB',
		},
		requestDefaults: {
			baseURL: '=https://api.ynab.com/v1/budgets/{{$credentials.budgetId}}',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		icon: 'file:ynabLogo.svg',
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'YnabApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				// eslint-disable-next-line n8n-nodes-base/node-param-default-wrong-for-options
				default: 'project',
				// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
				options: [
					...resources
				],
			},

			...budgetOperations,

			...accountsOperations,
			...accountsFields,

			...categoryOperations,
			...categoryFields,

			...payeeOperations,
			...payeeFields,

			...payeeLocationsOperations,
			...payeeLocationsFields,

			...monthsOperations,
			...monethsFields,

			...transactionsOperations,
			...transactionsFields,

			...scheduledTransactionsOperations,
			...scheduledTransactionsFields,
		],
	};

		async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
			const items = this.getInputData();
			let item: INodeExecutionData;

			const budgetId = await getBugdetId(this);
			const baseUrl = `https://api.ynab.com/v1/budgets/${budgetId}`;


			for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
				try {
					item = items[itemIndex];

					if( this.getNodeParameter('resource', 0) === 'budget' ) {

					// ------------------------------------------------------------------
					// ---------------------- BUDGET OPERATIONS ----------------------
					// ------------------------------------------------------------------
						if( this.getNodeParameter('operation', 0) === 'budgetDetails' ) {


							const options: IHttpRequestOptions = {
								url: baseUrl,
								method: 'GET',
							};

							const response = await this.helpers.httpRequestWithAuthentication.call(
								this,
								'YnabApi',
								options,
							);

							item.json = response['data']['budget'];
						}

						if( this.getNodeParameter('operation', 0) === 'budgetSettings' ) {


							const options: IHttpRequestOptions = {
								url: `${baseUrl}/settings`,
								method: 'GET',
							};

							const response = await this.helpers.httpRequestWithAuthentication.call(
								this,
								'YnabApi',
								options,
							);

							item.json = response['data']['settings'];
						}

					} // end of budget resourse


					if( this.getNodeParameter('resource', 0) === 'accounts' ) {

					// ------------------------------------------------------------------
					// ---------------------- ACCOUNT OPERATIONS ----------------------
					// ------------------------------------------------------------------
						if( this.getNodeParameter('operation', 0) === 'listAccounts' ) {


							const options: IHttpRequestOptions = {
								url: `${baseUrl}/accounts`,
								method: 'GET',
							};

							const response = await this.helpers.httpRequestWithAuthentication.call(
								this,
								'YnabApi',
								options,
							);

							item.json = response['data']['accounts'];
						}

						if( this.getNodeParameter('operation', 0) === 'getAccount' ) {

							const accountId = this.getNodeParameter('accountId', itemIndex, '') as string;

							const options: IHttpRequestOptions = {
								url: `${baseUrl}/accounts/${accountId}`,
								method: 'GET',
							};

							const response = await this.helpers.httpRequestWithAuthentication.call(
								this,
								'YnabApi',
								options,
							);

							item.json = response['data']['account'];
						}


						if( this.getNodeParameter('operation', 0) === 'createAccount' ) {

							const accountName = this.getNodeParameter('accountName', itemIndex, '') as string;
							const balance = this.getNodeParameter('balance', itemIndex, '') as number;
							const accountType = this.getNodeParameter('accountType', itemIndex, '') as string;

							const body = {
								"account": {
									"name": accountName,
									"balance":balance * 1_000, // not sure what standard they are using but this is needed
									"type": accountType,
									}
							};


							const options: IHttpRequestOptions = {
								url: `${baseUrl}/accounts`,
								method: 'POST',
								body: body,
							};

							const response = await this.helpers.httpRequestWithAuthentication.call(
								this,
								'YnabApi',
								options,
							);

							item.json = response['data']['account'];
						}

					} // end of account resourse


					if( this.getNodeParameter('resource', 0) === 'categories' ) {

					// ------------------------------------------------------------------
					// ---------------------- CATEGORY OPERATIONS ----------------------
					// ------------------------------------------------------------------
						if( this.getNodeParameter('operation', 0) === 'listCategories' ) {


							const options: IHttpRequestOptions = {
								url: `${baseUrl}/categories`,
								method: 'GET',
							};

							const response = await this.helpers.httpRequestWithAuthentication.call(
								this,
								'YnabApi',
								options,
							);

							item.json = response['data']['category_groups'];
						}

						if( this.getNodeParameter('operation', 0) === 'getCategory' ) {

							const categoryId = this.getNodeParameter('categoryId', itemIndex, '') as string;

							const additionalFields = this.getNodeParameter('additionalFields', itemIndex) as IDataObject; // gets values under additionalFields
							const date = additionalFields.categoriesMonth as string;

							const options: IHttpRequestOptions = {
								url: date ? `${baseUrl}/months/${date}/categories/${categoryId}` : `${baseUrl}/categories/${categoryId}`,
								method: 'GET',
							};

							const response = await this.helpers.httpRequestWithAuthentication.call(
								this,
								'YnabApi',
								options,
							);

							item.json = response['data']['category'];
						}


						if( this.getNodeParameter('operation', 0) === 'updateCategory' ) {

							const categoryId = this.getNodeParameter('categoryId', itemIndex, '') as string;

							const additionalFields = this.getNodeParameter('additionalFields', itemIndex) as IDataObject; // gets values under additionalFields
							const date = additionalFields.categoriesMonth as string;

							const name = this.getNodeParameter('name', itemIndex, '') as string;
							const note = this.getNodeParameter('note', itemIndex, '') as string;

							const body: any = {
								"category":{}
							};

							if (name) {
								body.category['name'] = name;
							}

							if (note) {
								body.category['note'] = note;
							}

							const options: IHttpRequestOptions = {
								url: date ? `${baseUrl}/months/${date}/categories/${categoryId}` : `${baseUrl}/categories/${categoryId}`,
								method: 'PATCH',
								body: body,
							};

							const response = await this.helpers.httpRequestWithAuthentication.call(
								this,
								'YnabApi',
								options,
							);

							item.json = response['data']['category'];
						}

					} // end of category resourse

					if( this.getNodeParameter('resource', 0) === 'payees' ) {

					// ------------------------------------------------------------------
					// ---------------------- PAYEE OPERATIONS ----------------------
					// ------------------------------------------------------------------
						if( this.getNodeParameter('operation', 0) === 'listPayees' ) {


							const options: IHttpRequestOptions = {
								url: `${baseUrl}/payees`,
								method: 'GET',
							};

							const response = await this.helpers.httpRequestWithAuthentication.call(
								this,
								'YnabApi',
								options,
							);

							item.json = response['data'];
						}

						if( this.getNodeParameter('operation', 0) === 'getPayee' ) {

							const payeeId = this.getNodeParameter('payeeId', itemIndex, '') as string;


							const options: IHttpRequestOptions = {
								url: `${baseUrl}/payees/${payeeId}`,
								method: 'GET',
							};

							const response = await this.helpers.httpRequestWithAuthentication.call(
								this,
								'YnabApi',
								options,
							);

							item.json = response['data']['payee'];
						}


						if( this.getNodeParameter('operation', 0) === 'updatePayee' ) {

							const payeeId = this.getNodeParameter('payeeId', itemIndex, '') as string;

							const name = this.getNodeParameter('name', itemIndex, '') as string;

							const body: any = {
								"payee":{}
							};

							if (name) {
								body.payee['name'] = name;
							}

							const options: IHttpRequestOptions = {
								url: `${baseUrl}/payees/${payeeId}`,
								method: 'PATCH',
								body: body,
							};

							const response = await this.helpers.httpRequestWithAuthentication.call(
								this,
								'YnabApi',
								options,
							);

							item.json = response['data']['payee'];
						}

					} // end of payee resourse

					if( this.getNodeParameter('resource', 0) === 'payeeLocations' ) {


					// ------------------------------------------------------------------
					// ---------------------- PAYEE LOCATIONS OPERATIONS ----------------------
					// ------------------------------------------------------------------
						if( this.getNodeParameter('operation', 0) === 'listPayeesLocations' ) {


							const options: IHttpRequestOptions = {
								url: `${baseUrl}/payee_locations`,
								method: 'GET',
							};

							const response = await this.helpers.httpRequestWithAuthentication.call(
								this,
								'YnabApi',
								options,
							);

							item.json = response['data']['payee_locations'];
						}

						if( this.getNodeParameter('operation', 0) === 'getLocationById' ) {

							const locationId = this.getNodeParameter('locationId', itemIndex, '') as string;


							const options: IHttpRequestOptions = {
								url: `${baseUrl}/payee_locations/${locationId}`,
								method: 'GET',
							};

							const response = await this.helpers.httpRequestWithAuthentication.call(
								this,
								'YnabApi',
								options,
							);

							item.json = response['data'];
						}


						if( this.getNodeParameter('operation', 0) === 'getLocationByPayee' ) {

							const payeeId = this.getNodeParameter('payeeId', itemIndex, '') as string;


							const options: IHttpRequestOptions = {
								url: `${baseUrl}/payees/${payeeId}/payee_locations`,
								method: 'GET',
							};

							const response = await this.helpers.httpRequestWithAuthentication.call(
								this,
								'YnabApi',
								options,
							);

							item.json = response['data'];
						}

					} // end of payee locatiosn resourse


					if( this.getNodeParameter('resource', 0) === 'months' ) {


					// ------------------------------------------------------------------
					// ---------------------- MONTHS OPERATIONS ----------------------
					// ------------------------------------------------------------------
						if( this.getNodeParameter('operation', 0) === 'listMonths' ) {


							const options: IHttpRequestOptions = {
								url: `${baseUrl}/months`,
								method: 'GET',
							};

							const response = await this.helpers.httpRequestWithAuthentication.call(
								this,
								'YnabApi',
								options,
							);

							item.json = response['data'];
						}

						if( this.getNodeParameter('operation', 0) === 'getMonth' ) {

							// This endpoint is picky about the format being exact
							// so im extracting the yyyy-MM then adding in the '-01'
							const inputDate = this.getNodeParameter('month', itemIndex, '') as string;
							const date = DateTime.fromISO(inputDate).toFormat('yyyy-MM');


							const options: IHttpRequestOptions = {
								url: `${baseUrl}/months/${date}-01`,
								method: 'GET',
							};

							const response = await this.helpers.httpRequestWithAuthentication.call(
								this,
								'YnabApi',
								options,
							);

							item.json = response['data']['month'];
						}


						if( this.getNodeParameter('operation', 0) === 'getLocationByPayee' ) {

							const payeeId = this.getNodeParameter('payeeId', itemIndex, '') as string;


							const options: IHttpRequestOptions = {
								url: `${baseUrl}/payees/${payeeId}/payee_locations`,
								method: 'GET',
							};

							const response = await this.helpers.httpRequestWithAuthentication.call(
								this,
								'YnabApi',
								options,
							);

							item.json = response['data'];
						}

					} // end of month resourse

					if( this.getNodeParameter('resource', 0) === 'transactions' ) {


					// ------------------------------------------------------------------
					// ---------------------- TRANSACTIONS OPERATIONS ----------------------
					// ------------------------------------------------------------------
						if( this.getNodeParameter('operation', 0) === 'listTransactions' ) {

							const since = this.getNodeParameter('since', itemIndex, '') as string;
							const sinceDate = DateTime.fromISO(since).toFormat('yyyy-MM-dd');


							const options: IHttpRequestOptions = {
								url: `${baseUrl}/transactions`,
								method: 'GET',
							};

							if (since) {
								options.qs = {'since_date': sinceDate };
							}

							const response = await this.helpers.httpRequestWithAuthentication.call(
								this,
								'YnabApi',
								options,
							);

							item.json = response['data'];
						}

						if( this.getNodeParameter('operation', 0) === 'getTransaction' ) {

							const transactionId = this.getNodeParameter('transactionId', itemIndex, '') as string;


							const options: IHttpRequestOptions = {
								url: `${baseUrl}/transactions/${transactionId}`,
								method: 'GET',
							};

							const response = await this.helpers.httpRequestWithAuthentication.call(
								this,
								'YnabApi',
								options,
							);

							item.json = response['data']['transaction'];
						}

						if( this.getNodeParameter('operation', 0) === 'getTransactionByCategory' ) {

							const since = this.getNodeParameter('since', itemIndex, '') as string;
							const sinceDate = DateTime.fromISO(since).toFormat('yyyy-MM-dd');

							const categoryId = this.getNodeParameter('categoryId', itemIndex, '') as string;


							const options: IHttpRequestOptions = {
								url: `${baseUrl}/categories/${categoryId}/transactions`,
								method: 'GET',
							};

							if (since) {
								options.qs = {'since_date': sinceDate };
							}

							const response = await this.helpers.httpRequestWithAuthentication.call(
								this,
								'YnabApi',
								options,
							);

							item.json = response['data'];
						}

						if( this.getNodeParameter('operation', 0) === 'getTransactionByPayee' ) {

							const since = this.getNodeParameter('since', itemIndex, '') as string;
							const sinceDate = DateTime.fromISO(since).toFormat('yyyy-MM-dd');

							const payeeId = this.getNodeParameter('payeeId', itemIndex, '') as string;


							const options: IHttpRequestOptions = {
								url: `${baseUrl}/payees/${payeeId}/transactions`,
								method: 'GET',
							};

							if (since) {
								options.qs = {'since_date': sinceDate };
							}

							const response = await this.helpers.httpRequestWithAuthentication.call(
								this,
								'YnabApi',
								options,
							);

							item.json = response['data'];
						}

						if( this.getNodeParameter('operation', 0) === 'getTransactionByMonth' ) {

							const inputDate = this.getNodeParameter('month', itemIndex, '') as string;
							const date = DateTime.fromISO(inputDate).toFormat('yyyy-MM');


							const options: IHttpRequestOptions = {
								url: `${baseUrl}/months/${date}-01/transactions`,
								method: 'GET',
							};

							const response = await this.helpers.httpRequestWithAuthentication.call(
								this,
								'YnabApi',
								options,
							);

							item.json = response['data'];
						}

						if( this.getNodeParameter('operation', 0) === 'getLocationByPayee' ) {

							const payeeId = this.getNodeParameter('payeeId', itemIndex, '') as string;


							const options: IHttpRequestOptions = {
								url: `${baseUrl}/payees/${payeeId}/payee_locations`,
								method: 'GET',
							};

							const response = await this.helpers.httpRequestWithAuthentication.call(
								this,
								'YnabApi',
								options,
							);

							item.json = response['data'];
						}

						if( this.getNodeParameter('operation', 0) === 'createTransaction' ) {


							const amount = (this.getNodeParameter('amount', itemIndex, '') as number) * 1_000;
							const accountId = this.getNodeParameter('accountId', itemIndex, '') as string;


							const inputDate = this.getNodeParameter('date', itemIndex, '') as string;
							const date = DateTime.fromISO(inputDate).toFormat('yyyy-MM-dd');

							const additionalFields = this.getNodeParameter('additionalFields', itemIndex) as IDataObject; // gets values under additionalFields
							const subtransactions = (additionalFields.subtransactions as any)?.subtransactionFields as any;
							subtransactions?.map((i: { amount: number; }) => i.amount *= 1_000 );
							const payeeId = additionalFields.payeeId;
							const payeeName = additionalFields.payeeName;
							const categoryId = additionalFields.categoryId;
							const memo = additionalFields.memo;
							const cleared = additionalFields.cleared;

							const body: any = {
								transaction: {
									date: date,
									account_id: accountId,
								}
							}

							if (amount) {
								body.transaction.amount = amount;
							}

							if (payeeId) {
								body.transaction.payee_id = payeeId;
							}

							if (payeeName) {
								body.transaction.payee_name = payeeName;
							}

							if (categoryId) {
								body.transaction.category_id = categoryId;
							}

							if (memo) {
								body.transaction.memo = memo;
							}

							if (cleared) {
								body.transaction.cleared = cleared;
							}

							if (subtransactions) {
								body.transaction.subtransactions = subtransactions;
							}


							const options: IHttpRequestOptions = {
								url: `${baseUrl}/transactions`,
								method: 'POST',
								body: body,
							};

							const response = await this.helpers.httpRequestWithAuthentication.call(
								this,
								'YnabApi',
								options,
							);

							item.json = response['data']['transaction'];
						}

						if( this.getNodeParameter('operation', 0) === 'createTransactions' ) {

							const jsonInput = this.getNodeParameter('transactionsJson', itemIndex, '') as string;
							const parsedJson = JSON.parse(jsonInput);
							parsedJson.map((i: { amount: number; }) => i.amount *= 1_000);

							const body = {
								transactions: parsedJson
							}

							const options: IHttpRequestOptions = {
								url: `${baseUrl}/transactions`,
								method: 'POST',
								body: body,
							};

							const response = await this.helpers.httpRequestWithAuthentication.call(
								this,
								'YnabApi',
								options,
							);

							item.json = response['data'];
							// item.json.thing = body;
						}

						if( this.getNodeParameter('operation', 0) === 'updateTransaction' ) {


							const transactionId = this.getNodeParameter('transactionId', itemIndex, '') as string;
							const amount = (this.getNodeParameter('amount', itemIndex, '') as number) * 1_000;
							const accountId = this.getNodeParameter('accountId', itemIndex, '') as string;


							const inputDate = this.getNodeParameter('date', itemIndex, '') as string;
							const date = DateTime.fromISO(inputDate).toFormat('yyyy-MM-dd');

							const additionalFields = this.getNodeParameter('additionalFields', itemIndex) as IDataObject; // gets values under additionalFields
							const subtransactions = (additionalFields.subtransactions as any)?.subtransactionFields as any;
							subtransactions?.map((i: { amount: number; }) => i.amount *= 1_000 );
							const payeeId = additionalFields.payeeId;
							const payeeName = additionalFields.payeeName;
							const categoryId = additionalFields.categoryId;
							const memo = additionalFields.memo;
							const cleared = additionalFields.cleared;

							const body: any = {
								transaction: {}
							}

							if (inputDate) {
								body.transaction.date = date;
							}

							if (accountId) {
								body.transaction.account_id = accountId;
							}

							if (amount) {
								body.transaction.amount = amount;
							}

							if (payeeId) {
								body.transaction.payee_id = payeeId;
							}

							if (payeeName) {
								body.transaction.payee_name = payeeName;
							}

							if (categoryId) {
								body.transaction.category_id = categoryId;
							}

							if (memo) {
								body.transaction.memo = memo;
							}

							if (cleared) {
								body.transaction.cleared = cleared;
							}

							if (subtransactions) {
								body.transaction.subtransactions = subtransactions;
							}


							const options: IHttpRequestOptions = {
								url: `${baseUrl}/transactions/${transactionId}`,
								method: 'PUT',
								body: body,
							};

							const response = await this.helpers.httpRequestWithAuthentication.call(
								this,
								'YnabApi',
								options,
							);

							item.json = response['data']['transaction'];
						}

						if( this.getNodeParameter('operation', 0) === 'deleteTransaction' ) {

							const transactionId = this.getNodeParameter('transactionId', itemIndex, '') as string;


							const options: IHttpRequestOptions = {
								url: `${baseUrl}/transactions/${transactionId}`,
								method: 'DELETE',
							};

							const response = await this.helpers.httpRequestWithAuthentication.call(
								this,
								'YnabApi',
								options,
							);

							item.json = response['data']['transaction'];
						}

					} // end of transaction resourse

					if( this.getNodeParameter('resource', 0) === 'scheduledTransactions' ) {


					// ------------------------------------------------------------------
					// ---------------------- SCHEDULED TRANSACTIONS OPERATIONS ----------------------
					// ------------------------------------------------------------------
						if( this.getNodeParameter('operation', 0) === 'listScheduledTransactions' ) {

							const options: IHttpRequestOptions = {
								url: `${baseUrl}/scheduled_transactions`,
								method: 'GET',
							};

							const response = await this.helpers.httpRequestWithAuthentication.call(
								this,
								'YnabApi',
								options,
							);

							item.json = response['data'];
						}

						if( this.getNodeParameter('operation', 0) === 'getScheduledTransaction' ) {

							const scheduledTransactionId = this.getNodeParameter('scheduledTransactionId', itemIndex, '') as string;


							const options: IHttpRequestOptions = {
								url: `${baseUrl}/scheduled_transactions/${scheduledTransactionId}`,
								method: 'GET',
							};

							const response = await this.helpers.httpRequestWithAuthentication.call(
								this,
								'YnabApi',
								options,
							);

							item.json = response['data']['scheduled_transaction'];
						}

						if( this.getNodeParameter('operation', 0) === 'createScheduledTransaction' ) {


							const amount = (this.getNodeParameter('amount', itemIndex, '') as number) * 1_000;
							const accountId = this.getNodeParameter('accountId', itemIndex, '') as string;
							const frequency = this.getNodeParameter('frequency', itemIndex, '') as string;


							const inputDate = this.getNodeParameter('date', itemIndex, '') as string;
							const date = DateTime.fromISO(inputDate).toFormat('yyyy-MM-dd');

							const additionalFields = this.getNodeParameter('additionalFields', itemIndex) as IDataObject; // gets values under additionalFields
							const subtransactions = (additionalFields.subtransactions as any)?.subtransactionFields as any;
							subtransactions?.map((i: { amount: number; }) => i.amount *= 1_000 );
							const payeeId = additionalFields.payeeId;
							const payeeName = additionalFields.payeeName;
							const categoryId = additionalFields.categoryId;
							const memo = additionalFields.memo;

							const body: any = {
								scheduled_transaction: {
									date: date,
									account_id: accountId,
									frequency: frequency,
								}
							}

							if (amount) {
								body.scheduled_transaction.amount = amount;
							}

							if (payeeId) {
								body.scheduled_transaction.payee_id = payeeId;
							}

							if (payeeName) {
								body.scheduled_transaction.payee_name = payeeName;
							}

							if (categoryId) {
								body.scheduled_transaction.category_id = categoryId;
							}

							if (memo) {
								body.scheduled_transaction.memo = memo;
							}

							if (subtransactions) {
								body.scheduled_transaction.subtransactions = subtransactions;
							}

							const options: IHttpRequestOptions = {
								url: `${baseUrl}/scheduled_transactions`,
								method: 'POST',
								body: body,
							};

							const response = await this.helpers.httpRequestWithAuthentication.call(
								this,
								'YnabApi',
								options,
							);

							item.json = response['data']['scheduled_transaction'];
						}

						if( this.getNodeParameter('operation', 0) === 'updateScheduledTransaction' ) {


							const scheduledTransactionId = this.getNodeParameter('scheduledTransactionId', itemIndex, '') as string;
							const amount = (this.getNodeParameter('amount', itemIndex, '') as number) * 1_000;
							const accountId = this.getNodeParameter('accountId', itemIndex, '') as string;
							const frequency = this.getNodeParameter('frequency', itemIndex, '') as string;


							const inputDate = this.getNodeParameter('date', itemIndex, '') as string;
							const date = DateTime.fromISO(inputDate).toFormat('yyyy-MM-dd');

							const additionalFields = this.getNodeParameter('additionalFields', itemIndex) as IDataObject; // gets values under additionalFields
							const subtransactions = (additionalFields.subtransactions as any)?.subtransactionFields as any;
							subtransactions?.map((i: { amount: number; }) => i.amount *= 1_000 );
							const payeeId = additionalFields.payeeId;
							const payeeName = additionalFields.payeeName;
							const categoryId = additionalFields.categoryId;
							const memo = additionalFields.memo;

							const body: any = {
								scheduled_transaction: { 	}
							}

							if (frequency) {
								body.scheduled_transaction.frequency = frequency;
							}

							if (accountId) {
								body.scheduled_transaction.account_id = accountId;
							}

							if (inputDate) {
								body.scheduled_transaction.date = date;
							}

							if (amount) {
								body.scheduled_transaction.amount = amount;
							}

							if (payeeId) {
								body.scheduled_transaction.payee_id = payeeId;
							}

							if (payeeName) {
								body.scheduled_transaction.payee_name = payeeName;
							}

							if (categoryId) {
								body.scheduled_transaction.category_id = categoryId;
							}

							if (memo) {
								body.scheduled_transaction.memo = memo;
							}

							if (subtransactions) {
								body.scheduled_transaction.subtransactions = subtransactions;
							}

							const options: IHttpRequestOptions = {
								url: `${baseUrl}/scheduled_transactions/${scheduledTransactionId}`,
								method: 'PATCH',
								body: body,
							};

							const response = await this.helpers.httpRequestWithAuthentication.call(
								this,
								'YnabApi',
								options,
							);

							item.json = response['data']['scheduled_transaction'];
						}
						if( this.getNodeParameter('operation', 0) === 'updateTransaction' ) {


							const transactionId = this.getNodeParameter('transactionId', itemIndex, '') as string;
							const amount = (this.getNodeParameter('amount', itemIndex, '') as number) * 1_000;
							const accountId = this.getNodeParameter('accountId', itemIndex, '') as string;


							const inputDate = this.getNodeParameter('date', itemIndex, '') as string;
							const date = DateTime.fromISO(inputDate).toFormat('yyyy-MM-dd');

							const additionalFields = this.getNodeParameter('additionalFields', itemIndex) as IDataObject; // gets values under additionalFields
							const subtransactions = (additionalFields.subtransactions as any)?.subtransactionFields as any;
							subtransactions?.map((i: { amount: number; }) => i.amount *= 1_000 );
							const payeeId = additionalFields.payeeId;
							const payeeName = additionalFields.payeeName;
							const categoryId = additionalFields.categoryId;
							const memo = additionalFields.memo;
							const cleared = additionalFields.cleared;
							const frequency = additionalFields.frequency;


							const body: any = {
								transaction: {}
							}

							if (inputDate) {
								body.transaction.date = date;
							}

							if (accountId) {
								body.transaction.account_id = accountId;
							}

							if (amount) {
								body.transaction.amount = amount;
							}

							if (payeeId) {
								body.transaction.payee_id = payeeId;
							}

							if (payeeName) {
								body.transaction.payee_name = payeeName;
							}

							if (categoryId) {
								body.transaction.category_id = categoryId;
							}

							if (memo) {
								body.transaction.memo = memo;
							}

							if (cleared) {
								body.transaction.cleared = cleared;
							}

							if (frequency) {
								body.transaction.frequency = frequency;
							}


							if (subtransactions) {
								body.transaction.subtransactions = subtransactions;
							}


							const options: IHttpRequestOptions = {
								url: `${baseUrl}/transactions/${transactionId}`,
								method: 'PUT',
								body: body,
							};

							const response = await this.helpers.httpRequestWithAuthentication.call(
								this,
								'YnabApi',
								options,
							);

							item.json = response['data']['transaction'];
						}

						if( this.getNodeParameter('operation', 0) === 'deleteTransaction' ) {

							const transactionId = this.getNodeParameter('transactionId', itemIndex, '') as string;


							const options: IHttpRequestOptions = {
								url: `${baseUrl}/transactions/${transactionId}`,
								method: 'DELETE',
							};

							const response = await this.helpers.httpRequestWithAuthentication.call(
								this,
								'YnabApi',
								options,
							);

							item.json = response['data']['transaction'];
						}

					} // end of transaction resourse


				} catch (error) {

					// This node should never fail but we want to showcase how
					// to handle errors.
					if (this.continueOnFail()) {
						items.push({ json: this.getInputData(itemIndex)[0].json, error, pairedItem: itemIndex });
					} else {
						// Adding `itemIndex` allows other workflows to handle this error
						if (error.context) {
							// If the error thrown already contains the context property,
							// only append the itemIndex
							error.context.itemIndex = itemIndex;
							throw error;
						}
						throw new NodeOperationError(this.getNode(), error, {
							itemIndex,
						});
					}
				}
			}

			return this.prepareOutputData(items);
		}
	};

