import {
	IExecuteFunctions,
} from "n8n-workflow";


export async function getBugdetId(
	func: IExecuteFunctions,
) {
	const cred = await func.getCredentials('YnabApi');
	return cred.budgetId;
}
