import JSXComponent from 'metal-jsx';
import {connect} from 'metal-redux';
import {Map} from 'immutable';

import ContentHeader from '../../components/content_header';
import Form from '../../components/form';

import {
	addAddresses
} from '../../actions/addresses';

class AddressesCreate extends JSXComponent {
	getConfig() {
		return [
			'typeWatsonListTypeId',
			'provinceWatsonListTypeId',
			'districtWatsonListTypeId',
			'subDistrictWatsonListTypeId',
			'name',
			'postalCode',
			'street',
			'number',
			'building',
			'floor',
			'room',
			'description',
			'lastSeenDate',
			'latitude',
			'longitude'
		];
	};

	render() {
		const pageConfig = this.getConfig();

		let cancelMethod;
		let redirectURL;

		if (this.config.viewContext) {
			if (this.config.viewContext.get('viewAction') == 'createIncident') {
				cancelMethod = () => {
					window.location.href = '/';
				};

				redirectURL = WatsonConstants.urls.incidents;
			}
		}

		return (
			<div class="content-container">
				<ContentHeader headerString="Add Address" />

				<div class="content">
					<Form
						cancelMethod={cancelMethod}
						data={this.config.data}
						fieldConfig={WatsonConstants.inputConfig.inputFieldConfig.ADDRESSES}
						pageConfig={pageConfig}
						redirectURL={redirectURL}
						submitMethod={this.config.addAddresses}
					/>
				</div>
			</div>
		);
	}
}

function mapStateToConfig(state) {
	let watsonIncidentId = state.getIn(['display', 'watsonIncidentId']);

	if (!watsonIncidentId) {
		watsonIncidentId = state.getIn(['incidents', 'data', 'watsonIncidentId']);
	}

	return {
		data: Map(
			{
				watsonIncidentId
			}
		),
		viewContext: state.getIn(['display', 'viewContext'])
	};
}

function mapDispatchToConfig(dispatch) {
	return {
		addAddresses: data => {
			dispatch(
				addAddresses(data)
			);
		}
	};
}

export default connect(mapStateToConfig, mapDispatchToConfig)(AddressesCreate);