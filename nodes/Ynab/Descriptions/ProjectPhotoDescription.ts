import { INodeProperties } from "n8n-workflow";

export const projectPhotoOperations: INodeProperties[] = [
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
				description: 'Move an event To another calendar',
			},
			{
				name: 'Add Photo',
				value: 'addPhoto',
				action: 'Add photo',
			},
		],
		default: 'listPhotos',
		displayOptions: {
			show: {
				resource: [
					'projectPhoto',
				]
			},
		},
	}
]

export const projectPhotoFields: INodeProperties[] = [
	{
		displayName: 'Project ID',
		name: 'projectId',
		type: 'string',
		required: true,
		default: '',
		routing: {
			request: {
				url: '=/projects/{{$parameter.projectId}}/photos'
			},
		},
		displayOptions: {
			show: {
				resource: [
					'projectPhoto',
				],
				operation: [
					'listPhotos',
				]
			}
		},
	},

	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		default: {},
		placeholder: 'Add Field',
		displayOptions: {
			show: {
				resource: [
					'projectPhoto',
				],
				operation: [
					'listPhotos',
				]
			}
		},
		options: [
			{
				displayName: 'Page',
				name: 'page',
				type: 'string',
				description: 'Page of result',
				default: '',
				routing: {
					request: {
						qs: {
							'page': '={{ $value }}'
						}
					},

				},

			},
			{
				displayName: 'Per Page',
				name: 'perPage',
				type: 'string',
				description: 'How many results per page',
				default: '',
				routing: {
					request: {
						qs: {
							'per_page': '={{ $value }}'
						}
					},

				},

			},
		]
	}

]
