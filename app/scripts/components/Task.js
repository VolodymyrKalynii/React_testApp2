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
        this.closeTaskAction = this.props.closeTaskAction;
        this.removeTaskAction = this.props.removeTaskAction;
        this.showTaskFormAction = this.props.showTaskFormAction;
        this.removeClosedTaskAction = this.props.removeClosedTaskAction;
        this.addClosedTaskProjectAction = this.props.addClosedTaskProjectAction;
    }

    componentWillReceiveProps(nextProps) {
        const {editedTaskIndex} = nextProps;
        this.isEditingMode = editedTaskIndex !== null;

        if (this.refs.closeTaskButton)
            this.validateCloseTaskButton();
        this.validateDeleteTaskButton();

        this.setState({
            showDetails: false
        })
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
                {this.renderButtonsBlock()}
            </div>
        )
    }

    /**
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

    renderButtonsBlock = () => {
        const {isShowClosedTasks} = this.props;

        if (!isShowClosedTasks) {
            return (
                <div className="task__buttons">
                    <button className="task__button" onClick={this.showDetails}>{this.detailsButtonText}</button>
                    <button className="task__button" onClick={this.startEditTask}>Edit task</button>
                    <button className="task__button" ref='closeTaskButton' onClick={this.closeTask}>Close task</button>
                    <button className="task__button" ref='deleteTaskButton' onClick={this.deleteTask}>Delete task</button>
                </div>
            )
        } else {
            return (
                <div className="task__buttons">
                    <button className="task__button" onClick={this.showDetails}>{this.detailsButtonText}</button>
                    <button className="task__button" ref='deleteTaskButton' onClick={this.deleteTask}>Delete task</button>
                </div>
            )
        }
    };

    deleteTask = () => {
        const {
            tasks,
            projects,
            filteredProjectName,
            index,
            isShowClosedTasks,
            closedTasksProjects
        } = this.props;
        const currentTaskProject = tasks[index].project;

        tasks.splice(index, 1);

        if (isShowClosedTasks) {
            const projectsObj = checkProjects(tasks, closedTasksProjects, currentTaskProject, filteredProjectName);
            this.removeClosedTaskAction({
                closedTasks: tasks,
                closedTasksProjects: projectsObj.projects,
                filteredProjectName: projectsObj.filteredProjectName
            });
        } else {
            const projectsObj = checkProjects(tasks, projects, currentTaskProject, filteredProjectName);
            this.removeTaskAction({
                tasks,
                projects: projectsObj.projects,
                filteredProjectName: projectsObj.filteredProjectName
            });
        }
    };

    closeTask = () => {
        const {
            tasks,
            index,
            projects,
            closedTasks,
            filteredProjectName,
        } = this.props;
        const currentTask = tasks[index];
        const currentTaskProject = currentTask.project;

        closedTasks.push(currentTask);
        this.addClosedTaskProject(currentTask);

        tasks.splice(index, 1);

        const projectsObj = checkProjects(tasks, projects, currentTaskProject, filteredProjectName);

        this.closeTaskAction({
            tasks,
            closedTasks,
            projects: projectsObj.projects,
            filteredProjectName: projectsObj.filteredProjectName
        });
    };

    addClosedTaskProject = (task) => {
        const {closedTasksProjects, filteredProjectName} = this.props;

        if (!~closedTasksProjects.indexOf(task.project)) {
            closedTasksProjects.push(task.project.toLowerCase());
            this.addClosedTaskProjectAction({
                closedTasksProjects,
                filteredProjectName
            });
        }
    };

    showDetails = () => {
        this.setState({
            showDetails: !this.state.showDetails
        });
    };

    startEditTask = () => {
        this.showTaskFormAction(this.props.index);

        this.validateDeleteTaskButton();
        this.validateCloseTaskButton();
    };

    validateDeleteTaskButton() {
        if (this.isEditingMode)
            this.disableDeleteTaskButton();
        else
            this.enableDeleteTaskButton();
    }

    validateCloseTaskButton() {
        if (this.isEditingMode)
            this.disableCloseTaskButton();
        else
            this.enableCloseTaskButton();
    }

    disableDeleteTaskButton() {
        this.refs.deleteTaskButton.setAttribute('disabled', 'disabled');
    }

    enableDeleteTaskButton() {
        this.refs.deleteTaskButton.removeAttribute('disabled');
    }

    disableCloseTaskButton() {
        this.refs.closeTaskButton.setAttribute('disabled', 'disabled');
    }

    enableCloseTaskButton() {
        this.refs.closeTaskButton.removeAttribute('disabled');
    }
}

Task.propTypes = {
    task: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    tasks: PropTypes.array.isRequired,
    projects: PropTypes.array.isRequired,
    closedTasks: PropTypes.array.isRequired,
    editedTaskIndex: PropTypes.number,
    isShowClosedTasks: PropTypes.bool.isRequired,
    filteredProjectName: PropTypes.string.isRequired,
    closedTasksProjects: PropTypes.array.isRequired,
    closeTaskAction: PropTypes.func.isRequired,
    removeTaskAction: PropTypes.func.isRequired,
    showTaskFormAction: PropTypes.func.isRequired,
    removeClosedTaskAction: PropTypes.func.isRequired,
    addClosedTaskProjectAction: PropTypes.func.isRequired,
};