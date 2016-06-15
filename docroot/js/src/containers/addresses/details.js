import JSXComponent from 'metal-jsx';
import {connect} from 'metal-redux';
import {Map} from 'immutable';

import ContentHeader from '../../components/content_header';
import Form from '../../components/form';

import {
	editAddresses,
	updateAddresses
} from '../../actions/addresses';

class AddressesDetails extends JSXComponent {
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

		const data = this.config.data;

		if (!data) {
			this.config.editAddresses(this.config.watsonAddressId);
		}

		return (
			<div class="content-container">
				<ContentHeader headerString="Edit Address" />

				<div class="content">
					<Form
						data={this.config.data}
						fieldConfig={WatsonConstants.inputConfig.inputFieldConfig.ADDRESSES}
						pageConfig={pageConfig}
						submitMethod={this.config.updateAddresses}
					/>
				</div>
			</div>
		);
	}
}

AddressesDetails.STATE = {
	data: {
		value: Map()
	},
	watsonAddressId: {
		value: ''
	}
};

function mapStateToConfig(state) {
	const watsonAddressId = state.getIn(
		[
			'display',
			'viewContext',
			'entryId'
		]
	);

	return {
		data: state.getIn(
			[
				'addresses',
				'data',
				watsonAddressId
			]
		),
		watsonAddressId
	};
}

function mapDispatchToConfig(dispatch) {
	return {
		editAddresses: id => {
			dispatch(
				editAddresses(id)
			);
		},
		updateAddresses: data => {
			dispatch(
				updateAddresses(data)
			);
		}
	};
}

export default connect(mapStateToConfig, mapDispatchToConfig)(AddressesDetails);