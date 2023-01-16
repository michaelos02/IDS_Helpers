function onOpen() {
  let ui = SpreadsheetApp.getUi()
  let libName = "IDS_Helpers"
  ui.createMenu('Data Science')
    .addItem("Random Numbers", libName + ".doShowRandomDialog")
    .addItem("Shuffling Values", libName + ".doShowShuffleDialog")
    .addToUi()
  
  
}





