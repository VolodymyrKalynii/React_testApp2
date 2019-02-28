import Consts from '../../lib/Constants';
import InitialState from '../state/InitialState';

const initialState = {
    moviesList: []
};

export function homePageReducers(state = initialState, action) {
    const moviesList = [...state.moviesList];

    switch (action.type) {
        case Consts.LOAD_MOVIES_BY_PAGE_NAME:

            return {
                ...state,
                moviesList
            };
        default:
            return state
    }
}
