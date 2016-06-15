function LinkButton({href, label, className}) {
	return (
		<a class={`watson-button ${className || ''}`} href={href}>
			<span>{label}</span>
		</a>
	);
}

export default LinkButton;