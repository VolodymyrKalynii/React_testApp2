import * as React from 'react';
import PropTypes from 'prop-types';

import MovieLink from './MovieLink';

export default class MoviesList extends React.Component {
    render() {
        return (
            <div className="filmsList">
                {this.props.movies.map((movie, index) =>
                    <MovieLink key={index} movie={movie} genres={this.props.genres}/>)}
            </div>
        );
    }
}

MovieLink.propTypes = {
    movies: PropTypes.array,
    genres: PropTypes.array
};
