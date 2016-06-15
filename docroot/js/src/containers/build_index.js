import JSXComponent from 'metal-jsx';
import {connect} from 'metal-redux';
import {Map} from 'immutable';

import DependentSelectInput from '../components/dependent_select_input';

import {indexProjects} from '../actions/projects';

class BuildIndex extends JSXComponent {
	attached() {
		this.config.indexProjects();
	}

	render() {
		console.log('rendering')
		// const config = {
		// 	data: {
		// 		inputId: 'project'
		// 	},
		// 	onChange: this.handleUpdateValue,
		// 	value: currentValue
		// };

		return (
			<div class="page-container">


			</div>
		);
	}
}

function mapStateToConfig(state) {
	return {
		data: state.getIn(
			[
				'projects',
				'data',
				watsonIncidentId
			]
		)
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

export default connect(null, mapDispatchToConfig)(BuildIndex);