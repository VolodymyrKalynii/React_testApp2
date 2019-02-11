import * as React from 'react';
import {NavLink} from 'react-router-dom';

export default class Nav extends React.Component{
    render() {
        return (
            <div>
                <NavLink exact activeClassName='active' to='/'>Home</NavLink>
                <NavLink activeClassName='active' to='/bookmarks'>Bookmarks</NavLink>
            </div>
        );
    }


}