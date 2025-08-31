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
// import { projectFields, projectOperations } from './Descriptions/ProjectDescription';
// import { notBuildNotice } from './NotBuiltYetNotice';
// import { projectPhotoFields, projectPhotoOperations } from './Descriptions/ProjectPhotoDescription';
// import { projectDocumentOperations } from './Descriptions/ProjectDocumentDescription';
// import { projectUserOperations } from './Descriptions/ProjectUserDescription';
// import { projectLabelOperations } from './Descriptions/ProjectLabelDescription';
import { resources } from './Resources';
// import { userOperations } from './UserDescription';
// import { tagOperations } from './TagDescription';
// import { groupOperations } from './Descriptions/groupDescription';
// import { otherOperations } from './Descriptions/otherDescription';
import { budgetOperations } from './Descriptions/BudgetDescription';
import { accountsFields, accountsOperations } from './Descriptions/accountsDescription';
import { categoryFields, categoryOperations } from './Descriptions/categoryDescription';
import { getBugdetId } from './untils';
import { payeeFields, payeeOperations } from './Descriptions/payeeDescription';

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

			// ...projectOperations,
			// ...projectFields,
			//
			// ...projectPhotoOperations,
			// ...projectPhotoFields,
			//
			// ...projectDocumentOperations,
			// // ...projectDocumentFields,
			//
			// ...projectUserOperations,
			// // ...projectUserFields,
			//
			// ...projectLabelOperations,
			// // ...projectLabelFields,
			//
			// ...userOperations,
			// // ...userFields,
			//
			// ...tagOperations,
			// // ...tagFields,
			//
			// ...groupOperations,
			// // ...groupFields,
			//
			// ...otherOperations,
			// // ...otherFields,
			//
			// ...notBuildNotice
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
					// ---------------------- CATEGORY OPERATIONS ----------------------
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

