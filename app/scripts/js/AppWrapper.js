import '@babel/polyfill';
import * as React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Router, BrowserRouter } from "react-router-dom";
import {Provider} from 'react-redux';

import App from "../components/App";

export default class AppWrapper {

    static render(store) {
        return ReactDOM.render(
            <Provider store={store}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </Provider>,
            document.getElementById('app')
        );
    }
}