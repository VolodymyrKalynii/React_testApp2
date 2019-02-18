import * as React from 'react';
import { Route, Switch } from 'react-router';

import Nav from './Nav';
import Home from '../containers/Home';
import Bookmarks from '../containers/Bookmarks';
import NotFound from './NotFound';
import MovieWrapper from './MovieWrapper';

export default class App extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <Nav />
        <br />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/movie/:id" component={MovieWrapper} />
          <Route path="/bookmarks" component={Bookmarks} />
          {/* <Route path={} component={NotFound} /> */}
        </Switch>
      </div>
    );
  }
}
