import {combineReducers} from 'redux';
import {homePageReducer} from './homePage.reducer';
import {recommendedMoviesReducer} from './recommendedMovies.reducer';
import {starReducer} from './star.reducer';
import {genresReducer} from './genres.reducer';
import {movieReducer} from './movie.reducer';
import {bookmarksReducer} from './bookmarks.reducer';

export const rootReducer = combineReducers({
    homePage: homePageReducer,
    genres: genresReducer,
    movie: movieReducer,
    starMovies: starReducer,
    recommendedMovies: recommendedMoviesReducer,
    bookmarksMovies: bookmarksReducer,
});