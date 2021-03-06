export function composeReducers(...reducers) {
	return (state, action) => reducers.reduce(
		(currentState, reducer) => reducer(currentState, action),
		state
	);
}

const actionTypes = ['FAILURE', 'REQUEST', 'SUCCESS'];

export function createActionTypes(action, name, genericizeKey) {
	action = action.toUpperCase();
	name = name.toUpperCase();

	const key = genericizeKey ? action : `${action}_${name}`;

	return actionTypes.reduce(
		(actions, type) => {
			actions[`${key}_${type}`] = `${action}_${name}_${type}`;

			return actions;
		},
		{}
	);
}


export function capsFirstLetter(string) {
	return string[0].toUpperCase() + string.slice(1);
}

export function createReducer(initialState, actionHandlers) {
	return (state = initialState, action) => {
		const handler = actionHandlers[action.type];

		return handler ? handler(state, action) : state;
	};
}