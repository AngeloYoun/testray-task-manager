import {fromJS, Map} from 'immutable';
import createBaseReducer from './requestHandler';
import {actionTypes} from '../actions/addresses';
import {composeReducers, createReducer} from '../lib/util';

function processAddresses(data, initialValue) {
	return data.reduce(
		(result, next) => {
			next = {...next};

			return result.mergeIn(
				[next.watsonAddressId],
				{
					data: fromJS(next),
					loading: false
				}
			);
		},
		initialValue
	);
}

const actionHandlers = {
	[actionTypes.FETCH_ADDRESSES_SUCCESS]: (state, action) => {
		return state.merge(
			processAddresses(
				action.data,
				Map()
			)
		);
	}
};

export default composeReducers(
	createBaseReducer(
		{
			actionTypes,
			primaryKey: 'Address'
		}
	),
	createReducer(Map(), actionHandlers)
);