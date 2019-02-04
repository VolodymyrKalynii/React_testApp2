import * as React from 'react';
import connect from 'react-redux/es/connect/connect';

import TaskForm from '../components/TaskForm';
import TasksControlsBar from '../components/TasksControlsBar';
import PageActions from '../redux/actions/PageActions';

class TasksControls extends React.Component{
    render() {
        return this.createRenderBlock();
    }

    createRenderBlock = () => {
        const {
            tasks,
            projects,
            isShowTaskForm,
            editedTaskIndex,
            filteredProjectName,
            addTaskAction,
            saveTaskAction,
            addProjectAction,
            showTaskFormAction,
            hideTaskFormAction,
            filterPriorityAction,
            filterForProjectsAction
         } = this.props;

        if (isShowTaskForm) {
            return (
                <TaskForm
                    tasks={tasks}
                    projects={projects}
                    editedTaskIndex={editedTaskIndex}
                    filteredProjectName={filteredProjectName}
                    addTaskAction={addTaskAction}
                    saveTaskAction={saveTaskAction}
                    addProjectAction={addProjectAction}
                    hideTaskFormAction={hideTaskFormAction}
                />
            )
        } else {
            return (
                <TasksControlsBar
                    tasks={tasks}
                    projects={projects}
                    filteredProjectName={filteredProjectName}
                    showTaskFormAction={showTaskFormAction}
                    filterPriorityAction={filterPriorityAction}
                    filterForProjectsAction={filterForProjectsAction}
                />
            )
        }
    }
}

const mapStateToProps = store => {
    return {
        tasks: store.tasks,
        projects: store.projects,
        isShowTaskForm: store.isShowTaskForm,
        editedTaskIndex: store.editedTaskIndex,
        filteredProjectName: store.filteredProjectName
    }
};

const mapDispatchToProps = dispatch => {
    return {
        addTaskAction: task => dispatch(PageActions.addTask(task)),
        saveTaskAction: task => dispatch(PageActions.saveTask(task)),
        addProjectAction: project => dispatch(PageActions.addProject(project)),
        showTaskFormAction: task => dispatch(PageActions.showTaskForm(task)),
        hideTaskFormAction: () => dispatch(PageActions.hideTaskForm()),
        filterForProjectsAction: project => dispatch(PageActions.filterForProjects(project)),
        filterPriorityAction: isFilterPriority => dispatch(PageActions.filterPriority(isFilterPriority))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksControls)