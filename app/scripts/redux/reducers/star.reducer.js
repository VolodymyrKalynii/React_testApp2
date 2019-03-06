import Consts from '../../lib/Constants';
import StarTate from '../state/star.state';

export function starReducer(state = StarTate.initialState, action) {
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
