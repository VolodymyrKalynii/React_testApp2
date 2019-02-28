import Consts from '../../lib/Constants';
import RequestsURLsCreator from '../../js/RequestsURLsCreator';

export default class HomePageActions {

    static loadMovies(movies) {
        console.log(movies);
        return {
            type: Consts.LOAD_MOVIES_BY_PAGE_NAME,
            payload: {
                isMoviesLoaded: true,
                moviesList: movies
            }
        };
    }

    static loadMoviesByPageNumber(pageNumber) {
        console.log(1121);
        return dispatch => {
            console.log(112);
            return fetch(RequestsURLsCreator.loadPopularMoviesByPageNumber(pageNumber))
                .then(response => response.json())
                .then(json => {
                    console.log(json);
                    dispatch(HomePageActions.loadMovies(json))
                })
                .catch(error => console.log('error'));
        };
    }
}
