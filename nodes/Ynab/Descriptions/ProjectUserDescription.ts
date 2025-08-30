import { INodeProperties } from "n8n-workflow";

export const projectUserOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
		options: [
			{
				name: 'List Assigned Users',
				value: 'ListAssignedUsers',
				action: 'List assigned users',
			},
			{
				name: 'Assign a User to a Project',
				value: 'assignAUserToAProject',
				action: 'Assign a user to a project',
			},
			{
				name: 'Remove Assigned User From Project',
				value: 'removeAssignedUserFromProject',
				action: 'Remove assigned user from project',
			},
		],
		default: 'ListAssignedUsers',
		displayOptions: {
			show: {
				resource: [
					'projectUser',
				]
			},
		},
	},
]


export const projectFields: INodeProperties[] = []
