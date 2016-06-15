import createBaseActions from './requests';

export const NAME = 'TASKS';

const controller = 'tasks';

const base = createBaseActions(
	{
		controller,
		name: NAME
	}
);

const actionTypes = base.actionTypes;

const {
	launchpadIndex
} = base.actions;

export {
	actionTypes,
	launchpadIndex as indexTasks
};