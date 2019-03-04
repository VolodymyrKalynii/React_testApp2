import {combineReducers} from 'redux';
import {homePageReducer} from './homePage.reducer';
import {recommendedMoviesReducer} from './recommendedMovies.reducer';
import {filmsReducer} from './films.reducer';
import {genresReducer} from './genres.reducer';
import {movieReducer} from './movie.reducer';

export const rootReducer = combineReducers({
    homePage: homePageReducer,
    genres: genresReducer,
    movie: movieReducer,
    movies: filmsReducer,
    recommendedMovies: recommendedMoviesReducer,
});