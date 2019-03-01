import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import {rootReducer} from '../reducers';

export default class Store {
    static createStore() {
        return createStore(rootReducer, applyMiddleware(thunkMiddleware));
    }
}