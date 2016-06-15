import JSXComponent from 'metal-jsx';
import {connect} from 'metal-redux';

import ContentHeader from '../../components/content_header';
import Form from '../../components/form';

import {updateIncidents} from '../../actions/incidents';

class IncidentsDetails extends JSXComponent {
	render() {
		const pageConfig = this.getConfig();

		return (
			<div class="content-container">
				<ContentHeader headerString="Edit Incident" />

				<div class="content">
					<Form
						data={this.config.data}
						fieldConfig={WatsonConstants.inputConfig.inputFieldConfig.INCIDENTS}
						pageConfig={pageConfig}
						submitMethod={this.config.updateIncidents}
					/>
				</div>
			</div>
		);
	}

	getConfig() {
		return [
			'status',
			'sourceWatsonListTypeId',
			'typeWatsonListTypeId',
			'reportDate',
			'startDate',
			'endDate',
			'natureWatsonListType',
			'description'
		];
	};
}

IncidentsDetails.STATE = {
	data: {
		value: null
	}
};

function mapDispatchToConfig(dispatch) {
	return {
		updateIncidents: data => {
			dispatch(
				updateIncidents(data)
			);
		}
	};
}

export default connect(
	null,
	mapDispatchToConfig
)(IncidentsDetails);