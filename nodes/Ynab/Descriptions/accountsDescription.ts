import { INodeProperties } from "n8n-workflow";

export const accountsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
		options: [
			{
				name: 'List Accounts',
				value: 'listAccounts',
				action: 'List accounts',
			},
			{
				name: 'Get Account',
				value: 'getAccount',
				action: 'Get single account',
			},
			{
				name: 'Create Account',
				value: 'createAccount',
				action: 'Create account',
			},
		],
		default: 'listAccounts',
		displayOptions: {
			show: {
				resource: [
					'accounts',
				]
			},
		},
	},
]


export const accountsFields: INodeProperties[] = [

	//
	// GET ACCOUNT
	//
	{
		displayName: 'Account ID',
		name: 'accountId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: [
					'accounts',
				],
				operation: [
					'getAccount'
				]
			}
		},
	},



	//
	// CREATE ACCOUNT

	{
		displayName: 'Account Name',
		name: 'accountName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: [
					'accounts',
				],
				operation: [
					'createAccount'
				]
			}
		},
	},
	{
		displayName: 'Balance',
		name: 'balance',
		type: 'number',
		description: "Starting balance on the new account",
		required: true,
		typeOptions: {
			numberPrecision: 2,
		},
		default: 0.00,
		displayOptions: {
			show: {
				resource: [
					'accounts',
				],
				operation: [
					'createAccount'
				]
			}
		},
	},
	{
		displayName: 'Account Type',
		name: 'accountType',
		type: 'options',
		// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
		options: [
			{
				name: 'Checking',
				value: 'checking',
			},
			{
				name: 'Savings',
				value: 'savings',
			},
			{
				name: 'Cash',
				value: 'cash',
			},
			{
				name: 'Credit Card',
				value: 'creditCard',
			},
			{
				name: 'Line of Credit',
				value: 'lineOfCredit',
			},
			{
				name: 'Other Asset',
				value: 'otherAsset',
			},
			{
				name: 'Other Liability',
				value: 'otherLiability',
			},
			{
				name: 'Mortgage',
				value: 'mortgage',
			},
			{
				name: 'Auto Loan',
				value: 'authLoan',
			},
			{
				name: 'Student Loan',
				value: 'studentLoan',
			},
			{
				name: 'Personal Loan',
				value: 'personalLoan',
			},
			{
				name: 'Medical Debt',
				value: 'medicalDebt',
			},
			{
				name: 'Other Debt',
				value: 'otherDebt',
			},
		],
		default: 'checking',
		displayOptions: {
			show: {
				resource: [
					'accounts',
				],
				operation: [
					'createAccount'
				]
			}
		},
		// routing: {
		// 	request: {
		// 		body:{
		// 			"account": {
		// 				"type":"={{$parameter.accountType}}"
		// 			}
		// 		}
		// 	}
		// }
	},

]
