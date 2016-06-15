import JSXComponent from 'metal-jsx';
import {connect} from 'metal-redux';
import {Map} from 'immutable';

import Button from '../components/button';
import DependentSelectInput from '../components/dependent_select_input';
import List from '../components/list';
import SelectInput from '../components/select_input';

import {indexTasks} from '../actions/tasks';
import {indexUsers} from '../actions/users';
import {updatePageContext} from '../actions/display';


class TaskIndex extends JSXComponent {
	attached() {
		this.config.indexTasks();
		this.config.indexUsers();
	}

	created() {
		this.handleUpdateValue = this.handleUpdateValue.bind(this);
		this.handleNewTask = this.handleNewTask.bind(this);
	}

	render() {
		return (
			<div class="page-container">
				<Button onClick={this.handleNewTask} label="New Task" />

				<List data={this.config.tasks.get('data')} />
			</div>
		);
	}

	handleUpdateValue(value, data) {
		this.setState(
			{
				selectedData: Object.assign(
					{},
					this.selectedData,
					{
						[data.inputId]: value
					}
				)
			}
		);
	}

	handleNewTask() {
		this.config.updatePageContext('newTask')
	}
}

TaskIndex.STATE = {
	tasks: {
		value: {
			loading: true
		}
	},
	selectedData: {
		value: {}
	}
}

function mapStateToConfig(state) {
	return {
		tasks: state.get('tasks')
	}
}

function mapDispatchToConfig(dispatch) {
	return {
		indexTasks: () => {
			console.log('fire');
			dispatch(
				indexTasks()
			);
		},
		indexUsers: () => {
			console.log('fire');
			dispatch(
				indexUsers()
			);
		},
		updatePageContext: (data) => {
			dispatch(
				updatePageContext(data)
			);
		}
	};
}

export default connect(mapStateToConfig, mapDispatchToConfig)(TaskIndex);