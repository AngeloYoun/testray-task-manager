import createBaseReducer from './requestHandler';
import {actionTypes} from '../actions/incidents';
import {composeReducers} from '../lib/util';

export default composeReducers(
	createBaseReducer(
		{
			actionTypes,
			primaryKey: 'Incident'
		}
	)
);