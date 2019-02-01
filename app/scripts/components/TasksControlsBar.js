import * as React from 'react';
import Constants from '../lib/Constants';

export default class TasksControlsBar extends React.Component{
    constructor(props) {
        super(props);

        this.showTaskForm = props.showTaskForm;
        this.isShowTaskForm = props.isShowTaskForm;
        this.filterPriority = props.filterPriority;
        this.filterForProjects = props.filterForProjects;

        this.state = {
            isFilterPriority: false
        };

        this.filterTasks = this.filterTasks.bind(this);
        this.filterTasksForProjects = this.filterTasksForProjects.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.filteredProjectName = nextProps.filteredProjectName;

        if (this.filteredProjectName === Constants.CHOSE_ALL_PROJECTS)
            this.refs.projectsSelect.value = this.filteredProjectName;
    }

    render() {
        this.projects = this.props.projects;
        this.tasks = this.props.tasks;
        this.filteredProjectName = this.props.filteredProjectName;

        return (
            <div className='taskControlBar'>
                <button onClick={this.showTaskForm.bind(null, !this.isShowTaskForm)}>New Task</button>
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

    filterTasksForProjects() {

        const projectsSelect = this.refs.projectsSelect;

        this.filterForProjects(projectsSelect.value);
    }

    filterTasks() {
        const isFilterPriority = !this.state.isFilterPriority;

        if (isFilterPriority)
            this.tasks.sort(TasksControlsBar.sortByPriority);
        else
            this.tasks.sort(TasksControlsBar.sortByTime);

        this.filterPriority(this.tasks);

        this.setState({
            isFilterPriority: isFilterPriority
        })
    }

    static sortByPriority(a, b) {
        if (a.priority > b.priority) return 1;
        if (a.priority < b.priority) return -1;
    }

    static sortByTime(a, b) {
        if (a.time > b.time) return 1;
        if (a.time < b.time) return -1;
    }
}