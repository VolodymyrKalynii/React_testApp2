import Consts from '../../lib/Constants';

export default class PageActions {
    /**
     * @param {Array<{}>} starFilmsId
     * @return {{type: string, payload: *}}
     */
    static addStar(starFilmsId) {
        return {
            type: Consts.ADD_STAR,
            payload: starFilmsId
        }
    }

    /**
     * @param {Array<string>} starFilmsId
     * @return {{type: string, payload: *}}
     */
    static removeStar(starFilmsId) {
        return {
            type: Consts.REMOVE_STAR,
            payload: starFilmsId
        }
    }
}
