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
					controller: this.config.controller,
					controllerMethod: 'index.json',
					data: requestValues
				}
			).then(
				response => {
					if (response) {
						const options = {};
						response.forEach(
							entry => {
								options[entry.testrayProjectId] = {
									label: entry.name
								};
							}
						);

						this.inputOptions = options;
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