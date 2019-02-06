import Store from '../redux/store/store';
import AppWrapper from './AppWrapper';
import InitialState from '../redux/state/InitialState';

export default class Mediator {

    init() {
        this.initStore();

        this.renderBaseComponent();
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * @private
     */
    initStore() {
        /**
         * @private
         */
        this.store = Mediator.getStore();
        this.store.subscribe(this.handleChange.bind(this));
    }

    /**
     * @private
     */
    renderBaseComponent() {
        AppWrapper.render(this.store);
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

Mediator.tasks = InitialState.initialState.tasks;
Mediator.closedTasks = InitialState.initialState.closedTasks;
Mediator.closedTasksProjects = InitialState.initialState.closedTasksProjects;
Mediator.projects = InitialState.initialState.projects;
