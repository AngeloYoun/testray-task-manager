function HeaderToolbar({logoHref, signOutHref, userName}) {
	return (
		<div class="watson-header-toolbar">
			<a class="watson-logo-link" href={logoHref}>
				<div class="watson-logo" />
			</a>

			<a class="watson-logout" href={signOutHref}>
				{userName}
			</a>
		</div>
	);
}

export default HeaderToolbar;