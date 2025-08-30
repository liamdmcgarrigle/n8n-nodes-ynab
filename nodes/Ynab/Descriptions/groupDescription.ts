import { INodeProperties } from "n8n-workflow";

export const groupOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
		options: [
			{
				name: 'List Groups',
				value: 'listGroups',
				action: 'List groups',
			},
			{
				name: 'Create Group',
				value: 'createGroup',
				action: 'Create group',
			},
			{
				name: 'Retrieve Group',
				value: 'retrieveGroup',
				action: 'Retrieve group',
			},
			{
				name: 'Update Group',
				value: 'updateGroup',
				action: 'Update group',
			},
			{
				name: 'Delete a Group',
				value: 'deleteAGroup',
				action: 'Delete a group',
			},
		],
		default: 'listGroups',
		displayOptions: {
			show: {
				resource: [
					'group',
				]
			},
		},
	},
]


export const groupFields: INodeProperties[] = []
