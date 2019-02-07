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
            // filteredTaskName,
            isShowClosedTasks,
            filteredProjectName,
            closedTasksProjects,
            addTaskAction,
            saveTaskAction,
            addProjectAction,
            showTaskFormAction,
            hideTaskFormAction,
            filterPriorityAction,
            filterForProjectsAction,
            filterForTaskNamesAction,
            toggleShowingTasksAction
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
                    // filteredTaskName={filteredTaskName}
                    isShowClosedTasks={isShowClosedTasks}
                    filteredProjectName={filteredProjectName}
                    closedTasksProjects={closedTasksProjects}
                    showTaskFormAction={showTaskFormAction}
                    filterPriorityAction={filterPriorityAction}
                    filterForProjectsAction={filterForProjectsAction}
                    filterForTaskNamesAction={filterForTaskNamesAction}
                    toggleShowingTasksAction={toggleShowingTasksAction}
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
        // filteredTaskName: store.filteredTaskName,
        isShowClosedTasks: store.isShowClosedTasks,
        closedTasksProjects: store.closedTasksProjects,
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
        filterForTaskNamesAction: taskName => dispatch(PageActions.filterForTaskNames(taskName)),
        filterPriorityAction: isFilterPriority => dispatch(PageActions.filterPriority(isFilterPriority)),
        toggleShowingTasksAction: isShowClosedTasks => dispatch(PageActions.toggleShowingTasks(isShowClosedTasks))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksControls)