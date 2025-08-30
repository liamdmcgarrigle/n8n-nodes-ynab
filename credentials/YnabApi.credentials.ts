import {
	IAuthenticateGeneric,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class YnabApi implements ICredentialType {
	name = 'YnabApi';

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
