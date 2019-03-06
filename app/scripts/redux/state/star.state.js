import Constants from '../../lib/Constants';

export default class StarTate {}

StarTate.initialState = {
    starMoviesId: JSON.parse(localStorage.getItem(Constants.STAR_MOVIES_ID)) || []
};