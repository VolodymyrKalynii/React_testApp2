import Consts from '../../lib/Constants';
import {MovieGetter} from '../../lib/data-getter';

const saveMovie = movieInfo => ({
    type: Consts.LOAD_MOVIE,
    payload: {
        movieInfo,
        isMovieLoaded: true
    }
});

const loadMovie = (movieId) => dispatch =>
    MovieGetter.get(movieId, saveMovie, dispatch);

export default {
    loadMovie
}