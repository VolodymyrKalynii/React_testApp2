import Consts from '../../lib/Constants';

export default class PageActions {
    /**
     * @param {Array<{}>} starMoviesId
     * @return {{type: string, payload: *}}
     */
    static addStar(starMoviesId) {
        return {
            type: Consts.ADD_STAR,
            payload: starMoviesId
        }
    }

    /**
     * @param {Array<string>} starMoviesId
     * @return {{type: string, payload: *}}
     */
    static removeStar(starMoviesId) {
        return {
            type: Consts.REMOVE_STAR,
            payload: starMoviesId
        }
    }

    /**
     * @param {Array<string>} genres
     * @return {{type: string, payload: *}}
     */
    static loadGenres(genres) {
        return {
            type: Consts.LOAD_GENRES,
            payload: genres
        }
    }
}
