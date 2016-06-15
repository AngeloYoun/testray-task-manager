import Row from './row.js';

function List({data}) {
	const incidentRows = [];

	if (data) {
		data.map(
			entry => incidentRows.push(
				<Row entry={entry} />
			)
		);
	}

	return (
		<div class="incidents-list">
			{incidentRows}
		</div>
	);
}

export default List;