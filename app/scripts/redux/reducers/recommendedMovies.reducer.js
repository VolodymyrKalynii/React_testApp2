import Consts from '../../lib/Constants';

const initialState = {
    movies: [],
    isRecommendedMoviesLoaded: false
};

export function recommendedMoviesReducer(state = initialState, action) {

    switch (action.type) {
        case Consts.START_LOAD_RECOMMENDED_MOVIES:

            return {
                ...state,
                isRecommendedMoviesLoaded: action.payload.isRecommendedMoviesLoaded
            };
        case Consts.LOAD_RECOMMENDED_MOVIES_ID:
            // console.log(action.payload);
            const {movies, isRecommendedMoviesLoaded} = action.payload;
            return {
                ...state,
                movies,
                isRecommendedMoviesLoaded
            };
        default:
            return state
    }
}
