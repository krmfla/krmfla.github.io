var debug;
var player;

//when document ready
document.addEventListener("DOMContentLoaded", function(event) {
	debug = new Debug;
	debug.log("press UP/DOWN/OK/BACK button");
	player = new Player;

	document.centerSystem = new CenterSystem;

	//event binding
	document.addEventListener("keydown", document.centerSystem.action);
	//console.log(document.centerSystem);
});

// === General Function ===
//General Navagation Selector
function NavSelector(parentId) {
	var callback = null;
	var selectIndex = 0;
	var parentEl = document.getElementById(parentId);
	var selectEl = parentEl.children[selectIndex];
	var itemLength = parentEl.children.length - 1;
	selectEl.classList.add("active");

	function changeItem(offset) {
		selectEl.classList.remove("active");
		selectIndex += offset;
		if (selectIndex > itemLength) {
			selectIndex = 0;
		} else if (selectIndex < 0) {
			selectIndex = itemLength;
		}
		selectEl = parentEl.children[selectIndex];
		selectEl.classList.add("active");
	}

	function selectItem() {
		//console.log(typeof callback);
		if (typeof callback === "function") {
			callback();
			//console.log(this);
		} else {
			//console.log("was not set callback function");
		}
	}

	function setCallback(theCallback) {
		callback = theCallback;
	}

	return {
		"changeItem": changeItem,
		"selectItem": selectItem,
		"setCallback": setCallback
	};
}

//General Controller
function Controller(event, self) {
	var _self = self;
	function action(event) {
		switch(event.keyCode) {
			case 13:
				_self.selectItem();
				break;
			case 38:
				_self.changeItem(-1);
				break;
			case 40:
				_self.changeItem(1);
				break;
			default:
				//console.log(event.keyCode);
				break;
		}
	}
	return action;
}

// === Custom Function === 
function generalSelector() {
	var titleEl = document.getElementById("itemTitle");
	var parentEl = document.getElementById("navItemBox");
	var selectEl = parentEl.getElementsByClassName("active")[0];
	var showList = selectEl.getAttribute("category");
	var showListEl = document.getElementById(showList);
	titleEl.innerText = selectEl.innerText;
	parentEl.classList.add("hide");
	showListEl.classList.remove("hide");
	document.centerSystem.switchFocus(showList);
}

function playerExecute() {
	console.log("playerExecute");
	var parentEl = document.getElementById("playerBox");
	var selectEl = parentEl.getElementsByClassName("active")[0];
	if (selectEl.hasAttribute("category")) {
		//console.log("hasAttribute");
		var titleEl = document.getElementById("itemTitle");
		var showList = selectEl.getAttribute("category");
		var showListEl = document.getElementById(showList);
		titleEl.innerText = "Compatibility Test";
		parentEl.classList.add("hide");
		showListEl.classList.remove("hide");
		document.centerSystem.switchFocus(showList);
	} else {
		console.log("no Attribute");
		var actor = selectEl.getAttribute("act");
		switch (actor) {
			case "init":
				player.init("videoPlayer", "current", "duration", "currentSeek", "playerHint", "timeLine", "live");
				break;
			case "load1":
				player.reload("http://live.ccus.simplestreamcdn.com/live/isd_sdi3/bitrate1.isml/bitrate1-audio_track=64000-video=900000.m3u8");
				break;
			case "load2":
				player.reload("http://173.236.10.10:1935/dgrau/dgrau/chunklist_w429274093.m3u8");
				break;				
			case "play":
				player.play();
				break;
			case "pause":
				player.pause();
				break;
			case "seekForward":
				player.seek(5);
				break;
			case "seekBackward":
				player.seek(-5);
				break;
			case "stop":
				player.stop();
				break;
		}
	}
}

function keycodeExecute() {
	var parentEl = document.getElementById("keycodeBox");
	var selectEl = parentEl.getElementsByClassName("active")[0];
	console.log("exe");
	if (selectEl.hasAttribute("category")) {
		//console.log("hasAttribute");
		var titleEl = document.getElementById("itemTitle");
		var showList = selectEl.getAttribute("category");
		var showListEl = document.getElementById(showList);
		titleEl.innerText = "Compatibility Test";
		parentEl.classList.add("hide");
		showListEl.classList.remove("hide");
		document.centerSystem.switchFocus(showList);
	}
}


function CenterSystem() {
	var focusId = null;

	//Define all navegation behavior
	//Navagation Controller
	var navSelector = new NavSelector("navItemBox");
	navSelector.controller = new Controller(null, navSelector);
	navSelector.setCallback(generalSelector);

	//Player Controller
	var playerSelector = new NavSelector("playerBox");
	playerSelector.controller = new Controller(null, playerSelector);
	playerSelector.setCallback(playerExecute);
	player.init("videoPlayer", "current", "duration", "currentSeek", "playerHint", "timeLine", "live");

	//Player Controller
	var keycodeSelector = new NavSelector("keycodeBox");
	keycodeSelector.controller = new Controller(null, keycodeSelector);
	keycodeSelector.setCallback(keycodeExecute);

	function action(event) {
		switch (focusId) {
			case "keycodeBox":
				keycodeSelector.controller(event);
				debug.log("keyCode: " + event.keyCode);
				break;
			case "playerBox":
				playerSelector.controller(event);
				break;
			case "navItemBox":
			default:
				navSelector.controller(event);
				break;
		}
	}

	function switchFocus(newId) {
		console.info("switchFocus");
		focusId = newId;
	}

	return {
		"action": action,
		"switchFocus": switchFocus
	};
}
