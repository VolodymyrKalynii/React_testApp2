import * as React from 'react';
import {NavLink} from 'react-router-dom';

export default class Nav extends React.Component{
    render() {
        return (
            <div>
                <NavLink exact activeClassName='active' to='/'>Головна</NavLink>
                <NavLink activeClassName='active' to='/products'>Продукти</NavLink>
                <NavLink activeClassName='active' to='/about'>Про нас</NavLink>
                <NavLink activeClassName='active' to='/home'>Home</NavLink>
                <NavLink activeClassName='active' to='/old/123'>Old</NavLink>
                <NavLink activeClassName='active' to='/new/456'>New</NavLink>
            </div>
        );
    }


}