import * as React from 'react';
import connect from 'react-redux/es/connect/connect';
import Task from '../components/Task';
import {removeTask, startEditTask} from '../actions/PageActions';
import Constants from '../lib/Constants';

class TaskLIst extends React.Component {
    constructor(props) {
        super(props);
        this.removeTask = this.props.removeTask;
        this.startEditTaskAction = this.props.startEditTaskAction;

        this.renderTaskBlock = this.renderTaskBlock.bind(this);
    }

    render() {
        return (
            <div className='taskList'>
                {this.renderTaskBlock()}
            </div>
        )
    }

    renderTaskBlock() {
        this.tasks = this.props.tasks;
        this.projects = this.props.projects;
        this.editedTaskIndex = this.props.editedTaskIndex;
        this.filteredProjectName = this.props.filteredProjectName;
        const isTask = !!this.tasks.length;

        if (isTask) {
            if (this.filteredProjectName === Constants.CHOSE_ALL_PROJECTS)
                return this.tasks.map((item, index) =>
                    this.renderTask(index, item));
            else {
                return this.tasks.map((item, index) => {
                    if (item.project === this.filteredProjectName)
                        return this.renderTask(index, item)
                });
            }
        } else {
            return (
                <h4>
                    There are no tasks
                </h4>
            );
        }
    }

    renderTask(index, item) {
        return <Task
            key={index}
            index={index}
            item={item}
            tasks={this.tasks}
            projects={this.projects}
            editedTaskIndex={this.editedTaskIndex}
            filteredProjectName={this.filteredProjectName}
            removeTask={this.removeTask}
            startEditTaskAction={this.startEditTaskAction}
        />
    }
}

const mapStateToProps = store => {
    return {
        tasks: store.tasks,
        projects: store.projects,
        filteredProjectName: store.filteredProjectName,
        editedTaskIndex: store.editedTaskIndex
    }
};

const mapDispatchToProps = dispatch => {
    return {
        removeTask: task => dispatch(removeTask(task)),
        startEditTaskAction: task => dispatch(startEditTask(task))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskLIst)