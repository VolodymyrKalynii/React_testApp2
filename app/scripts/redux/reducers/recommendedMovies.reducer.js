import Consts from '../../lib/Constants';
import {RecommendedMoviesState} from '../state';

export function recommendedMoviesReducer(state = RecommendedMoviesState.initialState, action) {

    switch (action.type) {
        case Consts.START_LOAD_RECOMMENDED_MOVIES:
            return {
                ...state,
                isRecommendedMoviesLoaded: action.payload.isRecommendedMoviesLoaded
            };
        case Consts.LOAD_RECOMMENDED_MOVIES_ID:
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
