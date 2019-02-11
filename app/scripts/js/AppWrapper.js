import '@babel/polyfill';
import * as React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Router, BrowserRouter } from "react-router-dom";
import App from "../components/App";

export default class AppWrapper {

    static render() {
        return ReactDOM.render(
            <BrowserRouter >
                <div>
                    <App/>
                </div>
            </BrowserRouter>,
            document.getElementById('app')
        );
    }
}