import {CALL_API} from '../middleware/api';
import {createActionTypes} from '../lib/util';

const requestActions = ['add', 'create', 'edit', 'destroy', 'index', 'launchpadIndex', 'update', 'view'];

export default ({controller, name}) => {
	const actionTypes = requestActions.reduce(
		(result, next) => (
			{
				...result,
				...createActionTypes(next, name, true)
			}
		),
		{}
	);

	const actions = {
		add: data => {
			return {
				[CALL_API]: {
					controller,
					controllerMethod: 'add.json',
					data,
					types: [actionTypes.ADD_REQUEST, actionTypes.ADD_SUCCESS, actionTypes.ADD_FAILURE]
				}
			};
		},

		launchpadIndex: data => {
			console.log('launchpad')
			return {
				[CALL_API]: {
					controller,
					controllerMethod: '',
					launchpad: true,
					data,
					types: [actionTypes.ADD_REQUEST, actionTypes.ADD_SUCCESS, actionTypes.ADD_FAILURE]
				}
			}
		},

		create: data => {
			return {
				[CALL_API]: {
					controller,
					controllerMethod: 'create.json',
					data,
					types: [actionTypes.CREATE_REQUEST, actionTypes.CREATE_SUCCESS, actionTypes.CREATE_FAILURE]
				}
			};
		},

		destroy: id => {
			return {
				id,
				[CALL_API]: {
					controller,
					controllerMethod: 'delete.json',
					data: {
						id
					},
					types: [actionTypes.DESTROY_REQUEST, actionTypes.DESTROY_SUCCESS, actionTypes.DESTROY_FAILURE]
				}
			};
		},

		edit: id => {
			return {
				[CALL_API]: {
					controller,
					controllerMethod: 'edit.json',
					data: {
						id
					},
					types: [actionTypes.EDIT_REQUEST, actionTypes.EDIT_SUCCESS, actionTypes.EDIT_FAILURE]
				}
			};
		},

		index: id => {
			return {
				id,
				[CALL_API]: {
					controller,
					controllerMethod: 'index.json',
					data: {
						id
					},
					types: [actionTypes.INDEX_REQUEST, actionTypes.INDEX_SUCCESS, actionTypes.INDEX_FAILURE]
				}
			};
		},

		update: data => {
			return {
				id: data.id,
				[CALL_API]: {
					controller,
					controllerMethod: 'update.json',
					data,
					types: [actionTypes.UPDATE_REQUEST, actionTypes.UPDATE_SUCCESS, actionTypes.UPDATE_FAILURE]
				}
			};
		},

		view: id => {
			return {
				id,
				[CALL_API]: {
					controller,
					controllerMethod: 'view.json',
					data: {
						id
					},
					types: [actionTypes.VIEW_REQUEST, actionTypes.VIEW_SUCCESS, actionTypes.VIEW_FAILURE]
				}
			};
		}
	};

	return {
		actions,
		actionTypes
	};
};