import JSXComponent from 'metal-jsx';

import DateInput from './date_input';
import DynamicSelectInput from './dynamic_select_input';
import Input from './input';
import DependentSelectInput from './dependent_select_input';
import SelectInput from './select_input';

import Button from './button';

class Form extends JSXComponent {
	created() {
		this.handleCancel = this.handleCancel.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleUpdateValue = this.handleUpdateValue.bind(this);
		this.handleMultiInputChange = this.handleMultiInputChange.bind(this);
	}

	render() {
		const inputs = this.renderInputs();

		let cancelButton;

		if (this.config.cancelMethod) {
			cancelButton = <Button label={"Cancel"} onClick={this.handleCancel} />;
		}

		return (
			<div class="form-container">
				{inputs}

				<div class="form-button-container">
					<Button label={"Save"} onClick={this.handleSubmit} />

					{cancelButton}
				</div>
			</div>
		);
	}

	syncData(newState) {
		if (newState) {
			const formData = {};

			newState.forEach(
				(value, inputId) => {
					formData[inputId] = value;
				}
			);

			this.setState({formData});
		}
	}

	handleCancel() {
		const cancelMethod = this.config.cancelMethod;

		if (cancelMethod) {
			cancelMethod();
		}
	}

	handleSubmit() {
		const {redirectURL, submitMethod} = this.config;

		if (this.formData) {
			const postData = this.formData;

			this.setState(
				{
					loading: true
				}
			);

			submitMethod(postData);

			if (redirectURL) {
				window.location.href = redirectURL;
			}

			return true;
		}
		return false;
	}

	renderInputs() {
		const inputs = [];

		const {fieldConfig, pageConfig} = this.config;

		pageConfig.forEach(
			inputId => {
				const currentInputConfig = fieldConfig[inputId];

				const currentType = currentInputConfig.type;
				const currentValue = this.formData[inputId];
				const inputTypeConstants = WatsonConstants.inputConfig.inputTypes;
				const label = currentInputConfig.label;

				const config = {
					data: {
						inputId
					},
					onChange: this.handleUpdateValue,
					value: currentValue
				};

				let inputComponent;

				if (currentType === inputTypeConstants.input) {
					inputComponent = (
						<Input {...config} />
					);
				}
				else if (currentType === inputTypeConstants.selectInput) {
					inputComponent = (
						<SelectInput
							{...config}
							options={currentInputConfig.options}
						/>
					);
				}
				else if (currentType === inputTypeConstants.date) {
					inputComponent = (
						<DateInput {...config} />
					);
				}
				else if (currentType === inputTypeConstants.dependentSelectInput) {
					const parentInputId = currentInputConfig.parentInputId;

					const parentValue = this.formData[parentInputId];

					inputComponent = (
						<DependentSelectInput
							{...config}
							listTypeValue={currentInputConfig.listTypeValue}
							parentValue={parentValue}
						/>
					);
				}
				else if (currentType === inputTypeConstants.dynamicSelectInput) {
					config.onChange = this.handleMultiInputChange;

					inputComponent = (
						<DynamicSelectInput
							{...config}
							inputConfig={currentInputConfig.options}
							label={label}
						/>
					);
				}

				inputs.push(
					<div class="input">
						<span class="input-label">{label}</span>

						{inputComponent}
					</div>
				);
			}
		);

		return inputs;
	}

	handleMultiInputChange(inputs, data) {
		const formattedValue = [];

		inputs.forEach(
			entry => {
				const value = entry[entry.length - 1];

				formattedValue.push(value);
			}
		);

		this.handleUpdateValue(formattedValue, data);
	}

	handleUpdateValue(value, data) {
		this.setState(
			{
				formData: Object.assign(
					{},
					this.formData,
					{
						[data.inputId]: value
					}
				)
			}
		);
	}
}

Form.STATE = {
	data: {
		value: null
	},
	formData: {
		value: {}
	}
};

export default Form;