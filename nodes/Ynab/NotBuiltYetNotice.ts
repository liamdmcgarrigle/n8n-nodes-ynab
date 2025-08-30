import { INodeProperties } from "n8n-workflow";


const notBuiltResources = [
	'projectDocument',
	'projectUser',
	'projectLabel',
	'projectChecklist',
	'user',
	'photo',
	'tag',
	'group',
	'other',
]

const notBuiltOperations = [
	// Project Operations not built yet
	'retrieveProject',
	'updateProject',
	'restoreProject',
	'updateTheProjectNotepad',
	'listProjectComments',
	'addProjectComment',
	// Project Collaborator Operations not built yet
	'listProjectCollaborators',
	'ListProjectInvitations',
	// project photos not built yet
	'addPhoto',
]

export const notBuildNotice: INodeProperties[] = [
	// ---------------------------------------------------------------------
	// ----------------------- FOR RESOURCE FIELDS -------------------------
	// ---------------------------------------------------------------------
	{
		displayName: "Sorry, we haven't built this part yet.",
		name: 'notice',
		type: 'notice',
		default: '',
		displayOptions: {
			show: {
				resource: [
					...notBuiltResources
				],
			},
		},
	},
	{
		displayName: "This node was funded by a company only for specific functionality. We added all of the functions to show what is possible with the CompanyCam API. If you want extra functionality, feel free to reach out to us or submit a PR on the GitHub repo.",
		name: 'notice',
		type: 'notice',
		default: '',
		displayOptions: {
			show: {
				resource: [
					...notBuiltResources
				],
			},
		},
	},
	{
		displayName: "liam@mcgarrigle.co",
		name: 'notice',
		type: 'notice',
		default: '',
		displayOptions: {
			show: {
				resource: [
					...notBuiltResources
				],
			},
		},
	},

	// ---------------------------------------------------------------------
	// ----------------------- FOR OPERATION FIELDS ------------------------
	// ---------------------------------------------------------------------
	{
		displayName: "Sorry, we haven't built this part yet.",
		name: 'notice',
		type: 'notice',
		default: '',
		displayOptions: {
			show: {
				operation: [
					...notBuiltOperations
				],
			},
		},
	},
	{
		displayName: "This node was funded by a company only for specific functionality. We added all of the functions to show what is possible with the CompanyCam API. If you want extra functionality, feel free to reach out to us or submit a PR on the GitHub repo.",
		name: 'notice',
		type: 'notice',
		default: '',
		displayOptions: {
			show: {
				operation: [
					...notBuiltOperations
				],
			},
		},
	},
	{
		displayName: "liam@mcgarrigle.co",
		name: 'notice',
		type: 'notice',
		default: '',
		displayOptions: {
			show: {
				operation: [
					...notBuiltOperations
				],
			},
		},
	},
]
