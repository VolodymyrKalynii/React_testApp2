import * as React from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';

import Constants from '../lib/Constants';
import StarButton from '../containers/StarButton';
import URLPartGetter from '../lib/URLPartGetter';

export default class MovieLink extends React.Component{
    constructor(props) {
        super(props);

        this.urlPart = URLPartGetter.get();
    }

    render() {
        // console.log(this.props.movie.id);
        return (
            <div className='filmLink'>
                <NavLink className='filmLink__link' to={`${this.urlPart}/movie/${this.props.movie.id}`}>
                    <div className='filmLink__imgBlock'>
                        <img className='filmLink__img' src={Constants.IMG_ROOT+this.props.movie.poster_path} alt={this.props.movie.title}/>
                    </div>
                    <div className="filmLink__starButton">
                        <StarButton movieId={this.props.movie.id}/>
                    </div>
                    <div className="filmLink__content">
                        <div className='filmLink__topBlock'>
                            <span className='filmLink__title'>{this.props.movie.title}</span>
                        </div>
                        <p className="filmLink__genres">
                            {this.renderGenres()}
                        </p>
                    </div>
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