import { INodeProperties } from "n8n-workflow";

export const tagOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
		options: [
			{
				name: 'List All Tags',
				value: 'listAllTags',
				action: 'List all tags',
			},
			{
				name: 'Create Tag',
				value: 'createTag',
				action: 'Create tag',
			},
			{
				name: 'Retrieve Tag',
				value: 'RetrieveTag',
				action: 'Retrieve tag',
			},
			{
				name: 'Update Tag',
				value: 'updateTag',
				action: 'Update tag',
			},
			{
				name: 'Delete a Tag',
				value: 'deleteATag',
				action: 'Delete a tag',
			},
		],
		default: 'listAllTags',
		displayOptions: {
			show: {
				resource: [
					'tag',
				]
			},
		},
	},
]


// export const tagFields: INodeProperties[] = []
