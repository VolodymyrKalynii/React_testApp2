import Store from '../redux/store/store';
import AppWrapper from './AppWrapper';
import StarTate from '../redux/state/star.state';
import Constants from '../lib/Constants';

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
        for (let key in this.store.getState().movies) {
            if (key === Constants.STAR_MOVIES_ID)
                this.writeLocalStorageField(key);
        }
    }

    /**
     * @param {string} key
     * @private
     */
    writeLocalStorageField(key) {
        const previousValue = Mediator[key];
        Mediator[key] = this.store.getState().movies[key];

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

Mediator.starFilmsId = StarTate.initialState.starFilmsId;
