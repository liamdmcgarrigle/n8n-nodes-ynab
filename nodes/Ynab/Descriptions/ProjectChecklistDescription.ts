import { INodeProperties } from "n8n-workflow";

export const projectChecklistOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
		options: [
			{
				name: 'List Project Checklists',
				value: 'listProjectChecklists',
				action: 'List project checklists',
			},
			{
				name: 'Create Checklist on Project From a Checklist Template',
				value: 'createChecklistOnProjectFromAChecklistTemplate',
				action: 'Create checklist on project from a checklist template',
			},
			{
				name: 'Retrieve Project Checklist',
				value: 'retrieveProjectChecklist',
				action: 'Retrieve project checklist',
			},
		],
		default: 'listProjectChecklists',
		displayOptions: {
			show: {
				resource: [
					'projectChecklist',
				]
			},
		},
	},
]


export const projectChecklistFields: INodeProperties[] = []
