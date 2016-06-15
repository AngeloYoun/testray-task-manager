import JSXComponent from 'metal-jsx';

import SelectInput from './select_input';

import sendRequest from '../lib/request';

class DependentSelectInput extends JSXComponent {
	render() {
		return (
			<SelectInput {...this.config} options={this.inputOptions} />
		);
	}

	getInputOptions() {
		const listTypeValue = this.config.listTypeValue;
		const parentInputValue = this.config.parentValue;

		if (parentInputValue) {
			const requestValues = {
				parentWatsonListTypeId: parentInputValue,
				type: listTypeValue
			};

			sendRequest(
				{
					controller: 'projects',
					controllerMethod: 'index.json',
					data: requestValues
				}
			).then(
				response => {
					if (response) {
						this.inputOptions = response;
					}
				}
			);
		}
	}

	syncParentValue(newState, oldState) {
		if (newState && newState !== oldState) {
			this.getInputOptions();
		}
	}
}

DependentSelectInput.STATE = {
	inputOptions: {
		value: []
	},
	parentValue: {
		value: null
	}
};

export default DependentSelectInput;