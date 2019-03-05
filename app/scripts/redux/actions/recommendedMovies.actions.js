import Consts from '../../lib/Constants';
import RecommendedMoviesIdsGetter from '../../js/RecommendedMoviesIdsGetter';

/**
 * @param {Array<{}>} movies
 * @return {{type: string, payload: *}}
 */
const saveMovies = movies => {
    return {
        type: Consts.LOAD_RECOMMENDED_MOVIES_ID,
        payload: {
            movies,
            isRecommendedMoviesLoaded: true
        }
    }
};

/**
 * @return {{type: string, payload: *}}
 */
const finishLoadMovies = () => {
    return {
        type: Consts.START_LOAD_RECOMMENDED_MOVIES,
        payload: {
            isRecommendedMoviesLoaded: false
        }
    }
};

/**
 * @param {{}} opts
 * @return {function(*=): *}
 */
const loadRecommendedMovies = (opts) => dispatch =>
    RecommendedMoviesIdsGetter.get(opts, saveMovies, dispatch);

export default {
    loadRecommendedMovies,
    finishLoadMovies
};
