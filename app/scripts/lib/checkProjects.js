import Constants from './Constants';

/**
 *
 * @param {Array<{}>} tasks
 * @param {Array<string>} projects
 * @param {string} currentTaskProject
 * @param {string} filteredProjectName
 * @return {{projects: *, filteredProjectName: *}}
 */
export default function checkProjects(tasks, projects, currentTaskProject, filteredProjectName) {
    let hasProjects = false;

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].project === currentTaskProject) {
            hasProjects = true;
            break;
        }
    }

    if (!hasProjects) {
        for (let i = 0; i < projects.length; i++) {
            if (projects[i] === currentTaskProject) {
                if (currentTaskProject === filteredProjectName)
                    filteredProjectName = Constants.CHOSE_ALL_PROJECTS;

                projects.splice(i, 1);
                break
            }
        }
    }

    return {
        projects,
        filteredProjectName
    }
}