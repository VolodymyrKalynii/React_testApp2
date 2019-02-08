import Consts from '../../lib/Constants';
import InitialState from '../state/InitialState';

// console.log(InitialState.initialState);

export function taskReducer(state = InitialState.initialState, action) {
    return state

    // switch (action.type) {
    //     case Consts.FILTER_FOR_PROJECTS:
    //         filteredProjectName = action.payload;
    //
    //         return {
    //             ...state,
    //             filteredProjectName
    //         };
    //     default:
    //         return state
    // }
}
