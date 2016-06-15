function Header({mainHeader, subHeader, metaHeader}) {
	return (
		<div class="header-container">
			<h1 class="main-header">
				{mainHeader}
			</h1>

			<h3 class="sub-header">
				{subHeader}
			</h3>

			<h5 class="header-meta">
				{metaHeader}
			</h5>
		</div>
	);
}

export default Header;