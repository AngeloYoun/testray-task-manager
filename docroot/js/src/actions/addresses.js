import createBaseActions from './requests';

export const NAME = 'ADDRESSES';

const controller = 'addresses';

const base = createBaseActions(
	{
		controller,
		name: NAME
	}
);

const actionTypes = base.actionTypes;

const {
	add,
	create,
	destroy,
	edit,
	index,
	update,
	view
} = base.actions;

export {
	actionTypes,
	add as addAddresses,
	create as createAddresses,
	destroy as destroyAddresses,
	edit as editAddresses,
	index as indexAddresses,
	update as updateAddresses,
	view as viewAddresses
};