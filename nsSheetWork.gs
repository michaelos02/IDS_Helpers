const nsSheetWork = (() => {
  /**
   * The 'sheetWork' function to write values to the active sheet
   * @param {object} theInfo The object that holds the info  default = {}
   * @param {string} theInfo.addr        The the cell address where the data will go
   * @param {array}  theInfo.theValues   The array of values to write
   * @return {bool}  Ture if no problems, the err if not
   */
  const writeToSheet_ = (theInfo) => {
    let { addr, theValues } = theInfo
    logIt({
      level: "info",
      theMsg: theInfo,
    })
    try {
      let ss = SpreadsheetApp.getActiveSpreadsheet()
      let tab = ss.getActiveSheet()
      let tmpRange = tab.getRange(addr)
      let row = tmpRange.getRow()
      let col = tmpRange.getColumn()
      tab.getRange(row, col, theValues.length, theValues[0].length).setValues(theValues)
      return true
    } catch (err) {
      logIt({
        level: "severe",
        theMsg: "writeToSheet",
        error: err
      })
      return err
    }
  }
    /**
   * Read data values from the active sheet
   * @param {string} addr        The the range that has the data
   * @return {array}  The array of values
   */
  const getSheetValues_ = (addr) => {
    try {
      let ss = SpreadsheetApp.getActiveSpreadsheet()
      let tab = ss.getActiveSheet()
      let values = tab.getRange(addr).getValues()
 
      return values
    } catch (err) {
      logIt({
        level: "severe",
        theMsg: "getSheetValues nsSheetWork",
        error: err
      })
      return err
    }
  }
  /**
   * Given html file name and title, displays a sidebar in the spreadsheet
   * @param {string} file The file name of the html page to show
   * @param {string} title The title for the sidebar
   * @return {} void
   */
  const doShowDialog_ = (file, title) => {
    try {
          let html = HtmlService.createTemplateFromFile(file).evaluate()
    html.setWidth(400).setHeight(300)
    html.setTitle(title)
    SpreadsheetApp.getUi().showSidebar(html)
    //SpreadsheetApp.getUi().showModalDialog(html, "Random Numbers")
    } catch (err) {
      logIt({
        level:"severe",
        theMsg:"doShowDialog nsSheetWork",
        error:err})
    }

  }
  return {
    writeToSheet: writeToSheet_,
    doShowDialog: doShowDialog_,
    getSheetValues : getSheetValues_
  }

})()