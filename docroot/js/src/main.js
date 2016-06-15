import JSXComponent from 'metal-jsx';
import {Provider} from 'metal-redux';
import {fromJS} from 'immutable';

import {updateDisplay} from './actions/display';

import configureStore from './store/configure_store.js';

import App from './containers/app';

class TaskRay extends JSXComponent {
	render() {
		this.store = configureStore(fromJS(this.config.initialState));

		return (
			<Provider store={this.store}>
				<App elementClass={'wrapper'} />
			</Provider>
		);
	}
}

export const TaskaRayApp = {
	initialize(id) {
		const watsonComponent = new Watson(
			{
				initialState: {
					display: {
						pageContext: 'incidentsIndex'
					},
					incidents: {
						loading: false
					}
				}
			},
			document.body
		);

		this.initialized = true;
		this.component = watsonComponent;
	},
	initialized: false,
	updateDisplay
};