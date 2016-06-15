import createBaseActions from './requests';

export const NAME = 'INCIDENTS';

const controller = 'incidents';

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
	add as addIncidents,
	create as createIncidents,
	destroy as destroyIncidents,
	edit as editIncidents,
	index as indexIncidents,
	update as updateIncidents,
	view as viewIncidents
};