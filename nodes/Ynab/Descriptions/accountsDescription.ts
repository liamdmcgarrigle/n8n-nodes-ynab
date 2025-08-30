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
				name: 'Create Account',
				value: 'createAccount',
				action: 'Create account',
				routing: {
					request: {
						method: 'POST',
					},
				},
			},
			{
				name: 'Get Account',
				value: 'getAccount',
				action: 'Get single account',
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


export const projectFields: INodeProperties[] = [

	//
	// CREATE PROJECT
	//
	{
		displayName: 'Project Name',
		name: 'projectName',
		type: 'string',
		required: true,
		default: '',
		routing: {
			request: {
				body: {
					"name":'={{$parameter.projectName}}',
				}
			},
		},
		displayOptions: {
			show: {
				resource: [
					'project',
				],
				operation: [
					'createProject'
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
					'createProject'
				]
			}
		},
		options: [
			{
				displayName: 'Contact',
				name: 'contact',
				placeholder: 'Add Contact',
				type: 'fixedCollection',
				default: {},
				typeOptions: {
					multipleValues: false,
				},

				options: [
					{
						name: 'contactFields',
						displayName: 'Contact',
						values: [
							{
								displayName: 'Name',
								name: 'name',
								type: 'string',
								default: '',
								placeholder: 'John Smith',
								routing: {
									request: {
										body: {
											"primary_contact":{
												"name": "={{ $value }}",
											},
										}
									},
								},
							},
							{
								displayName: 'Email',
								name: 'email',
								type: 'string',
								default: '',
								placeholder: 'example@email.com',
								routing: {
									request: {
										body: {
											"primary_contact":{
												"email": "={{ $value }}",
											},
										}
									},
								},
							},
							{
								displayName: 'Phone Number',
								name: 'phone_number',
								type: 'string',
								default: '',
								routing: {
									request: {
										body: {
											"primary_contact":{
												"phone_number": "={{ $value }}",
											},
										}
									},
								},
							},
						],
					},
				],

			},
			{
				displayName: 'Address',
				name: 'address',
				placeholder: 'Add address',
				type: 'fixedCollection',
				default: {},
				typeOptions: {
					multipleValues: false,
				},
				options: [
					{
						name: 'addressFields',
						displayName: 'Address',
						values: [
							{
								displayName: 'Street Address 1',
								name: 'street_address_1',
								type: 'string',
								default: '',
								placeholder: '2600 Benjamin Franklin Pkwy',
								routing: {
									request: {
										body: {
											"address":{
												"street_address_1": '={{ $value }}',
											},
										}
									},
								},
							},
							{
								displayName: 'Street Address 2',
								name: 'street_address_2',
								type: 'string',
								default: '',
								placeholder: 'Unit B',
								routing: {
									request: {
										body: {
											"address":{
												"street_address_2": "={{ $value }}",
											},
										}
									},
								},
							},
							{
								displayName: 'City',
								name: 'city',
								type: 'string',
								default: '',
								placeholder: 'Philadelphia',
								routing: {
									request: {
										body: {
											"address":{
												"city": "={{ $value }}",
											},
										}
									},
								},
							},
							{
								displayName: 'State',
								name: 'state',
								type: 'string',
								default: '',
								placeholder: 'PA',
								routing: {
									request: {
										body: {
											"address":{
												"state": "={{ $value }}",
											},
										}
									},
								},
							},
							{
								displayName: 'Postal Code',
								name: 'postal_code',
								type: 'string',
								default: '',
								placeholder: '19130',
								routing: {
									request: {
										body: {
											"address":{
												"postal_code": "={{ $value }}",
											},
										}
									},
								},
							},
							{
								displayName: 'Country',
								name: 'country',
								type: 'string',
								default: '',
								placeholder: 'United States',
								routing: {
									request: {
										body: {
											"address":{
												"country": "={{ $value }}",
											},
										}
									},
								},
							},
						],
					},

				],
			},
			{
				displayName: 'Coordinates',
				name: 'coordinates',
				placeholder: 'Add coordinates',
				type: 'fixedCollection',
				default: {},
				typeOptions: {
					multipleValues: false,
				},
				options: [
					{
						name: 'coordinatesFeilds',
						displayName: 'Coordinates',
						values: [
							{
								displayName: 'Lattatude',
								name: 'lat',
								type: 'number',
								default: '',
								placeholder: '',
								typeOptions: {
									maxValue: 90,
									minValue: -90,
									numberStepSize: 0.000001,
								},
								required: true,
								routing: {
										request: {
											body: {
												"coordinates":{
													"lat": "={{ $value }}",
												},
											}
										},
									},
							},
							{
								displayName: 'Longitude',
								name: 'lon',
								type: 'number',
								default: '',
								placeholder: '',
								typeOptions: {
									maxValue: 180,
									minValue: -180,
									numberStepSize: 0.000001,
								},
								required: true,
								routing: {
									request: {
										body: {
											"coordinates":{
												"lon": "={{ $value }}",
											},
										}
									},
								},
							},
						],
					},

				],
			},
		],
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
