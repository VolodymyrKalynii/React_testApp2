import {combineReducers} from 'redux';
import {homePageReducers} from './homePage.reducers';
import {filmsReducers} from './films.reducers';
import {genresReducers} from './genres.reducers';

export const rootReducer = combineReducers({
    homePage: homePageReducers,
    genres: genresReducers,
    movies: filmsReducers
});