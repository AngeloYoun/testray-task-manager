import {compose, createStore} from 'redux';

import middleware from './configure_middleware';
import reducers from '../reducers';

export default function configureStore(initialState) {
	const store = createStore(
		reducers,
		initialState,
		compose(
			middleware,
			window.devToolsExtension ? window.devToolsExtension() : f => f
		)
	);

	return store;
}