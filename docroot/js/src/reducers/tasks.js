import createBaseReducer from './requestHandler';
import {actionTypes} from '../actions/tasks';
import {composeReducers} from '../lib/util';

export default composeReducers(
	createBaseReducer(
		{
			actionTypes,
			primaryKey: 'Tasks'
		}
	)
);