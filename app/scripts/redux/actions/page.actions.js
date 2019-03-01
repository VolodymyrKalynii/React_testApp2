import Consts from '../../lib/Constants';

export class PageActions {
    /**
     * @param {Array<{}>} starMoviesId
     * @return {{type: string, payload: *}}
     */
    static addStar = starMoviesId => ({
        type: Consts.ADD_STAR,
        payload: starMoviesId
    });

    /**
     * @param {Array<string>} starMoviesId
     * @return {{type: string, payload: *}}
     */
    static removeStar = starMoviesId => ({
        type: Consts.REMOVE_STAR,
        payload: starMoviesId
    });
}
