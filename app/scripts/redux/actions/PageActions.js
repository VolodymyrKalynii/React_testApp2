import Constants from '../../lib/Constants';

export default class PageActions {
    /**
     * @param {Array<{}>} tasks
     * @return {{type: string, payload: *}}
     */
    static addTask(tasks) {
        return {
            type: Constants.ADD_TASK,
            payload: tasks
        }
    }

    /**
     * @param {Array<string>} projects
     * @return {{type: string, payload: *}}
     */
    static addProject(projects) {
        return {
            type: Constants.ADD_PROJECT,
            payload: projects
        }
    }

    /**
     * @param {Array<string>} projects
     * @return {{type: string, payload: *}}
     */
    static addClosedTaskProject(projects) {
        return {
            type: Constants.ADD_CLOSED_TASK_PROJECT,
            payload: projects
        }
    }

    /**
     * @param {{}} taskObj
     * @return {{type: string, payload: *}}
     */
    static removeTask(taskObj) {
        return {
            type: Constants.REMOVE_TASK,
            payload: taskObj
        }
    }

    /**
     * @param {{}} taskObj
     * @return {{type: string, payload: *}}
     */
    static removeClosedTask(taskObj) {
        return {
            type: Constants.REMOVE_CLOSED_TASK,
            payload: taskObj
        }
    }

    /**
     * @param {{}} taskObj
     * @return {{type: string, payload: *}}
     */
    static closeTask(taskObj) {
        return {
            type: Constants.CLOSEE_TASK,
            payload: taskObj
        }
    }

    /**
     * @param {{}} task
     * @return {{type: string, payload: *}}
     */
    static showTaskForm(task) {
        return{
            type: Constants.SHOW_TASK_FORM,
            payload: task
        }
    }

    static toggleShowingTasks(isShowClosedTasks) {
        return{
            type: Constants.TOGGLE_SHOWING_TASKS,
            payload: isShowClosedTasks
        }
    }

    static hideTaskForm() {
        return{
            type: Constants.HIDE_TASK_FORM
        }
    }

    /**
     * @param {Array<{}>} tasks
     * @return {{type: string, payload: *}}
     */
    static filterPriority(tasks) {
        return{
            type: Constants.FILTER_PRIORITY,
            payload: tasks
        }
    }

    /**
     * @param {Array<{}>} projectName
     * @return {{type: string, payload: *}}
     */
    static filterForProjects(projectName) {
        return{
            type: Constants.FILTER_FOR_PROJECTS,
            payload: projectName
        }
    }

    /**
     * @param {{}} task
     * @return {{type: string, payload: *}}
     */
    static saveTask(task) {
        return{
            type: Constants.SAVE_TASK,
            payload: task
        }
    }
}
