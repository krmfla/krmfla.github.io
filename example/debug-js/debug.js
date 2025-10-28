function Debug(wrapperId) {
  var timer = null;
  var timerEnd = null;
  var wrapperEl = (typeof wrapperId === "string") ? document.getElementById(wrapperId)
                                                  : document.querySelector('body');
  var targetEl;
  var itemStyle = {};
  
  targetEl = document.createElement("DIV");
  targetEl.style.position = "absolute";
  targetEl.style.left = 0;
  targetEl.style.bottom = 0;
  targetEl.style.color = "gray";
  targetEl.style.minHeight = "100vh";

  wrapperEl.appendChild(targetEl);
  
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
    for (key in itemStyle) {
        element.style[key] = itemStyle[key];
    }
    element.innerText = text;
    targetEl.appendChild(element);
  }
  
  function setTimer() {
    if (timer === null) {
        log(">>> Timer Start >>>");
    } else {
        log(">>> reset Timer >>>");
    }
    timer = Date.now();
  }
  
  function endTimer() {
    if (timer === null) {
      log(">>> Timer was not set yet >>>");
    } else {
      timerEnd = Date.now();
      log(">>> process: " + (timerEnd - timer) + "ms >>>");
      timer = null;
    }
  }
  
  function setBackground(configObject) {
      for (key in configObject) {
          targetEl.style[key] = configObject[key];
      }
  }
  
  function setItem(configObject) {
      itemStyle = configObject;
  }

  //API export
  return {
    "log"            : log,
    "start"          : setTimer,
    "end"            : endTimer,
    "setBackground"  : setBackground,
    "setItem"        : setItem
  };
}
