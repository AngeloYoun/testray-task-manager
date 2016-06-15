import Header from './header';

function formatSubHeader(data, loading) {
	let subHeaderString = 'Loading...';

	if (data && !loading) {
		const length = data.size;

		subHeaderString = `${length} out of ${length}`;
	}

	return subHeaderString;
}

function IndexHeader({data, loading}) {
	const subHeader = formatSubHeader(data, loading);

	return (
		<Header mainHeader="Incidents" metaHeader={""} subHeader={subHeader} />
	);
}

export default IndexHeader;