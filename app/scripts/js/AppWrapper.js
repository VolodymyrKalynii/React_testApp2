import '@babel/polyfill';
import * as React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from '../components/App';

export default class AppWrapper {

    static render(store) {
        return ReactDOM.render(
            <Provider store={store}>
                <App/>
            </Provider>,
            document.getElementById('app')
        );
    }
}