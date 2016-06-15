import JSXComponent from 'metal-jsx';
import {connect} from 'metal-redux';

import AddressesCreate from './addresses/create';
import AddressesDetails from './addresses/details';
import Header from '../components/header';
import IncidentsDetails from './incidents/details';
import Navigation from '../components/navigation';

import {editIncidents} from '../actions/incidents';
import {updateViewContext} from '../actions/display';

class EditIncident extends JSXComponent {
	attached() {
		const data = this.config.data;

		if (!data) {
			this.config.editIncidents(this.config.watsonIncidentId);
		}
	}

	created() {
		this.handleNavOnClick = this.handleNavOnClick.bind(this);
	}

	getCurrentForm() {
		const viewContext = this.config.viewContext;

		if (viewContext) {
			if (viewContext.get('viewModel') === 'watsonAddress') {
				let renderedForm;

				if (viewContext.get('viewAction') === 'edit') {
					renderedForm = <AddressesDetails />;
				}
				else {
					renderedForm = <AddressesCreate />;
				}

				return renderedForm;
			}
		}

		return <IncidentsDetails data={this.config.data} />;
	}

	handleNavOnClick(event) {
		const target = event.target;

		const viewAction = target.dataset.viewAction;

		if (viewAction) {
			this.config.updateViewContext(
				{
					entryId: target.dataset.entryId,
					viewAction,
					viewModel: target.dataset.viewModel
				}
			);
		}
	}

	render() {
		const data = this.config.data;

		let incidentName = 'Loading...';
		let incidentStatusLabel = 'Loading...';

		const addressNav = [];

		const viewContext = this.config.viewContext;

		let entryId = 0;
		let viewAction = 'edit';
		let viewModel = 'watsonIncident';

		if (viewContext) {
			if (viewContext.get('entryId')) {
				entryId = viewContext.get('entryId');
			}

			if (viewContext.get('viewAction')) {
				viewAction = viewContext.get('viewAction');
			}

			if (viewContext.get('viewModel')) {
				viewModel = viewContext.get('viewModel');
			}
		}

		if (data) {
			incidentName = data.get('name');
			incidentStatusLabel = data.get('statusLabel');

			if (data.get('addresses')) {
				const addresses = data.get('addresses');

				addresses.forEach(
					address => {
						addressNav.push(
							{
								data: {
									entryId: address.get('id'),
									onclick: this.handleNavOnClick,
									viewAction: 'edit',
									viewModel: 'watsonAddress'
								},
								selected: (entryId == address.get('id') && viewAction == 'edit' && viewModel === 'watsonAddress'),
								text: address.get('name')
							}
						);
					}
				);
			}
		}

		const nav = [
			{
				data: {
					entryId: this.config.watsonIncidentId,
					onclick: this.handleNavOnClick,
					viewAction: 'edit',
					viewModel: 'watsonIncident'
				},
				selected: (viewAction === 'edit' && viewModel === 'watsonIncident'),
				text: 'Details'
			},
			{
				data: {
					onclick: this.handleNavOnClick,
					viewAction: 'create',
					viewModel: 'watsonAddress'
				},
				entries: addressNav,
				selected: (viewAction === 'create' && viewModel === 'watsonAddress'),
				text: 'Addresses'
			}
		];

		return (
			<div class="incidents-edit page-container">
				<div class="sidebar">
					<Header mainHeader={incidentName} subHeader={incidentStatusLabel} />

					<Navigation entries={nav} onClick={this.handleNavOnClick} />
				</div>

				{this.getCurrentForm()}
			</div>
		);
	}
}

function mapDispatchToConfig(dispatch) {
	return {
		editIncidents: id => {
			dispatch(
				editIncidents(id)
			);
		},
		updateViewContext: viewContext => {
			dispatch(
				updateViewContext(viewContext)
			);
		}
	};
}

function mapStateToConfig(state) {
	const watsonIncidentId = state.getIn(
		[
			'display',
			'watsonIncidentId'
		]
	);

	return {
		data: state.getIn(
			[
				'incidents',
				'data',
				watsonIncidentId
			]
		),
		viewContext: state.getIn(
			[
				'display',
				'viewContext'
			]
		),
		watsonIncidentId
	};
}

export default connect(
	mapStateToConfig,
	mapDispatchToConfig
)(EditIncident);