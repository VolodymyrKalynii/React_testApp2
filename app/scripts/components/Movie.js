import * as React from 'react';
import PropTypes from 'prop-types';

import Constants from '../lib/Constants';
import RecommendedMovies from './RecommendedMovies';
import StarButton from '../containers/StarButton';

export default class Movie extends React.Component {
    render() {
        return (
            <div>
                <h3>{this.props.movie.title}</h3>
                <h4>{this.props.movie.tagline}</h4>
                <h4>{this.props.movie.budget}</h4>
                <h4>{this.renderGenres()}</h4>
                <h4>{this.props.movie.homepage}</h4>
                <h4>{this.props.movie.runtime} minutes</h4>
                <h4>{this.props.movie.release_date}</h4>
                <h4>{this.props.movie.vote_average}</h4>
                <h4>{this.props.movie.vote_count}</h4>
                <p>{this.props.movie.overview}</p>
                <img src={Constants.IMG_ROOT + this.props.movie.poster_path} alt=""/>

                <StarButton movieId={this.props.movie.id}/>
                <RecommendedMovies movieId={this.props.movie.id}/>
            </div>
        );
    }

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