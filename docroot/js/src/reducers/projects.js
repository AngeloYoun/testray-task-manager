import createBaseReducer from './requestHandler';
import {actionTypes} from '../actions/projects';
import {composeReducers} from '../lib/util';

export default composeReducers(
	createBaseReducer(
		{
			actionTypes,
			primaryKey: 'Project'
		}
	)
);