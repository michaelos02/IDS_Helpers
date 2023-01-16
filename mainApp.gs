/**
 * The main app... where everything starts from!!
 */
const mainApp = (() => {
  /**
   * The 'helper' function to get a random list of numbers
   * @param {object} theInfo The object that holds the info  default = {}
   * @param {number} theInfo.min      The lower limit  default = 1
   * @param {number} theInfo.max      The lower limit  default = 10
   * @param {number} theInfo.number   The lower limit  default = 10
   * @param {string} theInfo.addr     The "A1" notation of top left cell
   * @param {string} theInfo.unique   Unique list of numbers Yes/No
   * @return {bool}  True if no problems, the err otherwise
   */
  const doGetRandomList_ = (theInfo = {}) => {

    try {
      let rslt
      let { min = 1, max = 10, number = 10, addr, unique } = theInfo

      if (unique === "No") {
        rslt = nsRandom.getRandomNumberList(min, max, number)
      }
      else {
        rslt = nsRandom.getRandomUniqueNumberList(min, max, number)
      }


      if (rslt) {
        let info = {
          addr: addr,
          theValues: rslt
        }
        let rslt2 = nsSheetWork.writeToSheet(info)
      }
      return true

    } catch (err) {
      logIt({
        level: "severe",
        theMsg: "doGetRandomList",
        error: err
      })
      return err
    }

  }
  //The random number generator sidebar
  const doShowRandomDialog_ = ()=> {
    let file = "random"
    let title = "Random Numbers List"
    nsSheetWork.doShowDialog(file, title)
  }
  //The shuffling sidebar
  const doShowShuffleDialog_ = ()=> {
    let file = "shuffle"
    let title = "Shuffle Values"
    nsSheetWork.doShowDialog(file, title)
  }


  return {
    doGetRandomList    : doGetRandomList_,
    doShowRandomDialog : doShowRandomDialog_,
    doShowShuffleDialog: doShowShuffleDialog_
  }
})()


  //Global vars so library can be called from the sheet
  var theMainApp  = mainApp
  var doGetRandomList = theMainApp.doGetRandomList
  var doShowRandomDialog = theMainApp.doShowRandomDialog
  var doShowShuffleDialog = theMainApp.doShowShuffleDialog