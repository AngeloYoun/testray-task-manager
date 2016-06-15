import {Map} from 'immutable';
import {actionTypes} from '../actions/display';
import {createReducer} from '../lib/util';

const actionHandlers = {
	[actionTypes.UPDATE_DISPLAY]: (state, action) => {
		return Map(
			action.data
		);
	},
	[actionTypes.UPDATE_FILTER]: (state, action) => {
		return state.mergeDeep(
			{
				filter: action.data
			}
		);
	},
	[actionTypes.UPDATE_PAGE_CONTEXT]: (state, action) => {
		return state.set('pageContext', action.data);
	},
	[actionTypes.UPDATE_VIEW_BY]: (state, action) => {
		return state.set('viewBy', action.data);
	},
	[actionTypes.UPDATE_VIEW_CONTEXT]: (state, action) => {
		return state.set('viewContext', Map(action.data));
	}
};

export default createReducer(Map(), actionHandlers);