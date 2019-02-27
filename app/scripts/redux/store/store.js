import { createStore } from 'redux';
import {filmsReducers} from '../reducers/films.reducers';

export default class Store {
    static createStore() {
        return createStore(filmsReducers);
    }
}