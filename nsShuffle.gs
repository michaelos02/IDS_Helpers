/**
 * The main shuffling code
 */
const nsShuffle = (() => {
  /**
   * Removes a column from an array
   * @param {array} arr An array of values
   * @param {integer} col The col index to get 
   * @return {Array}  The one column 2d array
   */
  const getColumn_ = (arr, col) => {
    try {
      let newArr = []
      arr.forEach(r => newArr.push(r.slice(col, col + 1)))
      return newArr
    }
    catch (err) {
      logIt({
        level: "severe",
        theMsg: "getColumn issue",
        error: err
      })
    }

  }
  /**
   * Given and array and col will return an array with the column values randomly shuffled
   * @param {array} arr An array of values
   * @param {integer} col The col index to shuffle 
   * @return {Array}  The array with the col shuffled
   */
  const shuffleColumn_ = (arr, col) => {
    try {
      //get just that column and remove header row
      let rslt = getColumn_(arr, col)
      let hdr = rslt.shift()

      //push a random number to each row
      rslt.forEach(r => {
        r.push(Math.random())
      })

      //sort by the random numbers
      rslt.sort((a, b) => a[1] - b[1])

      //put the header back on
      rslt.unshift(hdr)

      //push the new shuffled values BACK to orriginal array
      rslt.forEach((row, idx) => {
        arr[idx][col] = row[0]
      })

      return arr
    } catch (err) {
      logIt({
        level: "severe",
        theMsg: "shuffleColumn issue",
        error: err
      })
    }

  }
  /**
   * Given an array and 2 columns returns just the 2 columns of interest {arr,constCol,shuffleCol}
   * @param {object}  theInfo             The object that holds all the needed info 
   * @param {array}   theInfo.arr         The 'big' array of all the data
   * @param {integer} thenfo.constCol     The col index of constant col
   * @param {integer} theInfo.shuffleCol  The col index of shuffle col
   * @return {array}  the new 2 col array
   */
  const get2colArray_ = (theInfo) => {
    try {
      const { arr, constCol, shuffleCol } = theInfo

      //get the constant and shuffle columns
      let constCol1 = getColumn_(arr, constCol)
      let shuffleCol2 = getColumn_(arr, shuffleCol)

      //concat the 2 arrays
      let newArr = constCol1.map((row, idx) => row.concat(shuffleCol2[idx]))

      return newArr
    } catch (err) {
      logIt({
        level: "severe",
        theMsg: "get2colArray issue",
        error: err
      })
    }

  }
  /**
   * Given an array and a col returns an array of unique values
   * @param {array}   arr The array of values
   * @param {integer} colIndex The column index to get unique values from
   * @return {array}  The array of unique values
   */
  const getUniqueValues_ = (arr, colIndex) => {
    try {
      //get the column and the unique values
      let tempArr = getColumn_(arr, colIndex).flat()
      return [...new Set(tempArr)]
    } catch (err) {
      logIt({
        level: "severe",
        theMsg: "getUniqueVlaue nsShuffle",
        error: err
      })
    }

  }
  /**
   * Given an array, what to count and the col returns the count
   * @param {array} 
   * @param {string} item The value from the column that needs to be counted
   * @param {integer} [idx] The colum index of the array to count.  Optional with default of 0
   * @return {} 
   */
  const getCount_ = (arr, item, idx = 0) => {
    return arr.filter(r => r[idx] === item).length
  }
  /**
   * Given array, constValuesArr, shuffleValuesArr will return all possible counts
   * @param {array} array             The 2 column array of const and shuffled values
   * @param {array} constValuesArr    The array of unique constant values
   * @param {array} shuffleValuesArr  The array of unique shuffled values
   * @return {} 
   */
  const getAllNumbers_ = (array, constValuesArr, shuffleValuesArr) => {
    try {
      let rslt = []
      let hdrs = []
      //outer loop for contant and inner for shuffled
      for (let i = 1; i < constValuesArr.length; i++) {
        for (let j = 1; j < shuffleValuesArr.length; j++) {
          //get name for this column of data
          hdrs.push(constValuesArr[i] + "." + shuffleValuesArr[j])
          //get the counts
          let tmp = array.filter(r => {
            return r[0] === constValuesArr[i] && r[1] === shuffleValuesArr[j]
          }).length
          rslt.push(tmp)
        }
      }
      //put the headers and rslt together
      return [hdrs, rslt]
    } catch (err) {
      logIt({
        level: "severe",
        theMsg: "getAllNumbers nsShuffle",
        error: err
      })
    }

  }


  return {
    shuffleColumn: shuffleColumn_,
    getColumn: getColumn_,
    get2colArray: get2colArray_,
    getUniqueValues: getUniqueValues_,
    getCount: getCount_,
    getAllNumbers: getAllNumbers_
  }
})()

//Global for library work
var theShuffle = nsShuffle