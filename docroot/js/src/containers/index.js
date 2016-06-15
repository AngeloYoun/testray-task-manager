import JSXComponent from 'metal-jsx';
import {connect} from 'metal-redux';
import {List, Map} from 'immutable';

import ContentHeader from '../components/content_header';
import DynamicSelectInput from '../components/dynamic_select_input';
import IndexList from '../components/index_list';
import IndexHeader from '../components/index_header';
import LinkButton from '../components/link_button';
import SelectInput from '../components/select_input';

import {
	indexIncidents
} from '../actions/incidents';

import {
	updateFilter,
	updateViewBy
} from '../actions/display';

class Index extends JSXComponent {
	attached() {
		this.config.indexIncidents();
	}

	render() {
		const filterMap = this.mapFilters();

		const data = this.config.data;
		const loading = this.config.loading;
		const viewBy = this.viewBy;

		return (
			<div class="incidents-index page-container">
				<div class="sidebar">
					<IndexHeader data={data} loading={loading} />

					<LinkButton className="primary" href={`${WatsonConstants.urls.incidents}/incidents/create/`} label="Create" />

					<div class="view-by-label">
						{'View By'}
					</div>

					<SelectInput onChange={this.config.updateViewBy} options={WatsonConstants.inputConfig.viewByOptions} value={viewBy} />

					<div class="filter-header">
						{'Filter By'}
					</div>

					<DynamicSelectInput
						elementClasses="filter-input"
						inputConfig={WatsonConstants.inputConfig.inputFieldConfig[viewBy]}
						label="Filter"
						onChange={this.config.updateFilter}
					/>
				</div>

				<div class="content-container">
					<ContentHeader headerString={this.formatHeaderString(viewBy)} />

					<div class="content">
						<IndexList data={data} filters={filterMap} loading={loading} />
					</div>
				</div>
			</div>
		);
	}

	formatHeaderString(viewBy) {
		const viewByOptions = WatsonConstants.inputConfig.viewByOptions;

		let headerString = 'Incidents';

		if (viewBy !== 'INCIDENTS') {
			const label = viewByOptions[viewBy].label;

			headerString += ` by ${label}`;
		}

		return headerString;
	}

	mapFilters() {
		const filters = {};

		const filterState = this.config.filter;

		if (filterState) {
			filterState.forEach(
				([key, value]) => {
					if (value) {
						filters[key] = value;
					}
				}
			);
		}

		return Map(filters);
	}
}

Index.STATE = {
	data: {
		value: List()
	},
	filter: {
		value: {}
	},
	loading: {
		value: false
	},
	viewBy: {
		value: 'INCIDENTS'
	}
};

function mapDispatchToConfig(dispatch) {
	return {
		indexIncidents: () => {
			dispatch(
				indexIncidents()
			);
		},
		updateFilter: filter => {
			dispatch(
				updateFilter(filter)
			);
		},
		updateViewBy: viewBy => {
			dispatch(
				updateViewBy(viewBy)
			);
		}
	};
}

function mapStateToConfig(state) {
	return {
		data: state.getIn(['incidents', 'data']),
		filter: state.getIn(['display', 'filter']),
		loading: state.getIn(['incidents', 'loading']),
		viewBy: state.getIn(['display', 'viewBy'])
	};
}

export default connect(
	mapStateToConfig,
	mapDispatchToConfig
)(Index);