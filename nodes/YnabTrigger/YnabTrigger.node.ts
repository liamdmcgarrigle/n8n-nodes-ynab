import {
    NodeConnectionType,
	type INodeType,
	type INodeTypeDescription,
} from 'n8n-workflow';


export class YnabTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'YNAB Trigger',
		name: 'YnabTrigger',
		icon: 'file:ynabLogo.svg',
		group: ['trigger'],
		version: 1,
		description: 'Handle CompanyCam events via webhooks',
		defaults: {
			name: 'YNAB Trigger',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'YnabApi',
				required: true,
			},
		],

		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'webhook',
			},
		],
		properties: [
			{
				displayName: 'Events',
				name: 'events',
				type: 'multiOptions',
				required: true,
				default: [],
				// eslint-disable-next-line n8n-nodes-base/node-param-multi-options-type-unsorted-items
				options: [
					{
						name: 'All',
						value: '*',
					},
					{
						name: 'Photo Added',
						value: 'photo.created',
					},
					{
						name: 'Photo Deleted',
						value: 'photo.deleted',
					},
					{
						name: 'Project Created',
						value: 'project.created',
					},
					{
						name: 'Project Updated',
						value: 'project.updated',
					},
					{
						name: 'Project Label Created',
						value: 'project.label_added',
					},
					{
						name: 'Project Deleted',
						value: 'project.deleted',
					},
					{
						name: 'Comment Added',
						value: 'comment.created',
					},
					{
						name: 'Photo Tag Added',
						value: 'photo.tag_added',
					},
					{
						name: 'ToDo List Created',
						value: 'todo_list.created',
					},
					{
						name: 'ToDo List Completed',
						value: 'todo_list.completed',
					},
					{
						name: 'ToDo List Deleted',
						value: 'todo_list.deleted',
					},
					{
						name: 'Task Completed',
						value: 'task.completed',
					},
					{
						name: 'Document Added',
						value: 'document.created',
					},
					{
						name: 'Document Added',
						value: 'document.created',
					},
				],
			},
			{
				displayName: 'Filters',
				name: 'filters',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				options: [
					{
						displayName: 'Project ID',
						name: 'projectId',
						type: 'string',
						default: '',
					},
				],
			},


	// ---------------------------------------------------------------------
	// ----------------------- FOR OPERATION FIELDS ------------------------
	// ---------------------------------------------------------------------
	{
		displayName: "Sorry, we haven't built this part yet.",
		name: 'notice',
		type: 'notice',
		default: '',
	},
	{
		displayName: "This node was funded by a company only for specific functionality. We added all of the functions to show what is possible with the CompanyCam API. If you want extra functionality, feel free to reach out to us or submit a PR on the GitHub repo.",
		name: 'notice',
		type: 'notice',
		default: '',
	},
	{
		displayName: "liam@mcgarrigle.co",
		name: 'notice',
		type: 'notice',
		default: '',
	},


		],
	};

}
