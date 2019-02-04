import Constants from '../../lib/Constants';

export default class InitialState {}

InitialState.initialState = {
    tasks: JSON.parse(localStorage.getItem('tasks')) || [],
    projects: JSON.parse(localStorage.getItem('projects')) || [Constants.CHOSE_ALL_PROJECTS],
    filteredProjectName: Constants.CHOSE_ALL_PROJECTS,
    editedTaskIndex: null,
    isShowTaskForm: false
};
