import JSXComponent from 'metal-jsx';
import {connect} from 'metal-redux';

import HeaderToolbar from '../components/header_toolbar';

import TaskIndex from './task_index';
import NewTask from './new_task';

class App extends JSXComponent {
	getPage() {
		const pageContext = this.config.pageContext;

		if (pageContext === 'taskIndex') {
			return <TaskIndex />
		}
		else if (pageContext === 'newTask') {
			return <NewTask />
		}
	}

	render() {
		return this.getPage();
	}
}



App.STATE = {
	pageContext: {
		value: 'taskIndex'
	}
};

function mapStateToConfig(state) {
	return {
		pageContext: state.getIn(
			[
				'display',
				'pageContext'
			]
		)
	};
}

export default connect(
	mapStateToConfig
)(App);