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
		<table class="table incidents-list">
			{incidentRows}
		</table>
	);
}

export default List;