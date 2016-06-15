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
		<div class="incident-row">
			<a href={entry.link}>
				<div class="row-header-container">
					<span class="row-header">{entry.header}</span>

					<span class="row-sub-header">{entry.subHeader}</span>

					<span class="row-reported-by">{`Reported by ${entry.reportedBy} on ${entry.reportedDate}`}</span>
				</div>

				<div class="row-body-container">
					{formatRowContent(entry.rowContent)}
				</div>

				<div class="row-right-container">
					<div class="row-right-header">
						<span class="row-small-incident-name">{entry.smallIncidentName}</span>

						<span class={entry.statusClass}>{entry.status}</span>
					</div>

					<span class="row-last-edited">{`Last Edited ${entry.lastEdited}`}</span>
				</div>
			</a>
		</div>
	);
}

export default Row;