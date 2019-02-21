import * as React from 'react';
import {NavLink} from 'react-router-dom';

export default class Nav extends React.Component{
    render() {
        return (
            <div className='nav'>
                <div className='container'>
                    <NavLink className='nav__link' exact activeClassName='nav__link-active' to='/React_testApp2/'>Home</NavLink>
                    <NavLink className='nav__link' activeClassName='nav__link-active' to='/React_testApp2/bookmarks'>Bookmarks</NavLink>
                </div>
            </div>
        );
    }
}
