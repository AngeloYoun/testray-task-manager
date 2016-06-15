import JSXComponent from 'metal-jsx';
import {connect} from 'metal-redux';

import HeaderToolbar from '../components/header_toolbar';

import BuildIndex from './build_index';

class App extends JSXComponent {
	render() {
		let renderedPage;

		const pageContext = this.config.pageContext;

		if (pageContext === 'buildIndex') {
			renderedPage = <BuildIndex />;
		}

		// const headerConfig = {
		// 	logoHref: `${WatsonConstants.urls.baseURL}/incidents`,
		// 	signOutHref: `${themeDisplay.getPortalURL()}/c/portal/logout`,
		// 	userName: 'Logout'
		// };

		return (
			<div class="testray-app">
				{renderedPage}
			</div>
		);
	}
}

App.STATE = {
	pageContext: {
		value: 'buildIndex'
	}
};

function mapStateToConfig(state) {
	return {
		pageContext: state.getIn(
			[
				'display',
				'pageContext'
			]
		)
	};
}

export default connect(
	mapStateToConfig
)(App);