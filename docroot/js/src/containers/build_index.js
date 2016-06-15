import JSXComponent from 'metal-jsx';
import {connect} from 'metal-redux';
import {Map} from 'immutable';

import DependentSelectInput from '../components/dependent_select_input';
import SelectInput from '../components/select_input';

import {indexProjects} from '../actions/projects';
import {indexUsers} from '../actions/users';


class BuildIndex extends JSXComponent {
	attached() {
		this.config.indexProjects();
		this.config.indexUsers();
	}

	created() {
		this.handleUpdateValue = this.handleUpdateValue.bind(this);
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
		console.log(this.selectedData['projects'])

		return (
			<div class="page-container">
				<div class="project-select">
					<span class="label">Projects</span>
					<SelectInput
						data={{inputId: 'projects'}}
						onChange={this.handleUpdateValue}
						options={options}
						value={this.selectedData.projects}
					/>
				</div>

				<div class="build-type-select">
					<span class="label">Jobs</span>
					<DependentSelectInput
						data={{inputId: 'buildTypes'}}
						controller="build_types"
						key="BuildType"
						parentKey="Project"
						onChange={this.handleUpdateValue}
						parentValue={this.selectedData['projects']}
						value={this.selectedData.buildTypes}
					/>
				</div>

				<div class="build-type-select">
					<span class="label">Builds</span>
					<DependentSelectInput
						data={{inputId: 'builds'}}
						controller="builds"
						key="Build"
						parentKey="BuildType"
						onChange={this.handleUpdateValue}
						parentValue={this.selectedData['buildTypes']}
						value={this.selectedData.builds}
					/>
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
		},
		indexUsers: () => {
			console.log('fire');
			dispatch(
				indexUsers()
			);
		}
	};
}

export default connect(mapStateToConfig, mapDispatchToConfig)(BuildIndex);