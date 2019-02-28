import {combineReducers} from 'redux';
import {homePageReducers} from './homePage.reducers';
import {filmsReducers} from './films.reducers';

export const rootReducer = combineReducers({
    homePage: homePageReducers,
    movies: filmsReducers
});