import Consts from '../../lib/Constants';
import InitialState from '../state/InitialState';

export function taskReducer(state = InitialState.initialState, action) {
    const tasks = [...state.tasks];
    const closedTasks = [...state.closedTasks];
    const projects = [...state.projects];
    const closedTasksProjects = [...state.closedTasksProjects];
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
        case Consts.ADD_CLOSED_TASK_PROJECT:
            filteredProjectName = action.payload.filteredProjectName;

            return {
                ...state,
                closedTasksProjects,
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
        case Consts.REMOVE_CLOSED_TASK:
            filteredProjectName = action.payload.filteredProjectName;

            return {
                ...state,
                closedTasks,
                closedTasksProjects,
                editedTaskIndex: null,
                filteredProjectName
            };
        case Consts.CLOSEE_TASK:
            filteredProjectName = action.payload.filteredProjectName;

            return {
                ...state,
                tasks,
                projects,
                closedTasks,
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
        case Consts.TOGGLE_SHOWING_TASKS:
            const isShowClosedTasks = action.payload;
            return {
                ...state,
                isShowClosedTasks
            };
        default:
            return state
    }
}
