import { INodeProperties } from "n8n-workflow";

export const monthsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
		options: [
			{
				name: 'List Months',
				value: 'listMonths',
				action: 'List months',
			},
			{
				name: 'Get Month',
				value: 'getMonth',
				action: 'Get month',
			},
		],
		default: 'listMonths',
		displayOptions: {
			show: {
				resource: [
					'months',
				]
			},
		},
	},
]


export const monethsFields: INodeProperties[] = [

			{
				displayName: 'Specify Month',
				name: 'month',
				type: 'dateTime',
				required: true,
				default: '',
				description: 'Only the year & month is used',
				displayOptions: {
					show: {
						resource: [
							'months',
						],
						operation: [
							'getMonth',
						]
					}
				}
			}


]
