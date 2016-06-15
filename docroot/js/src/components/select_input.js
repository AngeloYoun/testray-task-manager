import JSXComponent from 'metal-jsx';
import bridge from 'metal-react';
import Select from 'react-select';

const MetalSelect = bridge(Select);

class SelectInput extends JSXComponent {
	created() {
		this.handleOnChange = this.handleOnChange.bind(this);
	}

	handleOnChange(option) {
		this.config.onChange(option.value, this.config.data);
	}

	render() {
		const {options, value} = this.config;

		const renderedOptions = [
			{
				label: '',
				value: ''
			}
		];

		if (options) {
			for (const entry in options) {
				const label = options[entry].label;

				renderedOptions.push(
					{
						label,
						value: entry
					}
				);
			}
			console.log(renderedOptions)
		}

		return (
			<MetalSelect
				key={this.config.key}
				onChange={this.handleOnChange}
				options={renderedOptions}
				value={value ? value.toString() : ''}
			/>
		);
	}
}

export default SelectInput;