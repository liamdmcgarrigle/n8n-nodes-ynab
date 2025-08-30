import { INodeProperties } from "n8n-workflow";

export const userOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
		options: [
			{
				name: 'Retrieve Current User',
				value: 'retrieveCurrentUser',
				action: 'Retrieve current user',
			},
			{
				name: 'List All Users',
				value: 'listAllUsers',
				action: 'List all users',
			},
			{
				name: 'Create User',
				value: 'createUser',
				action: 'Create user',
			},
			{
				name: 'Retrieve User',
				value: 'retrieveUser',
				action: 'Retrieve user',
			},
			{
				name: 'Update User',
				value: 'updateUser',
				action: 'Update user',
			},
			{
				name: 'Delete User',
				value: 'deleteUser',
				action: 'Delete user',
			},
		],
		default: 'retrieveCurrentUser',
		displayOptions: {
			show: {
				resource: [
					'user',
				]
			},
		},
	},
]


// export const userFields: INodeProperties[] = []
