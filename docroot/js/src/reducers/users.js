import createBaseReducer from './requestHandler';
import {actionTypes} from '../actions/users';
import {composeReducers} from '../lib/util';

export default composeReducers(
	createBaseReducer(
		{
			actionTypes,
			primaryKey: 'Users'
		}
	)
);