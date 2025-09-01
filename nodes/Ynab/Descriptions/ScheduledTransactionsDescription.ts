import { INodeProperties } from "n8n-workflow";

export const scheduledTransactionsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
		options: [
			{
				name: 'List Scheduled Transactions',
				value: 'listScheduledTransactions',
				action: 'List scheduled transactions',
			},
			{
				name: 'Get Scheduled Transaction',
				value: 'getScheduledTransaction',
				action: 'Get scheduled transaction',
			},
			{
				name: 'Create Scheduled Transaction',
				value: 'createScheduledTransaction',
				action: 'Create scheduled transaction',
			},
			{
				name: 'Update Scheduled Transaction',
				value: 'updateScheduledTransaction',
				action: 'Update scheduled transaction',
			},
			{
				name: 'Delete Scheduled Transaction',
				value: 'deleteScheduledTransaction',
				action: 'Delete scheduled transaction',
			},
		],
		default: 'listScheduledTransactions',
		displayOptions: {
			show: {
				resource: [
					'scheduledTransactions',
				]
			},
		},
	},
]


export const scheduledTransactionsFields: INodeProperties[] = [

	{
		displayName: 'Scheduled Transaction ID',
		name: 'scheduledTransactionId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: [
					'scheduledTransactions',
				],
				operation: [
					'getScheduledTransaction',
					'updateScheduledTransaction',
					'deleteScheduledTransaction',
				]
			}
		},
	},

	{
		displayName: 'Amount',
		name: 'amount',
		type: 'number',
		description: "Amount of the transaction",
		required: true,
		typeOptions: {
			numberPrecision: 2,
		},
		default: 0.00,
		displayOptions: {
			show: {
				resource: [
					'scheduledTransactions',
				],
				operation: [
					'createScheduledTransaction'
				]
			}
		},
	},
	{
		displayName: 'Amount',
		name: 'amount',
		type: 'number',
		description: "Amount of the transaction",
		typeOptions: {
			numberPrecision: 2,
		},
		default: null,
		displayOptions: {
			show: {
				resource: [
					'scheduledTransactions',
				],
				operation: [
					'updateScheduledTransaction'
				]
			}
		},
	},
	{
		displayName: 'Account ID',
		name: 'accountId',
		type: 'string',
		description: "Account used for the transaction",
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: [
					'scheduledTransactions',
				],
				operation: [
					'createScheduledTransaction'
				]
			}
		},
	},
	{
		displayName: 'Account ID',
		name: 'accountId',
		type: 'string',
		description: "Account used for the transaction",
		default: '',
		displayOptions: {
			show: {
				resource: [
					'scheduledTransactions',
				],
				operation: [
					'updateScheduledTransaction'
				]
			}
		},
	},

	{
		displayName: 'Date',
		name: 'date',
		type: 'dateTime',
		required: true,
		default: '',
		description: 'Date of transaction. Can not be in the future.',
		displayOptions: {
			show: {
				resource: [
					'scheduledTransactions',
				],
				operation: [
					'createScheduledTransaction',
				]
			}
		}
	},
	{
		displayName: 'Date',
		name: 'date',
		type: 'dateTime',
		default: '',
		description: 'Date of transaction. Can not be in the future.',
		displayOptions: {
			show: {
				resource: [
					'transactions',
				],
				operation: [
					'updateTransaction',
				]
			}
		}
	},

	{
		displayName: 'Frequency',
		name: 'frequency',
		type: 'options',
		displayOptions: {
			show: {
				resource: [
					'scheduledTransactions',
				],
				operation: [
					'createScheduledTransaction',
					'updateScheduledTransaction',
				]
			}
		},
		required: true,
		// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
		options: [
			{
				name: 'Never',
				value: 'never',
			},
			{
				name: 'Daily',
				value: 'daily',
			},
			{
				name: 'Weekly',
				value: 'weekly',
			},
			{
				name: 'Every Other Week',
				value: 'everyOtherWeek',
			},
			{
				name: 'Twice a Month',
				value: 'twiceAMonth',
			},
			{
				name: 'Every 4 Weeks',
				value: 'every4Weeks',
			},
			{
				name: 'Monthly',
				value: 'monthly',
			},
			{
				name: 'Every Other Month',
				value: 'everyOtherMonth',
			},
			{
				name: 'Every 3 Months',
				value: 'every3Months',
			},
			{
				name: 'Every 4 Months',
				value: 'every4Months',
			},
			{
				name: 'Twice a Year',
				value: 'twiceAYear',
			},
			{
				name: 'Yearly',
				value: 'yearly',
			},
			{
				name: 'Every Other Year',
				value: 'everyOtherYear',
			},
		],
		default: 'never',
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
					'scheduledTransactions',
				],
				operation: [
					'createScheduledTransaction',
					'editScheduledTransaction',
				]
			}
		},
		// eslint-disable-next-line n8n-nodes-base/node-param-collection-type-unsorted-items
		options: [
			{
				displayName: 'Payee ID',
				name: 'payeeId',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Payee Name',
				name: 'payeeName',
				description: 'If a payee name value is provided and payee ID has a null value, the payee name value will be used to resolve the payee by either (1) a payee with the same name or (2) creation of a new payee',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Category ID',
				name: 'categoryId',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Memo',
				name: 'memo',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Sub Transactions',
				name: 'subtransactions',
				placeholder: 'Add Sub Transaction',
				type: 'fixedCollection',
				default: {},
				description: 'Sum of subtransaction amounts MUST equal Amount. Otherwise subtransactions will be ignored by the API.',
				typeOptions: {
					multipleValues: true,
				},
				// eslint-disable-next-line n8n-nodes-base/node-param-collection-type-unsorted-items
				options: [
					{
						name: 'subtransactionFields',
						displayName: 'Sub Transaction',
						// eslint-disable-next-line n8n-nodes-base/node-param-fixed-collection-type-unsorted-items
						values: [
							{
								displayName: 'Amount',
								name: 'amount',
								type: 'number',
								description: "Amount of the transaction",
								required: true,
								typeOptions: {
									numberPrecision: 2,
								},
								default: 0.00,
							},
							{
								displayName: 'Payee ID',
								name: 'payee_id',
								type: 'string',
								default: '',
							},
							{
								displayName: 'Payee Name',
								name: 'payee_name',
								description: 'If a payee name value is provided and payee ID has a null value, the payee name value will be used to resolve the payee by either (1) a payee with the same name or (2) creation of a new payee',
								type: 'string',
								default: '',
							},
							{
								displayName: 'Category ID',
								name: 'category_id',
								description: 'The category for the subtransaction. Credit Card Payment categories are not permitted and will be ignored if supplied.',
								type: 'string',
								default: '',
							},
							{
								displayName: 'Memo',
								name: 'memo',
								type: 'string',
								default: '',
							},
						],
					},
				],
			},
		],
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
					'scheduledTransactions',
				],
				operation: [
					'updateScheduledTransaction',
				]
			}
		},
		// eslint-disable-next-line n8n-nodes-base/node-param-collection-type-unsorted-items
		options: [
			{
				displayName: 'Payee ID',
				name: 'payeeId',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Payee Name',
				name: 'payeeName',
				description: 'If a payee name value is provided and payee ID has a null value, the payee name value will be used to resolve the payee by either (1) a payee with the same name or (2) creation of a new payee',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Category ID',
				name: 'categoryId',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Memo',
				name: 'memo',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Sub Transactions',
				name: 'subtransactions',
				placeholder: 'Add Sub Transaction',
				type: 'fixedCollection',
				default: {},
				description: 'Sum of subtransaction amounts MUST equal Amount. Otherwise subtransactions will be ignored by the API.',
				typeOptions: {
					multipleValues: true,
				},
				// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
				options: [
					{
						name: 'subtransactionFields',
						displayName: 'Sub Transaction',
						// eslint-disable-next-line n8n-nodes-base/node-param-fixed-collection-type-unsorted-items
						values: [
							{
								displayName: 'Amount',
								name: 'amount',
								type: 'number',
								description: "Amount of the transaction",
								required: true,
								typeOptions: {
									numberPrecision: 2,
								},
								default: 0.00,
							},
							{
								displayName: 'Payee ID',
								name: 'payee_id',
								type: 'string',
								default: '',
							},
							{
								displayName: 'Payee Name',
								name: 'payee_name',
								description: 'If a payee name value is provided and payee ID has a null value, the payee name value will be used to resolve the payee by either (1) a payee with the same name or (2) creation of a new payee',
								type: 'string',
								default: '',
							},
							{
								displayName: 'Category ID',
								name: 'category_id',
								description: 'The category for the subtransaction. Credit Card Payment categories are not permitted and will be ignored if supplied.',
								type: 'string',
								default: '',
							},
							{
								displayName: 'Memo',
								name: 'memo',
								type: 'string',
								default: '',
							},
						],
					},
				],
			},
		],
	},






]
