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
            if (key === 'starFilmsId')
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

Mediator.starFilmsId = InitialState.initialState.starFilmsId;
