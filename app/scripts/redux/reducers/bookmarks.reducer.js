import Consts from '../../lib/Constants';

const initialState = {
    starMovies: [],
    isStarMoviesLoaded: false
};

export function bookmarksReducer(state = initialState, action) {
    switch (action.type) {
        case Consts.SAVE_STAR_MOVIES:
            const {starMovies, isStarMoviesLoaded} = action.payload;

            return {
                ...state,
                starMovies,
                isStarMoviesLoaded
            };
        default:
            return state
    }
}
