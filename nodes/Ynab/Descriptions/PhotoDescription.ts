import { INodeProperties } from "n8n-workflow";

export const photoOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
		options: [
			{
				name: 'List Photos',
				value: 'listPhotos',
				action: 'List photos',
			},
			{
				name: 'Retrieve Photo',
				value: 'retrievePhoto',
				action: 'Retrieve photo',
			},
			{
				name: 'Update Photo',
				value: 'updatePhoto',
				action: 'Update photo',
			},
			{
				name: 'Delete Photo',
				value: 'deletePhoto',
				action: 'Delete photo',
			},
			{
				name: 'List Photo',
				value: 'listPhoto',
				action: 'List photo',
			},
			{
				name: 'Add Tags',
				value: 'addTags',
				action: 'Add tags',
			},
			{
				name: 'List Photo Comments',
				value: 'listPhotoComments',
				action: 'List photo comments',
			},
			{
				name: 'Add Comment',
				value: 'addComment',
				action: 'Add comment',
			},
		],
		default: 'listPhotos',
		displayOptions: {
			show: {
				resource: [
					'photo',
				]
			},
		},
	},
]


// export const photoFields: INodeProperties[] = []
