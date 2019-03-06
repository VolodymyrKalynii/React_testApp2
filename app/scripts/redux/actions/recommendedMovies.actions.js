import Consts from '../../lib/Constants';
import {RecommendedMoviesIdsGetter, MoviesGetter} from '../../lib/data-getter';

/**
 * @param {{}} opts
 * @return {function(*=): *}
 */
const loadRecommendedMovies = (opts) => dispatch =>
    RecommendedMoviesIdsGetter.get(opts, loadMovies, saveMovies12, dispatch);

/**
 * @param {Array<number>} moviesId
 * @return {function(*=): *}
 */
const loadMovies = (moviesId) => dispatch =>
    MoviesGetter.get(moviesId, saveMovies, dispatch);

/**
 * @param {Array<{}>} movies
 * @return {{type: string, payload: *}}
 */
const saveMovies = movies => ({
    type: Consts.LOAD_RECOMMENDED_MOVIES_ID,
    payload: {
        movies,
        isRecommendedMoviesLoaded: true
    }
});

/**
 * @return {{type: string, payload: *}}
 */
const saveMovies12 = () => ({
    type: Consts.EMPTY_RECOMMENDED_LIST,
    payload: {
        isNoRecommendedMovies: true
    }
});

/**
 * @return {{type: string, payload: *}}
 */
const saveMovies122 = () => ({
    type: Consts.NOT_EMPTY_RECOMMENDED_LIST,
    payload: {
        isNoRecommendedMovies: false
    }
});

/**
 * @return {{type: string, payload: *}}
 */
const finishLoadMovies = () => ({
    type: Consts.START_LOAD_RECOMMENDED_MOVIES,
    payload: {
        isRecommendedMoviesLoaded: false
    }
});

export default {
    loadRecommendedMovies,
    finishLoadMovies,
    saveMovies122
};
