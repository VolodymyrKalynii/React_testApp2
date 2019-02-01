import * as React from 'react';
import checkProjects from '../lib/checkProjects';

export default class TaskForm extends React.Component {
    constructor(props) {
        super(props);

        this.addTaskAction = props.addTaskAction;
        this.addProjectAction = props.addProjectAction;
        this.editTaskAction = props.editTaskAction;

        this.showTaskForm = props.showTaskForm;
        this.isShowTaskForm = props.isShowTaskForm;
        this.addTask = this.addTask.bind(this);
        this.checkProjects = this.checkProjects.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.disableFormButtonAdd = this.disableFormButtonAdd.bind(this);
        this.enableFormButtonAdd = this.enableFormButtonAdd.bind(this);
        TaskForm.createFromValues = TaskForm.createFromValues.bind(this);
    }

    componentDidMount(){
        this.setFormsValues(this.props);
        this.validateForm();
    }

    componentWillReceiveProps(nextProps) {
        this.setFormsValues(nextProps);
        this.validateForm();
    }

    render() {
        const editedTaskIndex = this.props.editedTaskIndex;
        const isEditingMode = editedTaskIndex !== null;
        let formButtonAddText = 'Add task';

        if (isEditingMode)
            formButtonAddText = 'Save task';

        return (
            <div className='taskForm'>
                <input className='taskForm__input' ref='taskName' onChange={this.validateForm} type="text" placeholder='Task name'/>
                <input className='taskForm__input' ref='projectName' onChange={this.validateForm} type="text" placeholder='Project name'/>
                <div>
                    <span>Priority </span>
                    <select name="" id="" ref='priority'>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                </div>
                <input className='taskForm__input' ref='taskDesk' onChange={this.validateForm} type="text" placeholder='Task description'/>
                <button className='taskForm__input' ref='formButtonAdd' onClick={this.addTask}> {formButtonAddText}</button>
                <button className='taskForm__input' ref='formButtonBack' onClick={this.showTaskForm.bind(null, !this.isShowTaskForm)}>Back</button>
            </div>
        );
    }

    /**
     *
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

    /**
     *
     * @param {{}} props
     */
    setFormsValues(props) {
        const editedTaskIndex = props.editedTaskIndex;
        const isEditingMode = editedTaskIndex !== null;
        const tasks = props.tasks;

        if (isEditingMode) {
            const formValues = TaskForm.createFromValues(tasks, editedTaskIndex);
            const taskName = this.refs.taskName;
            const projectName = this.refs.projectName;
            const priority = this.refs.priority;
            const taskDesk = this.refs.taskDesk;

            taskName.value = formValues.name;
            projectName.value = formValues.project;
            priority.value = formValues.priority;
            taskDesk.value = formValues.task;
        }
    }

    addTask() {
        const taskName = this.refs.taskName;
        const projectName = this.refs.projectName;
        const priority = this.refs.priority;
        const taskDesk = this.refs.taskDesk;
        const tasks = this.props.tasks;
        const editedTaskIndex = this.props.editedTaskIndex;
        this.isEditingMode = editedTaskIndex !== null;
        this.oldTaskProject = null;

        const taskObj = {
            name: taskName.value,
            project: projectName.value.toLowerCase(),
            task: taskDesk.value,
            priority: priority.value,
            time: Date.now()
        };

        if (this.isEditingMode) {
            this.oldTaskProject = tasks[editedTaskIndex].project;

            tasks[editedTaskIndex] = taskObj;

            this.editTaskAction(tasks);
        } else {
            tasks.push(taskObj);

            this.addTaskAction(tasks);
        }

        this.checkProjects(taskObj, tasks);

        taskName.value = '';
        taskDesk.value = '';
        projectName.value = '';
        priority.value = 1;

        this.validateForm();
    }

    /**
     *
     * @param {{}} taskObj
     * @param {Array<*>} tasks
     */
    checkProjects(taskObj, tasks) {
        let projects = this.props.projects;
        let filteredProjectName = this.props.filteredProjectName;

        if (this.isEditingMode) {
            const projectsObj = checkProjects(tasks, projects, this.oldTaskProject, filteredProjectName);

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
    }

    validateForm() {
        if (!this.refs.taskName.value || !this.refs.taskDesk.value)
            this.disableFormButtonAdd();
        else
            this.enableFormButtonAdd();
    }

    disableFormButtonAdd() {
        this.refs.formButtonAdd.setAttribute('disabled', 'disabled');
    }

    enableFormButtonAdd() {
        this.refs.formButtonAdd.removeAttribute('disabled');
    }
}
