import { INodeProperties } from "n8n-workflow";

export const otherOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
		options: [
			{
				name: 'List All Checklists',
				value: 'listAllChecklists',
				action: 'List all checklists',
			},
			{
				name: 'Retrieve Company',
				value: 'retrieveCompany',
				action: 'Retrieve company',
			},
			{
				name: 'List All Checklist Templates',
				value: 'listAllChecklistTemplates',
				action: 'List all checklist templates',
			},
		],
		default: 'listAllChecklists',
		displayOptions: {
			show: {
				resource: [
					'other',
				]
			},
		},
	},
]


// export const otherFields: INodeProperties[] = []
