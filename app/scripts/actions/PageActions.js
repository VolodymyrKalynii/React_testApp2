import Constants from '../lib/Constants';

export default class Actions {
    static addTask(tasks) {
        return {
            type: Constants.ADD_TASK,
            payload: tasks
        }
    }

    static addProject(projects) {
        return {
            type: Constants.ADD_PROJECT,
            payload: projects
        }
    }

    static removeTask(taskId) {
        return {
            type: Constants.REMOVE_TASK,
            payload: taskId
        }
    }

    static showTaskForm(showForm) {
        return{
            type: Constants.SHOW_TASK_FORM,
            payload: showForm
        }
    }

    static filterPriority(tasks) {
        return{
            type: Constants.FILTER_PRIORITY,
            payload: tasks
        }
    }

    static filterForProjects(project) {
        return{
            type: Constants.FILTER_FOR_PROJECTS,
            payload: project
        }
    }

    static startEditTask(editedTaskIndex) {
        return{
            type: Constants.START_EDIT_TASK,
            payload: editedTaskIndex
        }
    }

    static editTask(task) {
        return{
            type: Constants.EDIT_TASK,
            payload: task
        }
    }
}
