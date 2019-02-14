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
}