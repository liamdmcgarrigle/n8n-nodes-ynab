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
				action: 'Budget Details',
				description: 'View authenticated budgets details',
				routing: {
					request: {
						method: 'GET',
					},
				},
			},
			{
				name: 'Budget Settings',
				value: 'budgetSettings',
				action: 'List budget settings',
				routing: {
					request: {
						method: 'GET',
						url: '/settings'
					},
				},

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
