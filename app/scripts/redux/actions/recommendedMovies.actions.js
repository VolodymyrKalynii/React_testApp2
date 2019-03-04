import Consts from '../../lib/Constants';
import RecommendedMoviesIdsGetter from '../../js/RecommendedMoviesIdsGetter';

const saveMovies = movies => {
    return {
        type: Consts.LOAD_RECOMMENDED_MOVIES_ID,
        payload: movies
    }
};

const loadRecommendedMoviesPagesQty = (opts) => dispatch =>
    RecommendedMoviesIdsGetter.get(opts, saveMovies, dispatch);

export default {
    loadRecommendedMoviesPagesQty
};
