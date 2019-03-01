import Consts from '../../lib/Constants';
import InitialState from '../state/InitialState';

export function filmsReducers(state = InitialState.initialState, action) {
    const starMoviesId = [...state.starMoviesId];
    // const moviesList = [...state.moviesList];

    switch (action.type) {
        // case Consts.LOAD_MOVIES_BY_PAGE_NAME:
        //
        //     return {
        //         ...state,
        //         moviesList
        //     };
        case Consts.ADD_STAR:

            return {
                ...state,
                starMoviesId
            };
        case Consts.REMOVE_STAR:

            return {
                ...state,
                starMoviesId
            };
        case Consts.SAVE_GENRES:

            return {
                ...state,
                genres: action.payload
            };
        default:
            return state
    }
}
