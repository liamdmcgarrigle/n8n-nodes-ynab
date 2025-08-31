import { INodeProperties } from "n8n-workflow";

export const payeeOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
		options: [
			{
				name: 'List Payees',
				value: 'listPayees',
				action: 'List payees',
			},
			{
				name: 'Get Payee',
				value: 'getPayee',
				action: 'Get payee',
			},
			{
				name: 'Update Payee',
				value: 'updatePayee',
				action: 'Update payee',
			},
		],
		default: 'listPayees',
		displayOptions: {
			show: {
				resource: [
					'payees',
				]
			},
		},
	},
]


export const payeeFields: INodeProperties[] = [

	{
		displayName: 'Payee ID',
		name: 'payeeId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: [
					'payees',
				],
				operation: [
					'getPayee',
					'updatePayee',
				]
			}
		},
	},

	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: [
					'payees',
				],
				operation: [
					'updatePayee',
				]
			}
		},
	},


]
