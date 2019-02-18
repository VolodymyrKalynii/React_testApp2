import * as React from 'react';
import {NavLink} from 'react-router-dom';

export default class Nav extends React.Component{
    render() {
        return (
            <div className='nav'>
                <NavLink className='nav__link' exact activeClassName='nav__link-active' to='/'>Home</NavLink>
                <NavLink className='nav__link' activeClassName='nav__link-active' to='/bookmarks'>Bookmarks</NavLink>
            </div>
        );
    }
}
