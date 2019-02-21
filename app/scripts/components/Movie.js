import * as React from 'react';
import PropTypes from 'prop-types';

import Constants from '../lib/Constants';
import RecommendedMovies from './RecommendedMovies';
import StarButton from '../containers/StarButton';

export default class Movie extends React.Component {
    render() {
        return (
            <div className='movie'>
                {this.renderContentBlock()}
                <div className='movie__starButton'>
                    <StarButton movieId={this.props.movie.id}/>
                </div>
                <p className='movie__subTitle'>Recommended Movies</p>
                <RecommendedMovies movieId={this.props.movie.id}/>
            </div>
        );
    }

    renderContentBlock = () => {
        const {
            title,
            poster_path,
            tagline,
            budget,
            runtime,
            release_date,
            vote_average,
            vote_count,
            overview
        } = this.props.movie;

        return (
            <div className='movie__content'>
                <p  className='movie__title'>{title}</p>
                <div className='movie__info'>
                    <div className='movie__left'>
                        <img className='movie__img' src={Constants.IMG_ROOT + poster_path} alt=""/>
                    </div>
                    <div className='movie__right'>
                        <p className='movie__text'>Tagline: <span>{tagline}</span></p>
                        <p className='movie__text'>Budget: <span>${this.getFormattedBudget()}</span></p>
                        <p className='movie__text'>Genres: <span>{this.renderGenres()}</span></p>
                        <p className='movie__text'>Runtime: <span>{runtime} minutes</span></p>
                        <p className='movie__text'>Release date: <span>{release_date}</span></p>
                        <p className='movie__text'>Vote avarage: <span>{vote_average}</span></p>
                        <p className='movie__text'>Vote count: <span>{vote_count}</span></p>
                        {this.renderHomepageLink()}
                    </div>
                </div>
                <p className='movie__text movie__overview'>{overview}</p>

            </div>
        )
    };

    renderGenres = () => {
        const {genres} = this.props.movie;

        return genres
            .map(genreObj => genreObj.name)
            .join(', ');
    };

    renderHomepageLink = () => {
        const {homepage} = this.props.movie;

        return homepage
            ? (<a className='movie__text' href={homepage}><span>Homepage</span></a>)
            : null
    };

    getFormattedBudget = () => {
        const {budget} = this.props.movie;

        return new Intl.NumberFormat().format(budget)
    };
}

Movie.propTypes = {
    movie: PropTypes.object.isRequired
};