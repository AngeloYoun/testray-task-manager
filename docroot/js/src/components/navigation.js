function populateConfig(config, data) {
	for (const key in data) {
		const dashedKey = key.replace(
			/([A-Z])/g,
			key => {
				return `-${key.toLowerCase()}`;
			}
		);

		config[`data-${dashedKey}`] = data[key];
	}
}

function populateNavigation(entries, onClick) {
	const navRows = [];

	if (!entries) {
		entries = WatsonConstants.defaultNavigation;
	}

	if (entries) {
		entries.forEach(
			entry => {
				const selected = entry.selected ? 'selected' : '';

				const config = {
					class: 'watson-nav-link'
				};

				if (entry.href) {
					config.href = entry.href;
				}

				const data = entry.data;

				if (data) {
					populateConfig(config, data);
				}

				navRows.push(
					<li class={`watson-nav-entry ${selected}`}>
						<a {...config}>{entry.text}</a>
					</li>
				);

				if (entry.entries) {
					navRows.push(
						<ul>
							{populateNavigation(entry.entries, onClick)}
						</ul>
					);
				}
			}
		);
	}

	return navRows;
}

function Navigation({entries, onClick}) {
	return (
		<nav class="watson-nav">
			<ul class="watson-nav-wrapper">
				{populateNavigation(entries, onClick)}
			</ul>
		</nav>
	);
}

export default Navigation;