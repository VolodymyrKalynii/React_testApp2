import Consts from '../../lib/Constants';

const initialState = {
    movieInfo: '',
    isMovieLoaded: false
};

export function movieReducer(state = initialState, action) {
    switch (action.type) {
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
