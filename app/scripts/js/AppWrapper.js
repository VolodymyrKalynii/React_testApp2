import '@babel/polyfill';
import * as React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from '../components/App';
import ReactFullpage from '@fullpage/react-fullpage';

export default class AppWrapper {

    static render(store) {
        return ReactDOM.render(
            <ReactFullpage
                navigation
                render={({ state, fullpageApi }) => {
                    return (
                        <ReactFullpage.Wrapper>
                            <div className="section">
                                <p>Hello</p>
                            </div>
                            <div className="section">
                                <p>Section 2</p>
                            </div>
                        </ReactFullpage.Wrapper>
                    );
                }}
            />,
            document.getElementById('app')
        );
    }
}