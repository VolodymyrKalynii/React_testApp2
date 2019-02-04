import * as React from 'react';
import connect from 'react-redux/es/connect/connect';
import Task from '../components/Task';
import Constants from '../lib/Constants';
import PageActions  from '../redux/actions/PageActions';

class TaskLIst extends React.Component {
    constructor(props) {
        super(props);
        this.removeTaskAction = this.props.removeTaskAction;
        this.showTaskFormAction = this.props.showTaskFormAction;
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
        this.projects = this.props.projects;
        this.editedTaskIndex = this.props.editedTaskIndex;
        this.filteredProjectName = this.props.filteredProjectName;
        const isTask = !!this.tasks.length;

        if (isTask) {
            if (this.filteredProjectName === Constants.CHOSE_ALL_PROJECTS)
                return this.tasks.map((task, index) =>
                    this.renderTask(index, task));
            else {
                return this.tasks.map((task, index) => {
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
            tasks={this.tasks}
            projects={this.projects}
            editedTaskIndex={this.editedTaskIndex}
            filteredProjectName={this.filteredProjectName}
            removeTaskAction={this.removeTaskAction}
            showTaskFormAction={this.showTaskFormAction}
        />
    }
}

const mapStateToProps = store => {
    return {
        tasks: store.tasks,
        projects: store.projects,
        editedTaskIndex: store.editedTaskIndex,
        filteredProjectName: store.filteredProjectName
    }
};

const mapDispatchToProps = dispatch => {
    return {
        removeTaskAction: task => dispatch(PageActions.removeTask(task)),
        showTaskFormAction: task => dispatch(PageActions.showTaskForm(task))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskLIst)