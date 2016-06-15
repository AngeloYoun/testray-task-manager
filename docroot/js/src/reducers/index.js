import {combineReducers} from 'redux-immutable';

import addresses from './addresses';
import display from './display';
import incidents from './incidents';

function basePath(state) {
	return state || '';
}

export default combineReducers(
	{
		addresses,
		basePath,
		display,
		incidents
	}
);