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
      <div className='wrapper'>
          <Nav />
          <div className='container'>
              <Switch>
                  <Route exact path="/React_testApp2/dist/" component={Home} />
                  <Route path="/React_testApp2/movie/:id" component={MovieWrapper} />
                  <Route path="/React_testApp2/bookmarks" component={Bookmarks} />
                  {/* <Route path={} component={NotFound} /> */}
              </Switch>
          </div>

      </div>
    );
  }
}
