var project = "【productivity】one pomodoro cycle";
//reference http://tech2ipo.com/10029362

//DATA
var data = {
	//[hours, minutes]
	"startTime": [00, 00],
  "todoList" : ["項目1",
  				"項目2",
                "項目3",
                "項目4"]
};

//MODULE
var app = {
	"init": function() {
  	this.todoEl = document.getElementsByClassName("todo");
    this.breakEl = document.getElementsByClassName("rest");
	this.pageBoxEl = document.getElementById("pageBox");
    this.timeHrEl = document.getElementById("timeHr");
    this.colonEl = document.getElementById("colon");
    this.timeMinEl = document.getElementById("timeMin");
    this.barEl = document.getElementById("timeBar");
    this.baseTime = data.startTime.concat();
    this.content = [];
    this.contentLength = data.todoList.length;
    this.timeNow = [00, 00];
    this.timeBarData = [];
    this.composeContent();
    this.timeBarCalculate();
    this.getNewTime();
    this.render();
    this.interval();
    this.open = false;
  },
  
  "composeContent": function() {
  	for (var i = 0, max = this.contentLength; i < max; i++) {
    	var obj = {};
    	obj.work = this.timeAllocation("work") + "<br>";
      obj.work += data.todoList[i];
      if (i == 3) {
      	obj.break = this.timeAllocation("longBreak") + "<br>";
      } else {
      	obj.break = this.timeAllocation("break") + "<br>";
      }
      obj.break += "take a break";
      this.content[i] = obj;
    }
  },
  
  "timeAllocation": function(type) {
  	var startTime = this.timeFormat("baseTime", 0) + ":" + this.timeFormat("baseTime", 1);
    var endTime;
    switch (type) {
    	case "work":
		case "longBreak":
      		this.timeCarry(25);
      		break;
    	case "break":
       		this.timeCarry(5);
       		break;
    }
    endTime = this.timeFormat("baseTime", 0) + ":" + this.timeFormat("baseTime", 1);
    return startTime + " ~ " + endTime;
  },
  
  "timeFormat": function(prop, unit) {
  	if (this[prop][unit] < 10) {
    	return "0" + this[prop][unit];
    } else {
    	return this[prop][unit];
    }
  },
  
  "timeCarry": function(value) {
  	this.baseTime[1] += value;
    if (this.baseTime[1] >= 60) {
    	this.baseTime[0] += 1;
    	this.baseTime[1] -= 60;
    }
    if (this.baseTime[0] >= 24) {
    	this.baseTime[0] -= 24;
    }
  },
  
  "timeBarCalculate": function() {
  	var even = true;
  	this.timeBarData[0] = data.startTime[0] * 60 + data.startTime[1];
    for (var i = 1, max = 8; i < max; i++) {
    	if (even) {
      	this.timeBarData[i] = this.timeBarData[i-1] + 25;
        even = false;
      } else {
    		this.timeBarData[i] = this.timeBarData[i-1] + 5;
        even = true;
      }
    }
    this.timeBarData[8] = this.timeBarData[7] + 25;
  },
  
  "getNewTime": function() {
  	var time = new Date();
    this.timeNow = [time.getHours(), time.getMinutes()];
    this.renderTime();
    this.setTimeScope();
  },

  "setTimeScope": function() {
  	var odd = true;
    var theDistance = 0;
    var offsetDistance = 0;
  	var timeNow = this.timeNow[0] * 60 + this.timeNow[1];
	var timeData = this.timeBarData;
	var nowInScope = false;
	//count nowtime is in scope or not;
  	for (var i = 0, max = this.timeBarData.length; i < max; i++) {
	  (timeNow >= timeData[i] && timeNow < timeData[i+1]) ? offset(i) : cumulation();
	}
	if (!nowInScope) {
	  app.renderBar(theDistance, "none");
	  app.renderNowTask();
	}
	
	//=== function kits ===
	function offset(i) {
	  offsetDistance = (timeNow - timeData[i]) / (timeData[i+1] - timeData[i]);
	  //work or longBreak
	  if (i == 7 || odd) {
        offsetDistance = offsetDistance * 81;
	  //break
      } else {
        offsetDistance = offsetDistance * 41;
      }
	  theDistance += offsetDistance;
	  nowInScope = true;
	  app.renderBar(theDistance, "block");
	  (odd) ? app.renderNowTask("odd") : app.renderNowTask("even");
	}
	  
	function cumulation() {
	  if (odd) {
        theDistance += 81;
        odd = false;
      } else {
       	theDistance += 41;
        odd = true;
      }
	}
  },
  
  "interval": function() {
  	setInterval(function(){
    	app.getNewTime();
    },30000);
  },
  
  "render": function() {
  	for (var i = 0, max = data.todoList.length; i < max; i++) {
      this.todoEl[i].innerHTML = this.content[i].work;
      this.breakEl[i].innerHTML = this.content[i].break;
    }
  },
  
  "renderTime": function() {
  	this.timeHrEl.innerText = this.timeFormat("timeNow", 0);
    this.timeMinEl.innerText = this.timeFormat("timeNow", 1);
  },
  
  "renderBar": function(distance, type) {
  	this.barEl.style.top = distance + "px";
	this.barEl.style.block = type;
  },
	
  "renderNowTask": function(type) {
	this.pageBoxEl.className = "pageBox " + type;
  }
};

//Controller
var controller = function() {
  var navEl = document.getElementById("pageBtn");
  var navPageEl = document.getElementById("navPage");
  var boxEl = document.getElementById("box");
  var nowBtnEl = document.getElementById("nowBtn");
  var generateBtnEl = document.getElementById("generateBtn");
  var setHoursEl = document.getElementById("setHours");
  var setMinutesEl = document.getElementById("setMinutes");
  
  function openBoard() {
  	navPageEl.classList.add("slideOver");
    navEl.classList.add("active");
	setTimeout(function(){
	  navPageEl.classList.remove("slideOver");
	  navPageEl.classList.add("slide");
	  app.open = true;
	}, 300);
  }
	
  function closeBoard() {
	if (!app.open) { return }
    navPageEl.classList.remove("slide");
	navPageEl.classList.add("slideOver");
    navEl.classList.remove("active");
	setTimeout(function(){
	  navPageEl.classList.remove("slideOver");
	  app.open = false;
	}, 300);
  }
  
  function toggleBoard() {
  	if(app.open) {
	  closeBoard();
    } else {
	  openBoard();
	}
  }
	
  function getTime() {
  	var time = new Date();
    setHoursEl.value = time.getHours();
    setMinutesEl.value = time.getMinutes();
  }
	
  function format(value, type) {
	  var _max = (type === "hours") ? 23 : 59;
	  value = parseInt(value, 10);
	  if (value <= 0) {
		  value = 0;
	  } else if (value >= _max) {
		  value = _max;
	  }
	  return value;
  }
  
  function generateContent() {
  	var _id;
	setHoursEl.value = format(setHoursEl.value, "hours");
	setMinutesEl.value = format(setMinutesEl.value, "minutes");
  	data.startTime[0] = +setHoursEl.value;
    data.startTime[1] = +setMinutesEl.value;
    for (var i = 0, max = 4; i < max; i++) {
    	_id = "todo" + (i + 1);
    	data.todoList[i] = document.getElementById(_id).value;
      if (data.todoList[i] == "") { data.todoList[i] = "項目" + (i + 1) }
    }
    closeBoard();
    app.init();
  }
  
  //Event Binding
  navEl.addEventListener("click", toggleBoard);
  boxEl.addEventListener("click", closeBoard);
  nowBtnEl.addEventListener("click", getTime);
  generateBtnEl.addEventListener("click", generateContent);
}


//initialize
app.init();
controller();