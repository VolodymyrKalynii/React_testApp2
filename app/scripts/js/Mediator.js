import Store from '../redux/store/store';
import AppWrapper from './AppWrapper';
import InitialState from '../redux/state/InitialState';
import {JsonImporter} from '../lib/JsonImporter';

export default class Mediator {

    async init() {
        this.initStore();

        await this.getFilmsList();

        // console.log(this.filmsList);

        this.renderBaseComponent(this.filmsList);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async getFilmsList() {

        this.filmsList = await JsonImporter.import('https://api.themoviedb.org/3/movie/popular?api_key=39ec9362a6a55025a6cfacdcf4057fc7&language=en-US&page=1');


        // console.log(this.filmsList);
    }

    /**
     * @private
     */
    initStore() {
        /**
         * @private
         */
        this.store = Mediator.getStore();
        // this.store.subscribe(this.handleChange.bind(this));
    }

    /**
     * @private
     */
    renderBaseComponent() {
        // AppWrapper.render();
        AppWrapper.render(this.filmsList);
    }

    /**
     * @private
     */
    handleChange() {
        for (let key in this.store.getState()) {
            if (key === 'tasks')
                this.writeLocalStorageField(key);
            if (key === 'projects')
                this.writeLocalStorageField(key);
            if (key === 'closedTasks')
                this.writeLocalStorageField(key);
            if (key === 'closedTasksProjects')
                this.writeLocalStorageField(key);
        }
    }

    /**
     * @param key
     */
    writeLocalStorageField(key) {
        const previousValue = Mediator[key];
        Mediator[key] = this.store.getState()[key];

        if (previousValue !== Mediator[key])
            localStorage.setItem(key, JSON.stringify(Mediator[key]));
    }

    /**
     * @private
     */
    static getStore() {
        return Store.createStore();
    }
}

// Mediator.tasks = InitialState.initialState.tasks;
// Mediator.closedTasks = InitialState.initialState.closedTasks;
// Mediator.closedTasksProjects = InitialState.initialState.closedTasksProjects;
// Mediator.projects = InitialState.initialState.projects;
