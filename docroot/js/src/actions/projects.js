import createBaseActions from './requests';

export const NAME = 'PROJECTS';

const controller = 'projects';

const base = createBaseActions(
	{
		controller,
		name: NAME
	}
);

const actionTypes = base.actionTypes;

const {
	index
} = base.actions;

export {
	actionTypes,
	index as indexProjects
};