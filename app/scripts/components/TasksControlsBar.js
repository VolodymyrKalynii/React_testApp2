import * as React from 'react';
import PropTypes from 'prop-types';

import Consts from '../lib/Constants';

export default class TasksControlsBar extends React.Component{
    constructor(props) {
        super(props);

        this.showTaskFormAction = props.showTaskFormAction;
        this.filterPriorityAction = props.filterPriorityAction;
        this.filterForProjectsAction = props.filterForProjectsAction;
        this.toggleShowingTasksAction = props.toggleShowingTasksAction;

        this.state = {
            isFilterPriority: false,
            isShowClosedTasks: props.isShowClosedTasks
        };
    }

    componentWillReceiveProps(nextProps) {
        const {filteredProjectName} = nextProps;

        if (filteredProjectName === Consts.CHOSE_ALL_PROJECTS)
            this.refs.projectsSelect.value = filteredProjectName;
    }

    render() {
        return (
            <div className='taskControlBar'>
                <button onClick={this.showTaskForm}>New Task</button>
                <label><input type='checkbox' onChange={this.filterTasks}/> By priority</label>
                <label><input type='radio' value="false" checked={!this.state.isShowClosedTasks} onChange={this.changeVisibleTask} name='taskList'/> active</label>
                <label><input type='radio' value="true" checked={!!this.state.isShowClosedTasks}  onChange={this.changeVisibleTask}  name='taskList'/> closed</label>
                {this.renderSelectBlock()}
            </div>
        );
    }

    renderSelectBlock = () => {
        const {projects, closedTasksProjects} = this.props;
        let currentProjects = projects;

        if (this.state.isShowClosedTasks)
            currentProjects = closedTasksProjects;

        return (
            <select name="" id="" ref='projectsSelect' onChange={this.filterTasksForProjects}>
                {currentProjects.map((project, index) => {
                    let projectText = project;
                    if (project === Consts.CHOSE_ALL_PROJECTS)
                        projectText = 'ChoseAll';
                    return (<option key={index} value={project}>{projectText}</option>)
                })}
            </select>
        )
    };

    showTaskForm = () => {
        const {tasks} = this.props;
        this.showTaskFormAction(null);

        tasks.sort(TasksControlsBar.sortByTime);

        this.filterPriorityAction(tasks);
    };

    filterTasksForProjects = () => {
        const {projectsSelect} = this.refs;

        this.filterForProjectsAction(projectsSelect.value);

    };

    filterTasks = () => {
        const {tasks} = this.props;
        const isFilterPriority = !this.state.isFilterPriority;

        if (isFilterPriority)
            tasks.sort(TasksControlsBar.sortByPriority);
        else
            tasks.sort(TasksControlsBar.sortByTime);

        this.filterPriorityAction(tasks);

        this.setState({
            isFilterPriority
        })
    };

    changeVisibleTask = (changeEvent) => {
        this.setState({
            isShowClosedTasks: JSON.parse(changeEvent.target.value)
        });

        this.toggleShowingTasksAction(JSON.parse(changeEvent.target.value));
        this.filterForProjectsAction(Consts.CHOSE_ALL_PROJECTS);
    };

    static sortByPriority(a, b) {
        if (a.priority > b.priority) return 1;
        if (a.priority < b.priority) return -1;
    }

    static sortByTime(a, b) {
        if (a.time > b.time) return 1;
        if (a.time < b.time) return -1;
    }
}

TasksControlsBar.propTypes = {
    tasks: PropTypes.array.isRequired,
    projects: PropTypes.array.isRequired,
    isShowClosedTasks: PropTypes.bool.isRequired,
    filteredProjectName: PropTypes.string.isRequired,
    closedTasksProjects: PropTypes.array.isRequired,
    showTaskFormAction: PropTypes.func.isRequired,
    filterPriorityAction: PropTypes.func.isRequired,
    filterForProjectsAction: PropTypes.func.isRequired,
    toggleShowingTasksAction: PropTypes.func.isRequired
};