import sendRequest from '../lib/request';

export const CALL_API = 'CALL_API';

export function toAction(type, ...objs) {
	const action = Object.assign({type}, ...objs);

	delete action[CALL_API];

	return action;
}

export default store => next => action => {
	const request = action[CALL_API];

	if (typeof request === 'undefined') {
		return next(action);
	}

	const [requestType, successType, failureType] = request.types;

	next(
		toAction(requestType, action)
	);

	return sendRequest(request).then(
		data => {
			next(
				toAction(successType, action, {data})
			);

			return {data};
		},
		error => {
			next(
				toAction(failureType, action, {error})
			);

			return {error};
		}
	);
};