import JSXComponent from 'metal-jsx';
import {connect} from 'metal-redux';
import {Map} from 'immutable';

import DependentSelectInput from '../components/dependent_select_input';
import SelectInput from '../components/select_input';

import {indexProjects} from '../actions/projects';

class BuildIndex extends JSXComponent {
	attached() {
		this.config.indexProjects();
	}

	created() {
		this.handleProjectChange = this.handleProjectChange.bind(this);
	}

	handleProjectChange(value) {
		console.log(value)
	}

	render() {
		const projects = this.config.projects;

		const options = {};

		if (!projects.get('loading') && projects.get('data')) {
			const data = projects.get('data');

			data.forEach(
				entry => {
					options[entry.get('testrayProjectId')] = {
						label: entry.get('name')
					};
				}
			);
		}

		return (
			<div class="page-container">
				<div class="project-select">
					<span class="label">Projects</span>
					<SelectInput data={{inputId: projects}} onChange={this.handleUpdateValue} options={options} />
				</div>

				<div class="build-type-select">
					<span class="label">Jobs</span>

				</div>

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
}

BuildIndex.STATE = {
	projects: {
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
		projects: state.get('projects')
	}
}

function mapDispatchToConfig(dispatch) {
	return {
		indexProjects: () => {
			console.log('fire');
			dispatch(
				indexProjects()
			);
		}
	};
}

export default connect(mapStateToConfig, mapDispatchToConfig)(BuildIndex);