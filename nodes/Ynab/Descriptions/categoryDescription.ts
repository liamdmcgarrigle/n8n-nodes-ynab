import { INodeProperties } from "n8n-workflow";

export const categoryOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
		options: [
			{
				name: 'List Categories',
				value: 'listCategories',
				action: 'List categories',
				routing: {
					request: {
						url: "/categories"
					}
				}
			},
			{
				name: 'Get Category',
				value: 'getCategory',
				action: 'Get category',
			},
			{
				name: 'Update Category',
				value: 'updateCategory',
				action: 'Update category',
			},
		],
		default: 'listCategories',
		displayOptions: {
			show: {
				resource: [
					'categories',
				]
			},
		},
	},
]


export const categoryFields: INodeProperties[] = [

	//
	// GET CATEGORY
	//
	{
		displayName: 'Category ID',
		name: 'categoryId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: [
					'categories',
				],
				operation: [
					'getCategory',
					'updateCategory'
				]
			}
		},
	},


	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: false,
		default: '',
		displayOptions: {
			show: {
				resource: [
					'categories',
				],
				operation: [
					'updateCategory'
				]
			}
		},
	},
	{
		displayName: 'Note',
		name: 'note',
		type: 'string',
		required: false,
		default: '',
		displayOptions: {
			show: {
				resource: [
					'categories',
				],
				operation: [
					'updateCategory'
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
					'categories',
				],
				operation: [
					'getCategory',
				]
			}
		},
		options: [

			{
				displayName: 'Specify Month',
				name: 'categoriesMonth',
				type: 'dateTime',
				default: '',
				description: 'The month you want to specify for the category. Only the month is extracted.',
			}

		],
	},






]
