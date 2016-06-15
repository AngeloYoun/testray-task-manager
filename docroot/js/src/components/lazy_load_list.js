import JSXComponent from 'metal-jsx';

import ListComponent from './list';

const startingEntryCount = 8;

class LazyLoadList extends JSXComponent {
	created() {
		this.loadEntries = this.loadEntries.bind(this);
	}

	render() {
		const data = this.processDataPayload();

		return (
			<ListComponent
				data={data}
				loadEntries={this.loadEntries}
			/>
		);
	}

	syncData(newState, oldState) {
		if (JSON.stringify(newState) !== JSON.stringify(oldState)) {
			this.setState(
				{
					data: newState,
					loadedEntries: startingEntryCount
				}
			);
		}
	}

	loadEntries() {
		const payloadCount = 8;

		this.setState(
			{
				loadedEntries: this.loadedEntries + payloadCount
			}
		);
	}

	processDataPayload() {
		let data = this.config.data;

		const entryCount = this.loadedEntries;

		if (entryCount < data.size) {
			data = data.slice(0, entryCount);
		}

		return data;
	}
}

LazyLoadList.STATE = {
	data: {
		value: {}
	},
	loadedEntries: {
		value: startingEntryCount
	}
};

export default LazyLoadList;