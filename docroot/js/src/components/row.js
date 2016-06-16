function formatRowContent(rowContent) {
	const formattedRowContent = [];

	if (rowContent) {
		const firstThreeEntries = rowContent.slice(0, 3);

		firstThreeEntries.forEach(
			contentEntry => {
				formattedRowContent.push(
					<span class="row-content">
						{contentEntry}
					</span>
				);
			}
		);
	}

	return formattedRowContent;
}

function Row({entry}) {
	return (
		<tr class="incident-row">
			<a href={entry.link}>
				<td class="row-header">{entry.get('buildName')}</td>

				<td class="row-sub-header"><span class="status status-in-analysis">{entry.get('status')}</span></td>

				<td class="row-reported-by">{`Created on ${entry.get('createdDate')}`}</td>
				<td class="row-reported-by">{formatRowContent(entry.get('assignees'))}</td>
			</a>
		</tr>
	);
}

export default Row;