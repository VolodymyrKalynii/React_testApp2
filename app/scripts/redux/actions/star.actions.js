import Consts from '../Constants';

/**
 * @param {Array<{}>} starMoviesId
 * @return {{type: string, payload: *}}
 */
const addStar = starMoviesId => ({
    type: Consts.ADD_STAR,
    payload: starMoviesId
});

/**
 * @param {Array<string>} starMoviesId
 * @return {{type: string, payload: *}}
 */
const removeStar = starMoviesId => ({
    type: Consts.REMOVE_STAR,
    payload: starMoviesId
});

export default {
    addStar,
    removeStar
};