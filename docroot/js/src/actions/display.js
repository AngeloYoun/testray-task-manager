export const NAME = 'DISPLAY';

const actionTypes = {
	UPDATE_DISPLAY: 'UPDATE_DISPLAY',
	UPDATE_FILTER: 'UPDATE_FILTER',
	UPDATE_PAGE_CONTEXT: 'UPDATE_PAGE_CONTEXT',
	UPDATE_VIEW_BY: 'UPDATE_VIEW_BY',
	UPDATE_VIEW_CONTEXT: 'UPDATE_VIEW_CONTEXT'
};

const actions = {
	updateDisplay: data => {
		return {
			data,
			type: actionTypes.UPDATE_DISPLAY
		};
	},
	updateFilter: data => {
		return {
			data,
			type: actionTypes.UPDATE_FILTER
		};
	},
	updatePageContext: data => {
		return {
			data,
			type: actionTypes.UPDATE_PAGE_CONTEXT
		};
	},
	updateViewBy: data => {
		return {
			data,
			type: actionTypes.UPDATE_VIEW_BY
		};
	},
	updateViewContext: data => {
		return {
			data,
			type: actionTypes.UPDATE_VIEW_CONTEXT
		};
	}
};

const {
	updateDisplay,
	updateFilter,
	updatePageContext,
	updateViewBy,
	updateViewContext
} = actions;

export {
	actionTypes,
	updateDisplay,
	updateFilter,
	updatePageContext,
	updateViewBy,
	updateViewContext
};