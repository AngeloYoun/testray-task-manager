import JSXComponent from 'metal-jsx';
import {List} from 'immutable';

import Button from '../components/button';
import DateInput from '../components/date_input';
import Input from '../components/input';
import SelectInput from '../components/select_input';

class DynamicSelectInput extends JSXComponent {
	created() {
		this.addInput = this.addInput.bind(this);
		this.handleOnChange = this.handleOnChange.bind(this);
		this.handleRemoveInput = this.handleRemoveInput.bind(this);
	}

	render() {
		const addedInputs = this.addedInputs;

		const renderedInputs = addedInputs.reduce(
			(prev, inputPath, index) => {
				const inputGroup = inputPath.map(
					(value, depth) => this.generateInput(inputPath, value, index, depth)
				);

				return prev.concat(
					<div class="dynamic-select-input-group">
						<Button className="remove-button" data-index={index} onClick={this.handleRemoveInput} />

						{inputGroup}
					</div>
				);
			},
			[]
		);

		const label = `Add ${this.config.label}`;

		return (
			<div class="dynamic-select-input">
				<div class="input-container">
					{renderedInputs}
				</div>

				<Button className="primary" label={label} onClick={this.addInput} />
			</div>
		);
	}

	syncInputConfig(newState, oldState) {
		if (oldState && JSON.stringify(newState) != JSON.stringify(oldState)) {
			this.setState(
				{
					addedInputs: List(),
					inputConfig: newState
				}
			);
		}
	}

	syncValue(newState) {
		if (newState) {
			let addedInputs = this.addedInputs;

			newState.forEach(
				(entry, index) => {
					if (!addedInputs.get(index)) {
						addedInputs = addedInputs.set(index, [entry]);
					}
				}
			);

			this.setState({addedInputs});
		}
	}

	addInput() {
		this.setState(
			{
				addedInputs: this.addedInputs.push([null])
			}
		);
	}

	getInputConfig(inputPath) {
		const inputOptions = this.config.inputConfig;

		return inputPath.reduce(
			(prevValue, nextValue) => {
				const options = prevValue.options || prevValue;

				return options[nextValue];
			},
			inputOptions
		);
	}

	generateInput(inputPath, value, index, depth) {
		const path = inputPath.slice(0, depth + 1);

		let inputConfig = this.config.inputConfig;

		if (depth > 0) {
			inputConfig = this.getInputConfig(
				path.slice(0, depth)
			);
		}

		const inputType = inputConfig.type;
		const inputTypeConstants = WatsonConstants.inputConfig.inputTypes;
		const options = inputConfig.options || inputConfig;

		let last = true;

		if (options) {
			const childKey = Object.keys(options)[0];

			const childConfig = options[childKey];

			last = !childConfig.type;
		}

		const config = {
			data: {
				index,
				last,
				path
			},
			onChange: this.handleOnChange,
			value
		};

		let generatedInput;

		if (depth === 0 || inputType === inputTypeConstants.selectInput) {
			generatedInput = (
				<SelectInput
					{...config}
					key={index}
					options={options}
				/>
			);
		}
		else if (inputType === inputTypeConstants.input) {
			generatedInput = (
				<Input {...config} />
			);
		}

		else if (inputType === inputTypeConstants.date) {
			generatedInput = (
				<DateInput {...config} />
			);
		}

		return generatedInput;
	}

	handleOnChange(value, data) {
		const prevAddedInputs = this.addedInputs;

		const path = data.path;
		const last = data.last;

		path[path.length - 1] = value;

		if (!last) {
			path.push(null);
		}

		const addedInputs = prevAddedInputs.set(
			data.index,
			path
		);

		this.setState({addedInputs});

		if (last) {
			this.config.onChange(addedInputs, this.config.data);
		}
	}

	handleRemoveInput(event) {
		const target = event.target;

		const index = target.dataset.index;

		const addedInputs = this.addedInputs.delete(index);

		this.setState(
			{
				addedInputs
			}
		);

		this.config.onChange(addedInputs, this.config.inputId);
	}
}

DynamicSelectInput.STATE = {
	addedInputs: {
		value: List()
	},
	inputConfig: {
		valueFn: () => {}
	},
	value: {
		value: List()
	}
};

export default DynamicSelectInput;