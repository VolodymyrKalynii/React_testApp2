import * as React from 'react';
import TaskForm from '../components/TaskForm';
import TasksControlsBar from '../components/TasksControlsBar';
import {addProject, addTask, editTask, filterForProjects, filterPriority, showTaskForm} from '../actions/PageActions';
import connect from 'react-redux/es/connect/connect';

class TasksControls extends React.Component{
    constructor(props) {
        super(props);

        this.showTaskForm = props.showTaskForm;
        this.filterPriority = props.filterPriority;
        this.filterForProjects = props.filterForProjects;
        this.createRenderBlock = this.createRenderBlock.bind(this);

        this.addTaskAction = props.addTaskAction;
        this.addProjectAction = props.addProjectAction;
        this.editTaskAction = props.editTaskAction;
    }

    render() {
        return this.createRenderBlock();
    }

    createRenderBlock() {
        const filteredProjectName = this.props.filteredProjectName;
        const editedTaskIndex = this.props.editedTaskIndex;
        const isShowTaskForm = this.props.isShowTaskForm;
        const projects = this.props.projects;
        const tasks = this.props.tasks;

        if (isShowTaskForm) {
            return (
                <TaskForm
                    tasks={tasks}
                    projects={projects}
                    filteredProjectName={filteredProjectName}
                    addTaskAction={this.addTaskAction}
                    editTaskAction={this.editTaskAction}
                    addProjectAction={this.addProjectAction}
                    editedTaskIndex={editedTaskIndex}
                    isShowTaskForm={isShowTaskForm}
                    showTaskForm={this.showTaskForm}
                />
            )
        } else {
            return (
                <TasksControlsBar
                    tasks={tasks}
                    filteredProjectName={filteredProjectName}
                    isShowTaskForm={isShowTaskForm}
                    filterForProjects={this.filterForProjects}
                    filterPriority={this.filterPriority}
                    projects={projects}
                    showTaskForm={this.showTaskForm}
                />
            )
        }
    }
}

const mapStateToProps = store => {
    return {
        tasks: store.tasks,
        editedTaskIndex: store.editedTaskIndex,
        isShowTaskForm: store.isShowTaskForm,
        projects: store.projects,
        filteredProjectName: store.filteredProjectName
    }
};

const mapDispatchToProps = dispatch => {
    return {
        showTaskForm: showForm => dispatch(showTaskForm(showForm)),
        filterPriority: isFilterPriority => dispatch(filterPriority(isFilterPriority)),
        filterForProjects: project => dispatch(filterForProjects(project)),
        addTaskAction: task => dispatch(addTask(task)),
        editTaskAction: task => dispatch(editTask(task)),
        addProjectAction: project => dispatch(addProject(project))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksControls)