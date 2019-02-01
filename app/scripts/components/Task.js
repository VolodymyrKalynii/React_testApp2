import * as React from 'react';
import checkProjects from '../lib/checkProjects';

export default class Task extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showDetails: false
        };

        this.detailsButtonText = 'Show details';
        this.removeTask = this.props.removeTask;
        this.startEditTaskAction = this.props.startEditTaskAction;

        this.editTask = this.editTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.showDetails = this.showDetails.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const editedTaskIndex = nextProps.editedTaskIndex;
        this.isEditingMode = editedTaskIndex !== null;

        this.validateDeleteTaskButton();
    }

    render() {
        this.task = this.props.item;
        this.tasks = this.props.tasks;
        this.projects = this.props.projects;
        this.filteredProjectName = this.props.filteredProjectName;

        return (
            <div className='taskList__task taskWrapper'>
                <h5>{this.task.name}</h5>
                <h6>Project {this.task.project}</h6>
                <h6>Priority {this.task.priority}</h6>
                {this.renderDetailsBlock(this.task)}
                <button onClick={this.showDetails}>{this.detailsButtonText}</button>
                <button onClick={this.editTask}>Edit task</button>
                <button ref='deleteTaskButton' onClick={this.deleteTask}>Delete task</button>
            </div>
        )
    }

    deleteTask() {
        const currentTaskProject = this.tasks[this.props.index].project;
        this.tasks.splice(this.props.index, 1);
        const projectsObj = checkProjects(this.tasks, this.projects, currentTaskProject, this.filteredProjectName);

        this.projects = projectsObj.projects;
        this.filteredProjectName = projectsObj.filteredProjectName;

        this.removeTask({
            tasks: this.tasks,
            projects: this.projects,
            filteredProjectName: this.filteredProjectName
        });
    }

    /**
     *
     * @param {{}} task
     * @return {*}
     */
    renderDetailsBlock(task) {
        const showDetails = this.state.showDetails;

        if (showDetails) {
            this.detailsButtonText = 'Hide details';
            return (
                <p>{task.task}</p>
            );
        } else {
            this.detailsButtonText = 'Show details';
            return null;
        }
    }

    showDetails() {
        this.setState({
            showDetails: !this.state.showDetails
        });
    }

    editTask() {
        this.startEditTaskAction({
            task: this.task,
            index: this.props.index
        });
    }

    validateDeleteTaskButton() {
        if (this.isEditingMode)
            this.disableDeleteTaskButton();
        else
            this.enableDeleteTaskButton();
    }

    disableDeleteTaskButton() {
        this.refs.deleteTaskButton.setAttribute('disabled', 'disabled');
    }

    enableDeleteTaskButton() {
        this.refs.deleteTaskButton.removeAttribute('disabled');
    }
}
