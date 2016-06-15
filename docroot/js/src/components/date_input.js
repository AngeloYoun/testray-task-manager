import JSXComponent from 'metal-jsx';

class DateInput extends JSXComponent {
	created() {
		this.handleOnChange = this.handleOnChange.bind(this);
	}

	render() {
		return (
			<input
				class="watson-input"
				data-onchange={this.handleOnChange}
				type="date"
			/>
		);
	}

	handleOnChange(event) {
		const value = event.target.value;

		this.config.onChange(value, this.config.data);
	}
}

export default DateInput;