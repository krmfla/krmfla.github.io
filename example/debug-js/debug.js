function Debug() {
  var timer = null;
  var timerEnd = null;
  var bodyEl = document.getElementsByTagName("body")[0];
  
  var targetEl = document.createElement("DIV");
  targetEl.style.position = "absolute";
  targetEl.style.left = 0;
  targetEl.style.bottom = 0;
  targetEl.style.color = "gray";
  targetEl.style.background = "black";
  targetEl.style.minHeight = "100vh";
  targetEl.style.zIndex = 999;
  targetEl.style.fontSize = "14px";
   targetEl.style.opacity = .7;

  bodyEl.appendChild(targetEl);
  
  //ONWINDOW ERROR
  window.onerror = function (errorMsg, url, lineNumber) {
    log('Error: ' + errorMsg);
    log('Script: ' + url);
    log('Line: ' + lineNumber);   
  };
  
  function log(text) {
    var element = document.createElement("P");
    element.style.margin = 0;
    element.style.marginBottom = "5px";
    element.innerText = text;
    targetEl.appendChild(element);
  }
  
  function setTimer() {
    timer = Date.now();
    log(">>> Timer Start >>>");
  }
  
  function endTimer() {
    if (timer === null) {
      log(">>> Timer was not set yet >>>");
      return;
    } else {
      timerEnd = Date.now();
      log(">>> process: " + (timerEnd - timer) + "ms >>>");
      timer = null;
    }
  }
  
  //API export
  return {
    "log": log,
    "time": setTimer,
    "end": endTimer
  };
}
