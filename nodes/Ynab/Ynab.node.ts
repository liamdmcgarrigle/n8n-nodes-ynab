import {
	INodeType,
	INodeTypeDescription,
    NodeConnectionType,
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

}
