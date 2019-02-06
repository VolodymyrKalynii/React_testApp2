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
        this.currentTasks = this.props.tasks;
        this.projects = this.props.projects;
        this.closedTasks = this.props.closedTasks;
        this.editedTaskIndex = this.props.editedTaskIndex;
        this.isShowClosedTasks = this.props.isShowClosedTasks;
        this.filteredProjectName = this.props.filteredProjectName;
        this.closedTasksProjects = this.props.closedTasksProjects;

        if (this.isShowClosedTasks)
            this.currentTasks = this.closedTasks;

        const isTask = !!this.currentTasks.length;

        if (isTask) {
            if (this.filteredProjectName === Constants.CHOSE_ALL_PROJECTS)
                return this.currentTasks.map((task, index) =>
                    this.renderTask(index, task));
            else {
                return this.currentTasks.map((task, index) => {
                    if (task.project === this.filteredProjectName)
                        return this.renderTask(index, task)
                });
            }
        } else {
            return (
                <h4>
                    There are no tasks
                </h4>
            );
        }
    };

    renderTask(index, task) {
        return <Task
            key={index}
            task={task}
            index={index}
            tasks={this.currentTasks}
            projects={this.projects}
            closedTasks={this.closedTasks}
            editedTaskIndex={this.editedTaskIndex}
            isShowClosedTasks={this.isShowClosedTasks}
            filteredProjectName={this.filteredProjectName}
            closedTasksProjects={this.closedTasksProjects}
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