import '@babel/polyfill';
import * as React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Router, BrowserRouter } from "react-router-dom";
import App from "../components/App";

export default class AppWrapper {
    static render(films) {
        return ReactDOM.render(
            <HashRouter >
                <div>
                    <App films={films}/>
                </div>
            </HashRouter>,
            document.getElementById('app')
        );
    }
}