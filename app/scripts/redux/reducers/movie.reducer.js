import Consts from '../../lib/Constants';
import {MovieState} from '../state';

export function movieReducer(state = MovieState.initialState, action) {
    switch (action.type) {
        case Consts.FINISH_LOAD_MOVIE:
            return {
                ...state,
                isMovieLoaded: action.payload.isMovieLoaded
            };
        case Consts.LOAD_MOVIE:
            return {
                ...state,
                movieInfo: action.payload.movieInfo,
                isMovieLoaded: action.payload.isMovieLoaded
            };
        default:
            return state
    }
}
