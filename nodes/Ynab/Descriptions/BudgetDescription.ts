import { INodeProperties } from "n8n-workflow";

export const budgetOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
		options: [
			{
				name: 'Budget Details',
				value: 'budgetDetails',
				action: 'Budget details',
				description: 'View authenticated budgets details including all accounts and categories',
			},
			{
				name: 'Budget Settings',
				value: 'budgetSettings',
				action: 'List budget settings',

			},

		],
		default: 'budgetDetails',
		displayOptions: {
			show: {
				resource: [
					'budget',
				]
			},
		},
	},
]
