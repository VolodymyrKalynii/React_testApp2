import * as React from 'react';
import {NavLink} from 'react-router-dom';
import Constants from '../lib/Constants';

export default class Nav extends React.Component{
    render() {
        return (
            <div className='nav'>
                <div className='container'>
                    <NavLink className='nav__link' exact activeClassName='nav__link-active' to={`${Constants.UPL_PART}/`}>Home</NavLink>
                    <NavLink className='nav__link' activeClassName='nav__link-active' to={`${Constants.UPL_PART}/bookmarks`}>Bookmarks</NavLink>
                </div>
            </div>
        );
    }
}
