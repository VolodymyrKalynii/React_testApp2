import Constants from '../../lib/Constants';

export default class StarState {}

StarState.initialState = {
    starMoviesId: JSON.parse(localStorage.getItem(Constants.STAR_MOVIES_ID)) || []
};