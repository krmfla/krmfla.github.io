// === Define Variables and Elements ===
var elements = document.querySelectorAll('.box .item');
var targetEl;
var wrapper = document.getElementById("box");
var itemClip = document.getElementById("itemClip");

var scopeObj;

// === Event Binding ===
for (var i = 0, max = elements.length; i < max; i++) {
  elements[i].addEventListener("dragstart", handleDrag);
  elements[i].addEventListener("dragend", handleDragEnd);
  elements[i].addEventListener("dragenter", handleDragEnter);
  
  elements[i].addEventListener("touchstart", handleTouch);
  elements[i].addEventListener("touchend", handleTouchEnd);
  elements[i].addEventListener("touchmove", handleTouchMove);
}

// === Function Kits ===
function handleDrag(event) {
  targetEl = event.target;
  targetEl.classList.add("onDrag");
}

function handleDragEnd(event) {
  targetEl.classList.remove("onDrag");
}

function handleDragEnter(event) {
  wrapper.insertBefore(targetEl, event.target);
}

function handleTouch(event) {
  defineScope(elements);
  targetEl = event.target;
  itemClip.style.top = event.changedTouches[0].clientY + "px";
  itemClip.style.left = event.changedTouches[0].clientX + "px";
  itemClip.innerText = event.target.innerText;
  itemClip.classList.remove("hide");
  targetEl.classList.add("onDrag");
}

function handleTouchEnd(event) {
  itemClip.classList.add("hide");
  targetEl.classList.remove("onDrag");
}

function handleTouchMove(event) {
  itemClip.style.top = event.changedTouches[0].clientY + "px";
  itemClip.style.left = event.changedTouches[0].clientX + "px";
  hitTest(event.changedTouches[0].clientX, event.changedTouches[0].clientY);
}

function hitTest(thisX, thisY) {
  for (var i = 0, max = scopeObj.length; i < max; i++) {
    if (thisX > scopeObj[i].startX && thisX < scopeObj[i].endX) {
      if (thisY > scopeObj[i].startY && thisY < scopeObj[i].endY) {
        wrapper.insertBefore(targetEl, scopeObj[i].target);
        return;
      }
    }
  }
}

function defineScope(elementArray) {
  scopeObj = [];
  for (var i = 0, max = elementArray.length; i < max; i++) {
    var newObj = {};
    newObj.target = elementArray[i];
    newObj.startX = elementArray[i].offsetLeft;
    newObj.endX = elementArray[i].offsetLeft + elementArray[i].offsetWidth;
    newObj.startY = elementArray[i].offsetTop;
    newObj.endY = elementArray[i].offsetTop + elementArray[i].offsetHeight;
    scopeObj.push(newObj);
  }
}