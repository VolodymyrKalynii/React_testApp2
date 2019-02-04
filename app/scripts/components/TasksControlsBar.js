import * as React from 'react';
import PropTypes from 'prop-types';

import Constants from '../lib/Constants';

export default class TasksControlsBar extends React.Component{
    constructor(props) {
        super(props);

        this.showTaskFormAction = props.showTaskFormAction;
        this.filterPriorityAction = props.filterPriorityAction;
        this.filterForProjectsAction = props.filterForProjectsAction;

        this.state = {
            isFilterPriority: false
        };
    }

    componentWillReceiveProps(nextProps) {
        const {filteredProjectName} = nextProps;

        if (filteredProjectName === Constants.CHOSE_ALL_PROJECTS)
            this.refs.projectsSelect.value = filteredProjectName;
    }

    render() {
        this.projects = this.props.projects;

        return (
            <div className='taskControlBar'>
                <button onClick={this.showTaskForm}>New Task</button>
                <label><input type='checkbox' onChange={this.filterTasks}/> By priority</label>
                <select name="" id="" ref='projectsSelect' onChange={this.filterTasksForProjects}>
                    {this.projects.map((project, index) => {
                        let projectText = project;
                        if (project === Constants.CHOSE_ALL_PROJECTS)
                            projectText = 'ChoseAll';
                        return (<option key={index} value={project}>{projectText}</option>)
                    })}
                </select>
            </div>
        );
    }

    showTaskForm = () => {
        this.showTaskFormAction(null)
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
    filteredProjectName: PropTypes.string.isRequired,
    showTaskFormAction: PropTypes.func.isRequired,
    filterPriorityAction: PropTypes.func.isRequired,
    filterForProjectsAction: PropTypes.func.isRequired
};