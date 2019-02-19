export default class ArrayUtils {
    /**
     *
     * @param arr
     * @return {...*[]}
     */
    static mixElems(arr) {
        const arrMixed = [...arr];
        const arrMixedLength = arrMixed.length;

        if (arrMixedLength === 1) return arrMixed;

        let counter = 0;

        do {
            counter = 0;

            for (let i = arrMixedLength - 1; i > 0; i--) {
                let num = Math.floor(Math.random() * (i + 1));
                let d = arrMixed[num];
                arrMixed[num] = arrMixed[i];
                arrMixed[i] = d;
            }

            for ( let i = 0; i < arrMixedLength; i++)
                if (arrMixed[i] === arr[i]) counter++

        } while (counter === arrMixedLength);

        return arrMixed;
    };

    /**
     *
     * @param {{}} opts
     * @return {*}
     */
    static getRndElements(opts) {
        const {arr, elementsQty} = opts;
        const rndElements = [];
        let index = null;
        let flag = false;

        do {
            flag = false;

            index = this.getRandElement(arr);

            if (~rndElements.indexOf(index))
                flag = true;
            else
                rndElements.push(index)

        } while (rndElements.length < elementsQty || flag);

        return rndElements
    }

    /**
     * Вертає випадковий індес масиву.
     *
     * @param {Array<*>} arr
     * @returns {*}
     * @private
     */
    static getRandElement(arr) {
        return arr[this.getRandInteger(arr.length - 1)];
    }

    /**
     * @param {number} max Максимально можливе випадкове значення.
     * @return {number}
     * @private
     */
    static getRandInteger(max) {
        let rand = Math.random() * max;

        return Math.round(rand);
    }
}