import {combineReducers} from 'redux-immutable';

import display from './display';
import projects from './projects';

function basePath(state) {
	return state || '';
}

export default combineReducers(
	{
		display,
		projects
	}
);