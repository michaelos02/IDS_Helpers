  /** Link to spreadsheet https://docs.google.com/spreadsheets/d/15x7sdPxRFhDFrltubmorGemc7gHP9YZeTqAfe6za7Pw/edit#gid=0 */
  /**
   * Info needed to log it through MyBBlog
   * @param {Object} info - The object with error message and error if there is one
   * @param {array} info.level - The level of the log message (ie severe, info, config)
   * @param {string} info.theMsg - The message to be logged
   * @param {string} info.error - The error object if there is one
   */
var logIt = (info)=>{
  let log = mroBBLog.getLog({
    sheetName:'IDShelpers',
    level:'FINEST', 
    sheetId:'15x7sdPxRFhDFrltubmorGemc7gHP9YZeTqAfe6za7Pw',
    displayUserId:'EMAIL_FULL',
    });
  log[info.level](info.theMsg);
  if(info.error){
    log.severe(info.error.stack)
  }
  
}

const testLog=()=>{
      logIt({
        level:"severe",
        theMsg:"Error in emailing links",
        //error:"Bad news!"
      })
}

const testThrow =()=>{
  try{
    throw "tab"
  }
  catch(err){
    logIt({
      level:"info",
      theMsg:`This is bad! ${err}`,
     // error:err
      })
  }
}