const shuffleApp = (() => {
  const doShuffle_ = (theInfo) => {
    let { addr, shuffleCol, constCol, shuffleNumber, resultsAddr } = theInfo
    let theValues = nsSheetWork.getSheetValues(addr)
    //get the column indexes for shuffle and constant
    let shuffleColIndex = theValues[0].indexOf(shuffleCol)
    let constColIndex = theValues[0].indexOf(constCol)

    //get the 2 col array we will be working with
    let theData = {
      arr: theValues,
      constCol: constColIndex,
      shuffleCol: shuffleColIndex
    }
    let workArr = nsShuffle.get2colArray(theData)

    //get the unique values for the constant and shuffle columns
    let uniqueConst = nsShuffle.getUniqueValues(workArr, 0)
    let uniqueShuffle = nsShuffle.getUniqueValues(workArr, 1)

    //This will give counts of the const values (might not need this!!!)
    for (let i = 1; i < uniqueConst.length; i++) {
      let cnt = nsShuffle.getCount(workArr, uniqueConst[i])
      console.log(`The count of ${uniqueConst[i]} is ${cnt}`);
    }

    //do the shuffling
    // global variable for the results
    let ans = []

    //if shuffle number is 0, no shuffling just get numbers from data
    if (shuffleNumber === 0) {
      let rsltNumbers = nsShuffle.getAllNumbers(workArr, uniqueConst, uniqueShuffle)
      ans = rsltNumbers
    }
    //must be shuffling now
    else {
      //vars for headers and results
      let hdrs = []
      let rslt = []
      //loop for the shuffle number
      for (let i = 1; i <= shuffleNumber; i++) {
        let shuffledArray = nsShuffle.shuffleColumn(workArr, 1)
        let rsltNumbers = nsShuffle.getAllNumbers(shuffledArray, uniqueConst, uniqueShuffle)
        //reslut has a header row that has to be removed before pushing
        hdrs = rsltNumbers.shift()
        rslt.push(rsltNumbers.flat())
      }
      //all done, put the header back on
      rslt.unshift(hdrs)
      ans = rslt

    }
    //send results to spreadsheet
    let writeInfo = {
      addr: resultsAddr,
      theValues: ans
    }
    nsSheetWork.writeToSheet(writeInfo)

    return "Success"

  }
  return {
    doShuffle: doShuffle_
  }
})()

var theShuffleApp = shuffleApp
var doShuffle = theShuffleApp.doShuffle