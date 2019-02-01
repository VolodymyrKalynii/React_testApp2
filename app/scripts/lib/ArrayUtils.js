export default class ArrayUtils {
    /**
     * Клонує масив.
     *
     * @param {Array<*>} arr
     * @return {Array<*>}
     */
    static getClone(arr) {
        return JSON.parse(JSON.stringify(arr))
    }
}