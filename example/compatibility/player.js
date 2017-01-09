function Player() {
	var _player;
	var _sourceUrl = null;
	var sourceEl = null;
	var hintEl = null;
	var timeLineEl = null;
	var liveEl = null;
	var currentEl = null;
	var durationEl = null;
	var currentSeekEl = null;
	var timeHr = null;
	var timeMin = null;
	var timeSec = null;
	var timer = null;
	var seekValue = null;
	var seekTimer = null;
	var isLive = null;

	// === basic method ===
	function init(elementId, currentTimeId, durationTimeId, seekbarId, hintId, timeLineId, liveId) {
		_player = document.getElementById(elementId);
		hintEl = document.getElementById(hintId);
		timeLineEl = document.getElementById(timeLineId);
		liveEl = document.getElementById(liveId);
		currentEl = document.getElementById(currentTimeId);
		durationEl = document.getElementById(durationTimeId);
		currentSeekEl = document.getElementById(seekbarId);
		currentEl.innerText = "00:00:00";
		durationEl.innerText = "00:00:00";
		currentSeekEl.style.width = "0%";

		//event binding
		_player.onended = function() {
			stop();
			debug.log("- player ended -");
		}

		_player.onloadstart = function() {
			hintEl.classList.remove("hide");
			debug.log("- source load start -");
		}

		debug.log("- player initial -");
	}


	function reload(sourceUrl) {
		stop();
		sourceEl = document.createElement("SOURCE");
		sourceEl.setAttribute("src", sourceUrl);
		_player.appendChild(sourceEl);
		_player.load();

		//onBuffering complete
		_player.oncanplay = function() {
			durationEl.innerText = timeCaculate(_player.duration);
			hintEl.classList.add("hide");
			if (_player.duration === Infinity) {
				timeLineEl.classList.add("hide");
				liveEl.classList.remove("hide");
				isLive = true;
				debug.log("live source");
			} else {
				timeLineEl.classList.remove("hide");
				liveEl.classList.add("hide");
				isLive = false;
				debug.log("normal source");
			}
			debug.log("- player is ready -");
			play();
		};

		//onError
		_player.onerror = function(event) {
			debug.log("ERROR");
		};
		
		debug.log("- reload -");
	}

	function play() {
		debug.log("- play -");
		console.log(_player);
		_player.play();
		getCurrentTime();
	}

	function pause() {
		if (isLive) { return }
		_player.pause();
		//debug.log("- pause -");
	}

	function stop() {
		clearInterval(timer);
		if (_player.firstChild) {
			_player.removeChild(_player.firstChild);
			currentEl.innerText = "00:00:00";
			durationEl.innerText = "00:00:00";
			currentSeekEl.style.width = "0%";
		}
		_player.load();
		hintEl.classList.add("hide");
		//debug.log("- stop -");
	}

	function seek(value) {
		if (isLive) { return }
		clearInterval(timer);
		if (seekValue === null) {
			seekValue = _player.currentTime;
		}
		seekValue += value;
		if (seekValue > _player.duration) {
			seekValue = _player.duration -1;
		} else if (seekValue < 0) {
			seekValue = 0;
		}
		currentEl.innerText = timeCaculate(seekValue);
		currentSeekEl.style.width = (seekValue / _player.duration) * 100 + "%";
		clearTimeout(seekTimer);
		seekTimer = setTimeout(function() {
			_player.currentTime = seekValue;
			play();
			seekValue = null;
			hintEl.classList.remove("hide");
		}, 1000);
		//debug.log("- seeking -");
	}

	// === function kits ===
	function timeCaculate(time) {
		time = parseInt(time, 10);
		timeSec = time % 60;

		if (time >= 60) {
			timeMin = parseInt((time / 60), 10);
			if (timeMin >= 60) {
				timeHr = parseInt((timeMin / 60), 10);
			} else {
				timeHr = 0;
			}
		} else {
			timeMin = 0;
			timeHr = 0;
		}

		timeMin = timeMin % 60;
		timeSec = timeFormat(timeSec);
		timeMin = timeFormat(timeMin);
		timeHr = timeFormat(timeHr);
		return (timeHr + ":" + timeMin + ":" + timeSec);
	}

	function timeFormat(value) {
		if (value < 10) {
			value = "0" + value; 
		}
		return value;
	}

	function getCurrentTime() {
		if (timer) {
			clearInterval(timer);
		}
		timer = setInterval(function(){
			currentEl.innerText = timeCaculate(_player.currentTime);
			currentSeekEl.style.width = (_player.currentTime / _player.duration) * 100 + "%";
		}, 500);
	}

	//Export API
	return {
		"init": init,
		"reload": reload,
		"play": play,
		"pause": pause,
		"stop": stop,
		"seek": seek
	}
}

//Todo: separate viewInfo & player

