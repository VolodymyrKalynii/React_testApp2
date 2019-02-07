import * as React from 'react';
import connect from 'react-redux/es/connect/connect';
import Task from '../components/Task';
import Constants from '../lib/Constants';
import PageActions  from '../redux/actions/PageActions';

class TaskLIst extends React.Component {
    constructor(props) {
        super(props);
        this.closeTaskAction = this.props.closeTaskAction;
        this.removeTaskAction = this.props.removeTaskAction;
        this.showTaskFormAction = this.props.showTaskFormAction;
        this.removeClosedTaskAction = this.props.removeClosedTaskAction;
        this.addClosedTaskProjectAction = this.props.addClosedTaskProjectAction;
    }

    render() {
        return (
            <div className='taskList'>
                {this.renderTaskBlock()}
            </div>
        )
    }

    renderTaskBlock = () => {
        this.tasks = this.props.tasks;
        this.closedTasks = this.props.closedTasks;
        this.filteredTaskName = this.props.filteredTaskName;
        this.isShowClosedTasks = this.props.isShowClosedTasks;
        this.filteredProjectName = this.props.filteredProjectName;

        if (this.isShowClosedTasks)
            this.tasks = this.closedTasks;

        const isTask = !!this.tasks.length;

        return isTask
            ? this.mappingTasks()
            : <h4>There are no tasks</h4>
    };

    mappingTasks = () => {
        return this.tasks.map((task, index) =>
            this.filterTasksForProjects(task, index)
        );
    };

    /**
     * @param {{}} task
     * @param {number} index
     * @return {string}
     */
    filterTasksForProjects = (task, index) => {
        const filterForAllProjects = this.filteredProjectName === Constants.CHOSE_ALL_PROJECTS;
        const filterForCurrentProject = task.project === this.filteredProjectName;

        return (filterForAllProjects || filterForCurrentProject)
            ? this.filterTaskForNames(task, index)
            : '';
    };

    /**
     * @param {{}} task
     * @param {number} index
     * @return {string}
     */
    filterTaskForNames = (task, index) => {
        const isTaskNameSearched = task.name.toLowerCase().search(this.filteredTaskName) !== -1;
        const ifFilteredTaskName = this.filteredTaskName === Constants.CHOSE_ALL_TASKS;

        return (ifFilteredTaskName || isTaskNameSearched)
            ? this.renderTask(task, index)
            : '';
    };

    /**
     * @param {{}} task
     * @param {number} index
     * @return {string}
     */
    renderTask(task, index) {
        const {projects, editedTaskIndex, closedTasksProjects} = this.props;
        return <Task
            key={index}
            task={task}
            index={index}
            tasks={this.tasks}
            projects={projects}
            closedTasks={this.closedTasks}
            editedTaskIndex={editedTaskIndex}
            closedTasksProjects={closedTasksProjects}
            isShowClosedTasks={this.isShowClosedTasks}
            filteredProjectName={this.filteredProjectName}
            closeTaskAction={this.closeTaskAction}
            removeTaskAction={this.removeTaskAction}
            showTaskFormAction={this.showTaskFormAction}
            removeClosedTaskAction={this.removeClosedTaskAction}
            addClosedTaskProjectAction={this.addClosedTaskProjectAction}
        />
    }
}

const mapStateToProps = store => {
    return {
        tasks: store.tasks,
        projects: store.projects,
        closedTasks: store.closedTasks,
        editedTaskIndex: store.editedTaskIndex,
        filteredTaskName: store.filteredTaskName,
        isShowClosedTasks: store.isShowClosedTasks,
        filteredProjectName: store.filteredProjectName,
        closedTasksProjects: store.closedTasksProjects,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        removeTaskAction: taskObj => dispatch(PageActions.removeTask(taskObj)),
        removeClosedTaskAction: taskObj => dispatch(PageActions.removeClosedTask(taskObj)),
        closeTaskAction: taskObj => dispatch(PageActions.closeTask(taskObj)),
        showTaskFormAction: task => dispatch(PageActions.showTaskForm(task)),
        addClosedTaskProjectAction: projects => dispatch(PageActions.addClosedTaskProject(projects)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskLIst)