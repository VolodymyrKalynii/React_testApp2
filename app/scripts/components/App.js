import * as React from 'react';
import {Route, Switch } from "react-router";

import Nav from "./Nav";
import Home from "./Home";
import Bookmarks from "./Bookmarks";
import NotFound from "./NotFound";

export default class App extends React.Component{
    render() {
        return (
            <div className='taskWrapper'>
                <Nav/>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/bookmarks" component={Bookmarks} />
                    {/*<Route path={} component={NotFound} />*/}
                </Switch>
            </div>
        );
    }
}
