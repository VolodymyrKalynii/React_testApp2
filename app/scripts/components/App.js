import * as React from 'react';
import {Route, Switch} from 'react-router';

import Nav from './Nav';
import Home from '../containers/Home';
import Bookmarks from '../containers/Bookmarks';
import NotFound from './NotFound';
import MovieWrapper from '../containers/MovieWrapper';
import URLPartGetter from '../lib/URLPartGetter';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.urlPart = URLPartGetter.get();
    }

    render() {
        return (
            <div className='wrapper'>
                <Nav/>
                <div className='container'>
                    <Switch>
                        <Route exact path={`${this.urlPart}/`} component={Home}/>
                        <Route path={`${this.urlPart}/movie/:id`} component={MovieWrapper}/>
                        <Route path={`${this.urlPart}/bookmarks`} component={Bookmarks}/>
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </div>
        );
    }
}
