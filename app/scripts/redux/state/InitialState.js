import Constants from '../../lib/Constants';

export default class InitialState {}

InitialState.initialState = {
    starMoviesId: JSON.parse(localStorage.getItem(Constants.STAR_MOVIES_ID)) || [],
    genres: []
};