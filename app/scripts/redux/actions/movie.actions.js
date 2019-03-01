import Consts from '../../lib/Constants';
import {MovieLoader} from '../../lib/data-loader';

const saveMovie = movieInfo => ({
    type: Consts.LOAD_MOVIE,
    payload: {
        movieInfo,
        isMovieLoaded: true
    }
});

const loadMovie = (movieId) => dispatch => (
    MovieLoader.load(movieId)
        .then(response => dispatch(saveMovie(response)))
);

export default {
    loadMovie
}