import { createStore } from 'redux';
import {taskReducer} from '../reducers/taskReducer';

export default class Store {
    static createStore() {
        return createStore(taskReducer);
    }
}