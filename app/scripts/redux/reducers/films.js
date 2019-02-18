import Consts from '../../lib/Constants';
import InitialState from '../state/InitialState';

export function films(state = InitialState.initialState, action) {
    const starMoviesId = [...state.starMoviesId];

    switch (action.type) {
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
        case Consts.LOAD_GENRES:

            return {
                ...state,
                genres: action.payload
            };
        default:
            return state
    }
}
