import { INodeProperties } from "n8n-workflow";

export const transactionsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
		options: [
			{
				name: 'List Transactions',
				value: 'listTransactions',
				action: 'List transactions',
			},
			{
				name: 'Get Transaction',
				value: 'getTransaction',
				action: 'Get transaction',
			},
			{
				name: 'Get Transaction by Category',
				value: 'getTransactionByCategory',
				action: 'Get transaction by category',
			},
			{
				name: 'Get Transaction by Payee',
				value: 'getTransactionByPayee',
				action: 'Get transaction by payee',
			},
			{
				name: 'Get Transaction by Month',
				value: 'getTransactionByMonth',
				action: 'Get transaction by month',
			},
			{
				name: 'Create Transaction',
				value: 'createTransaction',
				action: 'Create transaction',
			},
			{
				name: 'Create Transactions',
				value: 'createTransactions',
				action: 'Create transactions',
			},
			{
				name: 'Update Transaction',
				value: 'updateTransaction',
				action: 'Update transaction',
			},
			{
				name: 'Delete Transaction',
				value: 'deleteTransaction',
				action: 'Delete transaction',
			},
		],
		default: 'listTransactions',
		displayOptions: {
			show: {
				resource: [
					'transactions',
				]
			},
		},
	},
]


export const transactionsFields: INodeProperties[] = [

	{
		displayName: 'Transaction ID',
		name: 'transactionId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: [
					'transactions',
				],
				operation: [
					'getTransaction',
					'updateTransaction',
					'deleteTransaction',
				]
			}
		},
	},
	{
		displayName: 'Category ID',
		name: 'categoryId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: [
					'transactions',
				],
				operation: [
					'getTransactionByCategory',
				]
			}
		},
	},
	{
		displayName: 'Payee ID',
		name: 'payeeId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: [
					'transactions',
				],
				operation: [
					'getTransactionByPayee',
				]
			}
		},
	},
	{
		displayName: 'Month',
		name: 'month',
		type: 'dateTime',
		required: true,
		default: '',
		description: 'Only the year & month is used',
		displayOptions: {
			show: {
				resource: [
					'transactions',
				],
				operation: [
					'getTransactionByMonth',
				]
			}
		}
	},

	{
		displayName: 'Since',
		name: 'since',
		type: 'dateTime',
		default: '',
		description: 'Fetch transactions only on or after provided date. Ignores time and only filters by the date.',
		displayOptions: {
			show: {
				resource: [
					'transactions',
				],
				operation: [
					'listTransactions',
					'getTransactionByCategory',
					'getTransactionByPayee',
				]
			}
		}
	},


	// CREATE / UPDATE SINGLE TRANSACTION


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
					'transactions',
				],
				operation: [
					'createTransaction'
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
					'transactions',
				],
				operation: [
					'updateTransaction'
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
					'transactions',
				],
				operation: [
					'createTransaction'
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
					'transactions',
				],
				operation: [
					'updateTransaction'
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
					'transactions',
				],
				operation: [
					'createTransaction',
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
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		default: {},
		placeholder: 'Add Field',
		displayOptions: {
			show: {
				resource: [
					'transactions',
				],
				operation: [
					'createTransaction',
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
				description: 'To configure a split transaction, leave Category ID empty and provide subtransactions under additional fields',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Cleared',
				name: 'cleared',
				type: 'options',
				options: [
					{
						name: 'Cleared',
						value: 'cleared',
					},
					{
						name: 'Uncleared',
						value: 'uncleared',
					},
					{
						name: 'Reconciled',
						value: 'reconciled',
					},
				],
				default: 'cleared',
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
					'transactions',
				],
				operation: [
					'updateTransaction',
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
				description: 'To configure a split transaction, leave Category ID empty and provide subtransactions under additional fields',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Cleared',
				name: 'cleared',
				type: 'options',
				options: [
					{
						name: 'Cleared',
						value: 'cleared',
					},
					{
						name: 'Uncleared',
						value: 'uncleared',
					},
					{
						name: 'Reconciled',
						value: 'reconciled',
					},
				],
				default: 'cleared',
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
								required: true,
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
								required: true,
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


	//
	// CREATE MULTIPLE TRANSACTIONS
	//
	{
		displayName: 'Transactions JSON',
		name: 'transactionsJson',
		type: 'json',
		default: '[\n  {\n    \"date\": \"2025-08-31\", // required\n    \"amount\": 0, // required\n    \"account_id\": \"account id\", // required \n    \"memo\": \"Memo text\",\n    \"cleared\": \"cleared\",\n    \"payee_id\": \"payee id\",\n    \"category_id\": \"category id\",\n    \"payee_name\": \"payee name\"\n  },\n  {\n    \"date\": \"2025-08-31\", \n    \"amount\": 0, \n    \"account_id\": \"account id\", \n    \"memo\": \"Memo text\",\n    \"cleared\": \"cleared\",\n    \"payee_id\": \"payee id\",\n    \"category_id\": \"category id\",\n    \"payee_name\": \"payee name\"\n  }\n]',
		description: 'Custom JSON allows for batch creation',
		displayOptions: {
			show: {
				resource: [
					'transactions',
				],
				operation: [
					'createTransactions',
				]
			}
		},
	},


	//
	// CREATE PROJECT
	//
	{
		displayName: 'Project ID',
		name: 'projectId',
		type: 'string',
		required: true,
		default: '',
		routing: {
			request: {
				method: 'DELETE',
				url: '=/projects/{{$parameter.projectId}}'
			},
		},
		displayOptions: {
			show: {
				resource: [
					'project',
				],
				operation: [
					'deleteProject'
				]
			}
		},
	},


	//
	//
	//    LIST PROJECTS
	//

	{
		displayName: 'Query',
		name: 'query',
		type: 'string',
		description: 'Search by Address line 1 or Title',
		default: '',
		placeholder: '2600 Benjamin Franklin Pkwy',
		routing: {
			request: {
				method: 'GET',
				url: '=/projects/',
				qs: {
					'query': '={{ $value }}',
					'page': 0,
					'per_page': 30
				}
			},

		},
		displayOptions: {
			show: {
				resource: [
					'project',
				],
				operation: [
					'listProjects'
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
					'project',
				],
				operation: [
					'listProjects'
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
	},







]
