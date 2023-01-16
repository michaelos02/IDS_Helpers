//get css and js into the web page
function include(filename){
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

// //for google.scrpt.run...
// function expose(library, namespace , method) {
//    return this[library][namespace][method]
//   .apply(this,Array.prototype.slice.call(arguments,3));
// }