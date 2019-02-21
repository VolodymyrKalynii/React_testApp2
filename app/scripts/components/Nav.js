import * as React from 'react';
import {NavLink} from 'react-router-dom';
import URLPartGetter from '../lib/URLPartGetter';

export default class Nav extends React.Component{
    constructor(props) {
        super(props);

        this.urlPart = URLPartGetter.get();
    }

    render() {
        return (
            <div className='nav'>
                <div className='container'>
                    <NavLink className='nav__link' exact activeClassName='nav__link-active' to={`${this.urlPart}/`}>Home</NavLink>
                    <NavLink className='nav__link' activeClassName='nav__link-active' to={`${this.urlPart}/bookmarks`}>Bookmarks</NavLink>
                </div>
            </div>
        );
    }
}
