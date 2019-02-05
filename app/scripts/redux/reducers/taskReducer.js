import Consts from '../../lib/Constants';
import InitialState from '../state/InitialState';

export function taskReducer(state = InitialState.initialState, action) {
    const tasks = [...state.tasks];
    const projects = [...state.projects];
    let filteredProjectName = null;

    switch (action.type) {
        case Consts.FILTER_FOR_PROJECTS:
            filteredProjectName = action.payload;

            return {
                ...state,
                filteredProjectName
            };
        case Consts.ADD_PROJECT:
            filteredProjectName = action.payload.filteredProjectName;

            return {
                ...state,
                projects,
                filteredProjectName
            };
        case Consts.ADD_TASK:
            return {
                ...state,
                tasks,
                editedTaskIndex: null
            };
        case Consts.SAVE_TASK:
            return {
                ...state,
                tasks,
                editedTaskIndex: null,
                isShowTaskForm: false
            };
        case Consts.REMOVE_TASK:
            filteredProjectName = action.payload.filteredProjectName;

            return {
                ...state,
                tasks,
                projects,
                editedTaskIndex: null,
                filteredProjectName
            };
        case Consts.FILTER_PRIORITY:
            return {
                ...state,
                tasks
            };
        case Consts.SHOW_TASK_FORM:
            const editedTaskIndex = action.payload;

            return {
                ...state,
                isShowTaskForm: true,
                editedTaskIndex
            };
        case Consts.HIDE_TASK_FORM:
            return {
                ...state,
                isShowTaskForm: false,
                editedTaskIndex: null
            };
        default:
            return state
    }
}
