import { INodeProperties } from "n8n-workflow";

export const projectDocumentOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
		options: [
			{
				name: 'List Project Documents',
				value: 'listProjectDocuments',
				action: 'List project documents',
			},
			{
				name: 'Upload a Document',
				value: 'uploadADocument',
				action: 'Upload a document',
			},
		],
		default: 'listProjectDocuments',
		displayOptions: {
			show: {
				resource: [
					'projectDocument',
				]
			},
		},
	},
]


export const projectFields: INodeProperties[] = []
