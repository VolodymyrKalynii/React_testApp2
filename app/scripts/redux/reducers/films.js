import Consts from '../../lib/Constants';
import InitialState from '../state/InitialState';

export function films(state = InitialState.initialState, action) {
    const starFilmsId = [...state.starFilmsId];

    switch (action.type) {
        case Consts.ADD_STAR:

            return {
                ...state,
                starFilmsId
            };
        case Consts.REMOVE_STAR:

            return {
                ...state,
                starFilmsId
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
