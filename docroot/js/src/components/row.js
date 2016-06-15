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
					<span class="row-header">{entry.get('buildName')}</span>

					<span class="row-sub-header">{entry.get('status')}</span>

					<span class="row-reported-by">{`Created on ${entry.get('createdDate')}`}</span>
				</div>

				<div class="row-body-container">
					{formatRowContent(entry.get('assignees'))}
				</div>

				<div class="row-right-container">
				</div>
			</a>
		</div>
	);
}

export default Row;