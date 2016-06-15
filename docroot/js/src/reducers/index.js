import {combineReducers} from 'redux-immutable';

import display from './display';
import projects from './projects';
import users from './users';

function basePath(state) {
	return state || '';
}

export default combineReducers(
	{
		display,
		projects,
		users
	}
);