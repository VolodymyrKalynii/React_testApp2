import Constants from '../../lib/Constants';

export default class InitialState {}

InitialState.initialState = {
    tasks: JSON.parse(localStorage.getItem('tasks')) || [],
    closedTasks: JSON.parse(localStorage.getItem('closedTasks')) || [],
    projects: JSON.parse(localStorage.getItem('projects')) || [Constants.CHOSE_ALL_PROJECTS],
    closedTasksProjects: JSON.parse(localStorage.getItem('closedTasksProjects')) || [Constants.CHOSE_ALL_PROJECTS],
    filteredProjectName: Constants.CHOSE_ALL_PROJECTS,
    isShowClosedTasks: false,
    editedTaskIndex: null,
    isShowTaskForm: false
};
