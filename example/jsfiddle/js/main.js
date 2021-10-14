//On Document Ready
document.addEventListener("DOMContentLoaded", function (event) {
	var app = new App();
	//AJAX
	getJSON("./data/list.json", function (isSuccess, response) {
		app.init(response);
	});
});

function App() {
	// === Variable ===
	var listEl = document.getElementById("navList");
	var iframeEl = document.getElementById("sandbox");
	var funcEl = document.getElementById("functionBtn");
	var navEl = document.getElementById("navigation");
	var inputEl = document.getElementById("searchInput");
	var searchEl = document.getElementById("searchBtn");
	var favoriteEl = document.getElementById("favoriteBtn");
	var projectEl = document.getElementById("projectName");
	var mainBGEl = document.getElementById("mainBG");
	var selectEl = null;
	var data = null;
	var hideMainBG = false;
	var isOpen = false; //is function button used

	// === Public Action ===
	function initialize(jsonData) {
		data = jsonData;
		creatElement();
		bindEvent();
	}

	// === Private Function Kits ===
	function creatElement() {
		var _content = "";
		for (var i = 0; i < data.length; i++) {
			item = data[i];
			_content += "<li class='style_" + item.tag + "' data-index='" + i + "' data-fav='" + item.favorite + "' data-tag='" + item.tag + "'>" + item.name + "</li>";
		}
		listEl.innerHTML = _content;
	}

	function bindEvent() {
		listEl.addEventListener("click", clickEvent);
		funcEl.addEventListener("click", funcEvent);
		inputEl.addEventListener("keydown", onKeydown);
		searchEl.addEventListener("click", searchEvent);
		favoriteEl.addEventListener("click", favoriteEvent);
	}

	function clickEvent(event) {
		if (hideMainBG === false) {
			document.getElementById("mainBG").style.backgroundImage = "url('')";
			hideMainBG = true;
		}
		funcEvent();
		console.log(event);
		listSelected(event.target);
		var index = event.target.dataset.index;
		if (index) {
			renderSandbox(index);
		} else {
			console.log("no src");
		}
	}

	function funcEvent() {
		if (isOpen) {
			navEl.classList.remove("active");
			funcEl.classList.remove("active");
			isOpen = false;
		} else {
			navEl.classList.add("active");
			funcEl.classList.add("active");
			isOpen = true;
		}
	}

	function listSelected(element) {
		console.log(element);
		if (selectEl !== null) {
			selectEl.classList.remove("active");
		}
		element.classList.add("active");
		selectEl = element;
	}

	function renderSandbox(index) {
		iframeEl.setAttribute("src", data[index].src);
		projectEl.innerText = data[index].name;
	}

	function onKeydown(event) {
		if (event.keyCode === 13) {
			searchEvent();
		} else if (event.keyCode === 8 && inputEl.value.length === 1) {
			for (var i = 0, max = listEl.childNodes.length; i < max; i++) {
				listEl.childNodes[i].classList.remove("hide");
			}
		}
	}

	function searchEvent() {
		var value = (inputEl.value).toLowerCase();
		if (!value) { return };
		for (var i = 0, max = listEl.childNodes.length; i < max; i++) {
			var textContent = (listEl.childNodes[i].textContent).toLowerCase();
			var tag = listEl.childNodes[i].dataset.tag.toLowerCase();
			if (textContent.indexOf(value) >= 0 || tag.indexOf(value) >= 0) {
				listEl.childNodes[i].classList.remove("hide");
			} else {
				listEl.childNodes[i].classList.add("hide");
			}
		}
	}

	function favoriteEvent() {
		if (favoriteEl.className.indexOf("showAll") >= 0) {
			for (var i = 0, max = listEl.childNodes.length; i < max; i++) {
				listEl.childNodes[i].classList.remove("hide");
			}
			favoriteEl.classList.remove("showAll");
		} else {
			for (var i = 0, max = listEl.childNodes.length; i < max; i++) {
				var favorite = listEl.childNodes[i].dataset.fav;
				if (favorite === "true") {
					listEl.childNodes[i].classList.remove("hide");
				} else {
					listEl.childNodes[i].classList.add("hide");
				}
			}
			favoriteEl.classList.add("showAll");
		}
	}

	// === API ===
	return {
		init: initialize
	}
}

function getJSON(url, callback) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);
	xhr.responseType = 'json';
	xhr.onload = function () {
		var status = xhr.status;
		if (status == 200) {
			callback(true, xhr.response);
		} else {
			callback(false, status);
		}
	};
	xhr.send();
}
