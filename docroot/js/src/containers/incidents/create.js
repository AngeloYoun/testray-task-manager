import JSXComponent from 'metal-jsx';
import {connect} from 'metal-redux';

import ContentHeader from '../../components/content_header';
import Form from '../../components/form';

import {addIncidents} from '../../actions/incidents';
import {updateViewContext} from '../../actions/display';

class IncidentsCreate extends JSXComponent {
	created() {
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	render() {
		const pageConfig = this.getConfig();

		return (
			<div class="content-container">
				<ContentHeader headerString="Create Incident" />

				<div class="content">
					<Form
						fieldConfig={WatsonConstants.inputConfig.inputFieldConfig.INCIDENTS}
						pageConfig={pageConfig}
						submitMethod={this.handleSubmit}
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
	}

	handleSubmit(data) {
		this.config.addIncidents(data);

		this.config.updateViewContext(
			{
				viewAction: 'createIncident',
				viewModel: 'watsonAddress'
			}
		);
	}

}

function mapDispatchToConfig(dispatch) {
	return {
		addIncidents: data => {
			dispatch(
				addIncidents(data)
			);
		},
		updateViewContext: viewContext => {
			dispatch(
				updateViewContext(viewContext)
			);
		}
	};
}

export default connect(
	null,
	mapDispatchToConfig
)(IncidentsCreate);