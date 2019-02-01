import Constants from '../lib/Constants';

function addTask(tasks) {
    return {
        type: Constants.ADD_TASK,
        payload: tasks
    }
}

function addProject(projects) {
    return {
        type: Constants.ADD_PROJECT,
        payload: projects
    }
}

function removeTask(taskId) {
    return {
        type: Constants.REMOVE_TASK,
        payload: taskId
    }
}

function showTaskForm(showForm) {
    return{
        type: Constants.SHOW_TASK_FORM,
        payload: showForm
    }
}

function filterPriority(tasks) {
    return{
        type: Constants.FILTER_PRIORITY,
        payload: tasks
    }
}

function filterForProjects(project) {
    return{
        type: Constants.FILTER_FOR_PROJECTS,
        payload: project
    }
}

function startEditTask(editedTaskIndex) {
    return{
        type: Constants.START_EDIT_TASK,
        payload: editedTaskIndex
    }
}

function editTask(task) {
    return{
        type: Constants.EDIT_TASK,
        payload: task
    }
}

export {addTask, removeTask, showTaskForm, filterPriority, addProject, filterForProjects, startEditTask, editTask}