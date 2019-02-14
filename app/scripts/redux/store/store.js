import { createStore } from 'redux';
import {films} from '../reducers/films';

export default class Store {
    static createStore() {
        return createStore(films);
    }
}