import * as React from 'react';
import PropTypes from 'prop-types';

import checkProjects from '../lib/checkProjects';

export default class TaskForm extends React.Component {
    constructor(props) {
        super(props);

        this.addTaskAction = props.addTaskAction;
        this.saveTaskAction = props.saveTaskAction;
        this.addProjectAction = props.addProjectAction;
        this.hideTaskFormAction = props.hideTaskFormAction;

        this.checkEditingMode(props);
    }

    componentDidMount(){
        this.setFormsValues(this.props);
        this.validateForm();
    }

    componentWillReceiveProps(nextProps) {
        this.checkEditingMode(nextProps);
        this.setFormsValues(nextProps);
        this.validateForm();
    }

    render() {
        let formButtonAddText = this.isEditingMode ? 'Save task': 'Add task';

        return (
            <div className='taskForm'>
                <div className="taskForm__block">
                    <span className='taskForm__inputTitle'>Task</span>
                    <input className='taskForm__input' ref='taskName' onChange={this.validateForm} type="text" placeholder='Task'/>
                </div>
                <div className="taskForm__block">
                    <span className='taskForm__inputTitle'>Project</span>
                    <input className='taskForm__input' ref='projectName' onChange={this.validateForm} type="text" placeholder='Project'/>
                </div>
                <div className='taskForm__block'>
                    <span className='taskForm__inputTitle'>Priority</span>
                    <select className='taskForm__input' name="" id="" ref='priority'>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                </div>
                <div className="taskForm__block">
                    <span className='taskForm__inputTitle'>Description</span>
                    <textarea  className='taskForm__input' ref='taskDesk' onChange={this.validateForm} placeholder='Description' />
                </div>
                <div className="taskForm__buttons">
                    <button className='taskForm__button' ref='formButtonAdd' onClick={this.addTask}>{formButtonAddText}</button>
                    <button className='taskForm__button' ref='formButtonBack' onClick={this.hideTaskForm}>Back</button>
                </div>
            </div>
        );
    }

    /**
     * @param {Array<*>} tasks
     * @param {number} editedTaskIndex
     * @return {{name: (*|string), project: string | * | string, task: (string|*), priority: number | RTCPriorityType | string}}
     */
    static createFromValues(tasks, editedTaskIndex) {
        return {
            name: tasks[editedTaskIndex].name || '',
            project: tasks[editedTaskIndex].project || '',
            task: tasks[editedTaskIndex].task || '',
            priority: tasks[editedTaskIndex].priority || '',
        }
    }

    hideTaskForm = () => {
        this.hideTaskFormAction()
    };

    /**
     * @param {{}} props
     */
    setFormsValues(props) {
        const tasks = props.tasks;

        if (this.isEditingMode) {
            const formValues = TaskForm.createFromValues(tasks, this.editedTaskIndex);
            const {
                taskName,
                projectName,
                priority,
                taskDesk
            } = this.refs;

            taskName.value = formValues.name;
            projectName.value = formValues.project;
            priority.value = formValues.priority;
            taskDesk.value = formValues.task;
        }
    }

    addTask = () => {
        const tasks = this.props.tasks;
        const taskObj = this.createTaskObj();
        let oldTaskProject = null;

        if (this.isEditingMode) {
            oldTaskProject = tasks[this.editedTaskIndex].project;

            tasks[this.editedTaskIndex] = taskObj;

            this.saveTaskAction(tasks);
        } else {
            tasks.push(taskObj);

            this.addTaskAction(tasks);
        }

        this.checkProjects(taskObj, tasks, oldTaskProject);
        this.resetForm();
        this.validateForm();
    };

    createTaskObj = () => {
        const {
            taskName,
            projectName,
            priority,
            taskDesk
        } = this.refs;

        return {
            name: taskName.value,
            project: projectName.value.toLowerCase(),
            task: taskDesk.value,
            priority: priority.value,
            time: Date.now()
        }
    };

    /**
     * @param {{}} taskObj
     * @param {Array<*>} tasks
     * @param {null || string} oldTaskProject
     */
    checkProjects = (taskObj, tasks, oldTaskProject) => {
        let {projects, filteredProjectName} = this.props;

        if (this.isEditingMode) {
            const projectsObj = checkProjects(tasks, projects, oldTaskProject, filteredProjectName);

            projects = projectsObj.projects;
            filteredProjectName = projectsObj.filteredProjectName
        }

        if (!~projects.indexOf(taskObj.project)) {
            projects.push(taskObj.project.toLowerCase());
            this.addProjectAction({
                projects,
                filteredProjectName
            });
        }
    };

    /**
     * @param {{}} props
     */
    checkEditingMode = (props) => {
        this.editedTaskIndex = props.editedTaskIndex;
        this.isEditingMode = this.editedTaskIndex !== null;
    };

    resetForm = () => {
        const {
            taskName,
            projectName,
            priority,
            taskDesk
        } = this.refs;

        taskName.value = '';
        taskDesk.value = '';
        projectName.value = '';
        priority.value = 1;
    };

    validateForm = () => {
        if (!this.refs.taskName.value || !this.refs.taskDesk.value)
            this.disableFormButtonAdd();
        else
            this.enableFormButtonAdd();
    };

    disableFormButtonAdd = () => {
        this.refs.formButtonAdd.setAttribute('disabled', 'disabled');
    };

    enableFormButtonAdd= () => {
        this.refs.formButtonAdd.removeAttribute('disabled');
    }
}

TaskForm.propTypes = {
    tasks: PropTypes.array.isRequired,
    projects: PropTypes.array.isRequired,
    editedTaskIndex: PropTypes.number,
    filteredProjectName: PropTypes.string.isRequired,
    addTaskAction: PropTypes.func.isRequired,
    saveTaskAction: PropTypes.func.isRequired,
    addProjectAction: PropTypes.func.isRequired,
    hideTaskFormAction: PropTypes.func.isRequired,
};