import Consts from '../Constants';
import {HomePageState} from '../state';

export function homePageReducer(state = HomePageState.initialState, action) {
    // console.log(state);
    switch (action.type) {
        case Consts.LOAD_MOVIES_BY_PAGE_NAME:
        case Consts.LOAD_MOVIES_BY_NAME_AND_PAGE:
            return {
                ...state,
                totalItemsCount: action.payload.moviesList.total_results,
                itemsCountPerPage: action.payload.moviesList.results.length,
                moviesList: action.payload.moviesList.results,
                filteredSearch: action.payload.filteredSearch,
                isMoviesLoaded: action.payload.isMoviesLoaded
            };
        default:
            return state
    }
}
