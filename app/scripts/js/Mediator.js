import Store from '../store/store';
import AppWrapper from './AppWrapper';
import InitialState from '../state/InitialState';

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
            if (key === 'tasks') {
                const previousValue = Mediator.currentTasksValue;
                Mediator.currentTasksValue = this.store.getState()[key];

                if (previousValue !== Mediator.currentTasksValue)
                    localStorage.setItem(key, JSON.stringify(Mediator.currentTasksValue))
            }
            if (key === 'projects') {
                const previousValue = Mediator.currentProjectsValue;
                Mediator.currentProjectsValue = this.store.getState()[key];

                if (previousValue !== Mediator.currentProjectsValue)
                    localStorage.setItem(key, JSON.stringify(Mediator.currentProjectsValue));
            }
        }
    }

    /**
     * @private
     */
    static getStore() {
        return Store.createStore();
    }
}

Mediator.currentTasksValue = InitialState.initialState.tasks;
Mediator.currentProjectsValue = InitialState.initialState.projects;
