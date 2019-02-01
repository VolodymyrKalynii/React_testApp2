import Constants from '../lib/Constants';

import ArrayUtils from '../lib/ArrayUtils';
import InitialState from '../state/InitialState';

export function taskReducer(state = InitialState.initialState, action) {
    switch (action.type) {
        case Constants.FILTER_FOR_PROJECTS:
            return {...state, filteredProjectName: action.payload};
        case Constants.ADD_PROJECT:
            const projects = ArrayUtils.getClone(state.projects);
            const filteredProjectName2 = action.payload.filteredProjectName;

            return {...state, projects, filteredProjectName: filteredProjectName2};
        case Constants.ADD_TASK:
            const tasks = ArrayUtils.getClone(state.tasks);

            return {...state, tasks, editedTaskIndex: null};
        case Constants.EDIT_TASK:
            const tasks4 = ArrayUtils.getClone(state.tasks);

            return {...state, tasks: tasks4, editedTaskIndex: null, isShowTaskForm: false};
        case Constants.REMOVE_TASK:
            const tasks2 = ArrayUtils.getClone(action.payload.tasks);
            const projects2 = ArrayUtils.getClone(action.payload.projects);
            const filteredProjectName = action.payload.filteredProjectName;

            return {...state, tasks: tasks2, projects: projects2, editedTaskIndex: null, filteredProjectName};
        case Constants.FILTER_PRIORITY:
            const tasks3 = ArrayUtils.getClone(action.payload);

            return {...state, tasks: tasks3};
        case Constants.START_EDIT_TASK:
            const editedTaskIndex = action.payload.index;

            return {...state, isShowTaskForm: true, editedTaskIndex};
        case Constants.SHOW_TASK_FORM:
            return {...state, isShowTaskForm: action.payload, editedTaskIndex: null};
        default:
            return state
    }
}
