import Consts from '../../lib/Constants';
import InitialState from '../state/InitialState';

const initialState = {
    moviesList: [],
    isMoviesLoaded: false,
    filteredSearch: false,
    activePage: 1,
    totalItemsCount: 0,
    itemsCountPerPage: 0
};

export function homePageReducers(state = initialState, action) {
    const moviesList = [...state.moviesList];
    // console.log(action);
    switch (action.type) {
        case Consts.LOAD_MOVIES_BY_PAGE_NAME:

            console.log(action);

            return {
                ...state,
                moviesList
            };
        default:
            return state
    }
}
