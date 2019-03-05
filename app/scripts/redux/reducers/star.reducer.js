import Consts from '../../lib/Constants';
import InitialState from '../state/InitialState';

export function starReducer(state = InitialState.initialState, action) {
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
        default:
            return state
    }
}
