import Consts from '../../lib/Constants';

export default class HomePageActions {

    /**
     * @param {Array<string>} moviesList
     * @return {{type: string, payload: *}}
     */
    static loadMoviesByPageNumber(moviesList) {

        return {
            type: Consts.LOAD_MOVIES_BY_PAGE_NAME,
            payload: moviesList
        }
    }
}
