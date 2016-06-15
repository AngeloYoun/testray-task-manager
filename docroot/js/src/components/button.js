function Button(config) {
	const {className, label, onClick, ...otherConfig} = config;

	delete otherConfig.children;

	return (
		<button {...otherConfig} class={`watson-button ${className || ''}`} data-onclick={onClick}>
			<span>{label}</span>
		</button>
	);
}

export default Button;