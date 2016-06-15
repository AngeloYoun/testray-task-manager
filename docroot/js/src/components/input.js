import JSXComponent from 'metal-jsx';

class Input extends JSXComponent {
	created() {
		this.handleOnChange = this.handleOnChange.bind(this);
	}

	render() {
		return (
			<input
				class="watson-input"
				data-oninput={this.handleOnChange}
				value={this.config.value}
			/>
		);
	}

	handleOnChange(event) {
		const value = event.target.value;

		this.config.onChange(value, this.config.data);
	}
}

export default Input;