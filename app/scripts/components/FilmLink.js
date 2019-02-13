import * as React from 'react';
import {NavLink} from 'react-router-dom';
import Constants from '../lib/Constants';

export default class FilmLink extends React.Component{
    constructor(props) {
        super(props);

        // console.log(props);

        // console.log(this.props.film);
    }

    render() {
        return (
            <div className='filmLink'>
                {/*{this.props.film.title}*/}
                {/*<NavLink to={`/movie/${this.props.film.id}`}>{this.props.film.title}</NavLink>*/}
                <NavLink className='filmLink__link' to={`/movie/${this.props.film.id}`}>
                    <div className='filmLink__topBlock'>
                        <span className='filmLink__title'>{this.props.film.title}</span>
                        <span>star</span>
                    </div>
                    <div className='filmLink__imgBlock'>
                        <img className='filmLink__img' src={Constants.IMG_ROOT+this.props.film.poster_path} alt=''/>
                    </div>
                </NavLink>
            </div>
        );
    }
}