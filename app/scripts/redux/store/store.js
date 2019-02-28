import { createStore } from 'redux';
import {filmsReducers} from '../reducers/films.reducers';
import {rootReducer} from '../reducers';

export default class Store {
    static createStore() {
        return createStore(rootReducer);
    }
}