import Consts from '../Constants';
import {BookmarksState} from '../state';

export function bookmarksReducer(state = BookmarksState.initialState, action) {
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
