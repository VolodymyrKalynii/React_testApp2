import * as React from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';

import Constants from '../lib/Constants';
import StarButton from '../containers/StarButton';

export default class MovieLink extends React.Component{
    render() {
        return (
            <div className='filmLink'>
                <NavLink className='filmLink__link' to={`/movie/${this.props.movie.id}`}>
                    <div className='filmLink__topBlock'>
                        <span className='filmLink__title'>{this.props.movie.title}</span>
                        {<StarButton movieId={this.props.movie.id}/>}
                    </div>
                    <div className='filmLink__imgBlock'>
                        <img className='filmLink__img' src={Constants.IMG_ROOT+this.props.movie.poster_path} alt=''/>
                    </div>
                    <p className="filmLink__genres">
                        {this.renderGenres()}
                    </p>
                </NavLink>
            </div>
        );
    }

    renderGenres = () => {
        const {genres} = this.props.movie;

        return genres
            ? this.getGenresStr(genres)
            : this.getGenresFromProps()
    };

    /**
     *
     * @param {Array<{}>} genres
     * @return {string | *}
     */
    getGenresStr = (genres) => {
        return genres
            .map((genreObj) => genreObj.name)
            .join(', ');
    };

    getGenresFromProps = () => {
        const genresArr = [];
        const {movie: {genre_ids}, genres} = this.props;

        genres.map((genreObj) => {
            genre_ids.map((genreId) => {
                if (genreObj.id === genreId)
                    genresArr.push(genreObj);
            })
        });

        return this.getGenresStr(genresArr);
    };
}

MovieLink.propTypes = {
    movie: PropTypes.object.isRequired,
    genres: PropTypes.array
};