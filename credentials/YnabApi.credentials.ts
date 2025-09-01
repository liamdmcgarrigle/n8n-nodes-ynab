import {
	IAuthenticateGeneric,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class YnabApi implements ICredentialType {
	name = 'ynabApi';
	documentationUrl = 'https://github.com/liamdmcgarrigle/n8n-nodes-ynab?tab=readme-ov-file#credentials';
	displayName = 'YNAB API';

	genericAuth = true;

	properties: INodeProperties[] = [
		{
			displayName: 'Token',
			name: 'value',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
		},
		{
			displayName: 'Budget Id',
			name: 'budgetId',
			type: 'string',
		  default: '',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'Authorization': '=Bearer {{$credentials.value}}',
			},
		},
	};

}
