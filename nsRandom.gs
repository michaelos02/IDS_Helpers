const nsRandom = (() => {
    /**
     * Generate an array of random numbers
     * @param {number} min The lower limit
     * @param {number} max The upper limit
     * @param {integer} number The number of numbers
     * @return {array} The array of random numbers
     */
    const getRandomNumberList_ = (min, max, number) => {
        try {
            let arrNumbers = []
            for (let i = 1; i < number + 1; i++) {
                arrNumbers.push([getRandomNumber_(min, max)])
            }
            return arrNumbers
        } catch (err) {
            logIt({
                level: "severe",
                theMsg: "getRandomList nsRandom",
                error: err
            })
        }

    }
    /**
     * Generate an array of UNIQUE random numbers
     * @param {number} min The lower limit
     * @param {number} max The upper limit
     * @param {integer} number The number of numbers
     * @return {array} The array of random numbers
     */
    const getRandomUniqueNumberList_ = (min, max, number) => {
        try {
            let arrNumbers = []
            while (arrNumbers.length < number) {
                let tmp = getRandomNumber_(min, max)
                if (arrNumbers.indexOf(tmp) === -1) arrNumbers.push(tmp)
            }
            let newArr = []
            arrNumbers.forEach(item => newArr.push([item]))
            return newArr
        } catch (err) {
            logIt({
                level: "severe",
                theMsg: "getRandomUniqueList nsRandom",
                error: err
            })
        }

    }
    /**
     * Generates a randdom number between a min and max AND can include min and max
     * @param {number} min the lower limit
     * @param {number} max the upper limit      
     * @return {integer} The random number 
     */
    const getRandomNumber_ = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }



    return {
        getRandomNumber: getRandomNumber_,
        getRandomNumberList: getRandomNumberList_,
        getRandomUniqueNumberList: getRandomUniqueNumberList_
    }
})()


const test = () => {
    // for (var i = 1; i < 11; i++) {
    //     let rslt = nsRandom.getRandomNumber(5, 8)
    //     console.log(rslt);
    // }

    let rslt = nsRandom.getRandomNumberList(5, 9, 5)
    let rslt2 = nsRandom.getRandomUniqueNumberList(5, 15, 5)

    console.log(rslt2);



}