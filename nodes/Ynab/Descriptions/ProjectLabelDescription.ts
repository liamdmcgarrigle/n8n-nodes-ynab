import { INodeProperties } from "n8n-workflow";

export const projectLabelOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
		options: [
			{
				name: 'List Project Labels',
				value: 'listProjectLabels',
				action: 'List project labels',
			},
			{
				name: 'Add Labels to Project',
				value: 'addLabelsToProject',
				action: 'Add labels to project',
			},
			{
				name: 'Delete Label From Project',
				value: 'deleteLabelFromProject',
				action: 'Delete label from project',
			},
		],
		default: 'listProjectLabels',
		displayOptions: {
			show: {
				resource: [
					'projectLabel',
				]
			},
		},
	},
]


export const projectFields: INodeProperties[] = []
