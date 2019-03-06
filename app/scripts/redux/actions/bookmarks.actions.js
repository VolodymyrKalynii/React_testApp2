import Consts from '../../lib/Constants';

import MoviesGetter from '../../js/MoviesGetter';

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
    MoviesGetter.get(starMoviesId, saveStarMovies, dispatch);

export default {
    loadStarMovies
}