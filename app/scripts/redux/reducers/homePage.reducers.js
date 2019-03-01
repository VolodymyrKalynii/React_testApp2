import Consts from '../../lib/Constants';

const initialState = {
    moviesList: [],
    isMoviesLoaded: false,
    filteredSearch: false,
    activePage: 1,
    totalItemsCount: 0,
    itemsCountPerPage: 0
};

export function homePageReducers(state = initialState, action) {
    // const moviesList = [...state.moviesList];
    switch (action.type) {
        case Consts.LOAD_MOVIES_BY_PAGE_NAME:
            // console.log(action.payload);
            const moviesList = action.payload.moviesList.results;
            const filteredSearch = action.payload.filteredSearch;
            const totalItemsCount = action.payload.moviesList.total_results;
            const itemsCountPerPage = action.payload.moviesList.results.length;

            return {
                ...state,
                totalItemsCount,
                itemsCountPerPage,
                moviesList,
                filteredSearch,
                isMoviesLoaded: action.payload.isMoviesLoaded
            };
        case Consts.LOAD_MOVIES_BY_NAME_AND_PAGE:
            const moviesList2 = action.payload.moviesList.results;
            const filteredSearch2 = action.payload.filteredSearch;
            const totalItemsCount2 = action.payload.moviesList.total_results;
            const itemsCountPerPage2 = action.payload.moviesList.results.length;

            return {
                ...state,
                totalItemsCount:totalItemsCount2,
                itemsCountPerPage:itemsCountPerPage2,
                moviesList: moviesList2,
                filteredSearch: filteredSearch2,
                isMoviesLoaded: action.payload.isMoviesLoaded
            };
        default:
            return state
    }
}
