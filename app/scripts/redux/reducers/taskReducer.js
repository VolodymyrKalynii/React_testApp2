import Constants from '../../lib/Constants';
import ArrayUtils from '../../lib/ArrayUtils';
import InitialState from '../state/InitialState';

export function taskReducer(state = InitialState.initialState, action) {
    const tasks = ArrayUtils.getClone(state.tasks);
    const projects = ArrayUtils.getClone(state.projects);
    let filteredProjectName = null;

    switch (action.type) {
        case Constants.FILTER_FOR_PROJECTS:
            filteredProjectName = action.payload;

            return {
                ...state,
                filteredProjectName
            };
        case Constants.ADD_PROJECT:
            filteredProjectName = action.payload.filteredProjectName;

            return {
                ...state,
                projects,
                filteredProjectName
            };
        case Constants.ADD_TASK:
            return {
                ...state,
                tasks,
                editedTaskIndex: null
            };
        case Constants.SAVE_TASK:
            return {
                ...state,
                tasks,
                editedTaskIndex: null,
                isShowTaskForm: false
            };
        case Constants.REMOVE_TASK:
            filteredProjectName = action.payload.filteredProjectName;

            return {
                ...state,
                tasks,
                projects,
                editedTaskIndex: null,
                filteredProjectName
            };
        case Constants.FILTER_PRIORITY:
            return {
                ...state,
                tasks
            };
        case Constants.SHOW_TASK_FORM:
            const editedTaskIndex = action.payload;

            return {
                ...state,
                isShowTaskForm: true,
                editedTaskIndex
            };
        case Constants.HIDE_TASK_FORM:
            return {
                ...state,
                isShowTaskForm: false,
                editedTaskIndex: null
            };
        default:
            return state
    }
}
