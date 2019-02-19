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
            homepage,
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
                        <img src={Constants.IMG_ROOT + poster_path} alt=""/>
                    </div>
                    <div className='movie__right'>
                        <p className='movie__text'>Tagline: {tagline}</p>
                        <p className='movie__text'>Budget: {budget}</p>
                        <p className='movie__text'>Genres: {this.renderGenres()}</p>
                        <p className='movie__text'>Homepage: <a href={homepage}>{homepage}</a></p>
                        <p className='movie__text'>Runtime: {runtime} minutes</p>
                        <p className='movie__text'>Release date: {release_date}</p>
                        <p className='movie__text'>Vote avarage: {vote_average}</p>
                        <p className='movie__text'>Vote count: {vote_count}</p>
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
}

Movie.propTypes = {
    movie: PropTypes.object.isRequired
};