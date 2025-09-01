import { INodeProperties } from "n8n-workflow";

export const payeeLocationsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
		options: [
			{
				name: 'List Payees Locations',
				value: 'listPayeesLocations',
				action: 'List payee locations',
			},
			{
				name: 'Get Location by ID',
				description: "Get the location details by the ID of the location",
				value: 'getLocationById',
				action: 'Get payee location',
			},
			{
				name: 'Get Location by Payee',
				value: 'getLocationByPayee',
				action: 'Get location by payee',
			},
		],
		default: 'listPayeesLocations',
		displayOptions: {
			show: {
				resource: [
					'payeeLocations',
				]
			},
		},
	},
]


export const payeeLocationsFields: INodeProperties[] = [

	{
		displayName: 'Location ID',
		name: 'locationId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: [
					'payeeLocations',
				],
				operation: [
					'getLocationById',
				]
			}
		},
	},
	{
		displayName: 'Payee ID',
		name: 'payeeId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: [
					'payeeLocations',
				],
				operation: [
					'getLocationByPayee',
				]
			}
		},
	},


]
