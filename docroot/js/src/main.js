import JSXComponent from 'metal-jsx';
import {Provider} from 'metal-redux';
import {fromJS} from 'immutable';

require('../../css/main.scss');

import {updateDisplay} from './actions/display';

import configureStore from './store/configure_store.js';

import App from './containers/app';

class TaskRay extends JSXComponent {
	render() {
		this.store = configureStore(fromJS(this.config.initialState));

		return (
			<Provider store={this.store}>
				<App />
			</Provider>
		);
	}
}

export const TaskRayApp = {
	initialize(id) {
		const app = new TaskRay(
			{
				initialState: {
					display: {
						pageContext: 'taskIndex'
					}
				}
			},
			document.getElementById(id)
		);

		this.initialized = true;
		this.app = app;
	},
	initialized: false,
	updateDisplay
};