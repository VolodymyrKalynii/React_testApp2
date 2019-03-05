import Consts from '../../lib/Constants';

import StarMoviesGetter from '../../js/StarMoviesGetter';

/**
 * @param {Array<{}>} starMovies
 * @return {{type: string, payload: *}}
 */
const saveStarMovies = starMovies => {
    return {
        type: Consts.SAVE_STAR_MOVIES,
        payload: {
            starMovies,
            isStarMoviesLoaded: true
        }
    }
};

const loadStarMovies = (starMoviesId) => dispatch =>
    StarMoviesGetter.get(starMoviesId, saveStarMovies, dispatch);

export default {
    loadStarMovies
}