import JSXComponent from 'metal-jsx';
import {connect} from 'metal-redux';
import {Map} from 'immutable';

import DependentSelectInput from '../components/dependent_select_input';

class BuildIndex extends JSXComponent {
	render() {
		const config = {
			data: {
				inputId
			},
			onChange: this.handleUpdateValue,
			value: currentValue
		};
		return (
			<div class="page-container">

				<DependentSelectInput
					data={
						{inputId: 'project'}
					}
					listTypeValue={currentInputConfig.listTypeValue}
					parentValue={parentValue}
				/>
			</div>
		);
	}
}

function mapStateToConfig(state) {
	const watsonIncidentId = state.getIn(['incidents', 'data', 'watsonIncidentId']);

	return {
		data: Map(
			{
				watsonIncidentId
			}
		),
		loading: state.getIn(['incidents', 'loading']),
		viewContext: state.getIn(['display', 'viewContext'])
	};
}

export default connect(mapStateToConfig)(BuildIndex);