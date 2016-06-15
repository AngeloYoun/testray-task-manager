import {List, Map} from 'immutable';

import ListComponent from './list';

function filterData(data, filters) {
	const filterKeys = Object.keys(filters);

	if (filterKeys.length > 0) {
		const filteredData = {};

		data.forEach(
			(entry, entryId) => {
				const filtered = entry.some(
					(value, key) => {
						const currentFilter = filters.get(key);

						let unMatchedFilterValue = false;

						if (currentFilter) {
							const currentFilterValue = currentFilter.toLowerCase();
							const lowerCaseValue = value.toLowerCase();

							unMatchedFilterValue = lowerCaseValue.indexOf(currentFilterValue) === -1;
						}

						return unMatchedFilterValue;
					}
				);

				if (!filtered) {
					filteredData[entryId] = entry;
				}
			}
		);

		data = Map(filteredData);
	}

	return data;
}

function formatData(data) {
	const formattedData = data.map(
		(incident, key) => {

			let incidentWatsonListTypeLabel = '';

			const incidentWatsonListTypeId = incident.get('typeWatsonListTypeId');

			if (incidentWatsonListTypeId > 0) {
				const incidentWatsonListType = WatsonConstants.inputConfig.inputFieldConfig.INCIDENTS.typeWatsonListTypeId.options[incidentWatsonListTypeId];

				if (incidentWatsonListType) {
					incidentWatsonListTypeLabel = incidentWatsonListType.label;
				}
			}

			let statusLabel = '';

			const statusId = incident.get('status');

			if (statusId) {
				const status = WatsonConstants.inputConfig.inputFieldConfig.INCIDENTS.status.options[statusId];

				if (status) {
					statusLabel = status.label;
				}
			}

			return {
				header: incident.get('name'),
				headerDetail: incident.get('type'),
				lastEdited: incident.get('modifiedDate'),
				link: `${WatsonConstants.urls.incidents}/incidents/${key}/edit/`,
				reportedBy: incident.get('reportedBy'),
				reportedDate: incident.get('createDate'),
				rowContent: formatRowContent(incident),
				status: statusLabel,
				statusClass: incident.get('statusLabel'),
				subHeader: incidentWatsonListTypeLabel
			};
		}
	);

	return formattedData;
}

function formatRowContent(incident) {
	const natures = incident.get('natureWatsonListType');

	const natureLabels = [];

	natures.forEach(
		id => {
			if (id > 0) {
				const natureWatsonListType = WatsonConstants.inputConfig.inputFieldConfig.INCIDENTS.natureWatsonListType.options[id];

				if (natureWatsonListType) {
					natureLabels.push(natureWatsonListType.label);
				}
			}
			else {
				natureLabels.push('0');
			}
		}
	);

	return List(natureLabels);
}

function IndexList({data, filters, loading}) {
	data = data || Map();

	if (!loading) {
		if (filters) {
			data = filterData(data, filters);
		}

		data = formatData(data);
	}

	return (
		<ListComponent data={data} />
	);
}

export default IndexList;