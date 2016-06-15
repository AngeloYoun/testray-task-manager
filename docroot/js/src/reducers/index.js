import {combineReducers} from 'redux-immutable';

import display from './display';
import projects from './projects';
import tasks from './tasks';
import users from './users';

function basePath(state) {
	return state || '';
}

export default combineReducers(
	{
		display,
		projects,
		tasks,
		users
	}
);