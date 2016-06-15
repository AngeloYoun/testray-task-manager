import {Map} from 'immutable';

import {createReducer} from '../lib/util';

export function updateData(state, action) {
	return state.merge(
		{
			data: action.data,
			loading: false
		}
	);
}

export function updateLoading(loading) {
	return (state, action) => state.set('loading', loading);
}

export default ({actionTypes, primaryKey}) => {
	const key = `watson${primaryKey}Id`;

	const actionHandlers = {
		[actionTypes.ADD_FAILURE]: updateLoading(false),

		[actionTypes.ADD_REQUEST]: updateLoading(true),

		[actionTypes.ADD_SUCCESS]: updateData,

		[actionTypes.CREATE_FAILURE]: updateLoading(false),

		[actionTypes.CREATE_REQUEST]: updateLoading(true),

		[actionTypes.CREATE_SUCCESS]: updateData,

		[actionTypes.DESTROY_FAILURE]: updateLoading(false),

		[actionTypes.DESTROY_REQUEST]: updateLoading(true),

		[actionTypes.DESTROY_SUCCESS]: (state, action) => {
			return state.delete(action.id);
		},

		[actionTypes.EDIT_FAILURE]: updateLoading(false),

		[actionTypes.EDIT_REQUEST]: updateLoading(true),

		[actionTypes.EDIT_SUCCESS]: (state, action) => {
			const data = {};

			const responseData = action.data;

			const id = responseData[key];

			data[id] = responseData;

			return updateData(
				state,
				{
					data
				}
			);
		},

		[actionTypes.FETCH_FAILURE]: updateLoading(false),

		[actionTypes.FETCH_REQUEST]: updateLoading(true),

		[actionTypes.FETCH_SUCCESS]: updateData,

		[actionTypes.INDEX_FAILURE]: updateLoading(false),

		[actionTypes.INDEX_REQUEST]: updateLoading(true),

		[actionTypes.INDEX_SUCCESS]: (state, action) => {
			const data = {};

			action.data.forEach(
				entry => {
					const id = entry[key];

					data[id] = entry;
				}
			);

			return updateData(
				state,
				{
					data
				}
			);
		},

		[actionTypes.UPDATE_FAILURE]: updateLoading(false),

		[actionTypes.UPDATE_REQUEST]: updateLoading(true),

		[actionTypes.UPDATE_SUCCESS]: updateData
	};

	return createReducer(Map(), actionHandlers);
};