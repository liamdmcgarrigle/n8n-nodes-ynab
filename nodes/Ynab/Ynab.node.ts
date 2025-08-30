import {
	INodeType,
	INodeTypeDescription,
    NodeConnectionType,
} from 'n8n-workflow';
import { projectFields, projectOperations } from './Descriptions/ProjectDescription';
import { notBuildNotice } from './NotBuiltYetNotice';
import { projectPhotoFields, projectPhotoOperations } from './Descriptions/ProjectPhotoDescription';
import { projectCollaboratorFields, projectCollaboratorOperations } from './Descriptions/ProjectCollaboratorDescription';
import { projectDocumentOperations } from './Descriptions/ProjectDocumentDescription';
import { projectUserOperations } from './Descriptions/ProjectUserDescription';
import { projectLabelOperations } from './Descriptions/ProjectLabelDescription';
import { resources } from './Resources';
import { projectChecklistOperations } from './Descriptions/ProjectChecklistDescription';
import { userOperations } from './UserDescription';
import { photoOperations } from './Descriptions/PhotoDescription';
import { tagOperations } from './TagDescription';
import { groupOperations } from './Descriptions/groupDescription';
import { otherOperations } from './Descriptions/otherDescription';

export class Ynab implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'YNAB',
		name: 'Ynab',
		group: ['Finance & Accounting'],
		version: 1,
		subtitle: '={{ $parameter["operation"] }}',
		description: 'Node for automating YNAB budget',
		defaults: {
			name: 'YNAB',
		},
		requestDefaults: {
			baseURL: 'https://api.ynab.com/v1',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		icon: 'file:ynabLogo.svg',
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'YnabApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				// eslint-disable-next-line n8n-nodes-base/node-param-default-wrong-for-options
				default: 'project',
				// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
				options: [
					...resources
				],
			},

			...projectOperations,
			...projectFields,

			...projectPhotoOperations,
			...projectPhotoFields,

			...projectCollaboratorOperations,
			...projectCollaboratorFields,

			...projectDocumentOperations,
			// ...projectDocumentFields,

			...projectUserOperations,
			// ...projectUserFields,

			...projectLabelOperations,
			// ...projectLabelFields,

			...projectChecklistOperations,
			// ...projectChecklistFields,

			...userOperations,
			// ...userFields,

			...photoOperations,
			// ...photoFields,

			...tagOperations,
			// ...tagFields,

			...groupOperations,
			// ...groupFields,

			...otherOperations,
			// ...otherFields,

			...notBuildNotice
		],
	};

}
