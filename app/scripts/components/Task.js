import * as React from 'react';
import PropTypes from 'prop-types';

import checkProjects from '../lib/checkProjects';

export default class Task extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showDetails: false
        };

        this.detailsButtonText = 'Show details';
        this.removeTaskAction = this.props.removeTaskAction;
        this.showTaskFormAction = this.props.showTaskFormAction;
    }

    componentWillReceiveProps(nextProps) {
        const {editedTaskIndex} = nextProps;
        this.isEditingMode = editedTaskIndex !== null;

        this.validateDeleteTaskButton();
    }

    render() {
        const {task} = this.props;

        return (
            <div className='taskList__task task'>
                <h4>{task.name}</h4>
                <div className="task__info">
                    <h5>Project: <span className="task__project">{task.project}</span></h5>
                    <h5>Priority: <span className="task__priority">{task.priority}</span></h5>
                </div>
                {this.renderDetailsBlock(task)}
                <div className="task__buttons">
                    <button className="task__button" onClick={this.showDetails}>{this.detailsButtonText}</button>
                    <button className="task__button" onClick={this.startEditTask}>Edit task</button>
                    <button className="task__button" onClick={this.startEditTask}>Close task</button>
                    <button className="task__button" ref='deleteTaskButton' onClick={this.deleteTask}>Delete task</button>
                </div>
            </div>
        )
    }

    deleteTask = () => {
        const {tasks, projects, filteredProjectName, index} = this.props;
        const currentTaskProject = tasks[index].project;

        tasks.splice(this.props.index, 1);

        const projectsObj = checkProjects(tasks, projects, currentTaskProject, filteredProjectName);

        this.removeTaskAction({
            tasks,
            projects: projectsObj.projects,
            filteredProjectName: projectsObj.filteredProjectName
        });
    };

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

    showDetails = () => {
        this.setState({
            showDetails: !this.state.showDetails
        });
    };

    startEditTask = () => {
        this.showTaskFormAction(this.props.index);
    };

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

Task.propTypes = {
    task: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    tasks: PropTypes.array.isRequired,
    projects: PropTypes.array.isRequired,
    editedTaskIndex: PropTypes.number,
    filteredProjectName: PropTypes.string.isRequired,
    removeTaskAction: PropTypes.func.isRequired,
    showTaskFormAction: PropTypes.func.isRequired
};