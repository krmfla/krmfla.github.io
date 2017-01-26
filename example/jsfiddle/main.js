var data = source;
//TODO: modify bind(this);
var app = {
	"init": function (data) {
		//initial value
		this.listEl = document.getElementById("navList");
		this.iframeEl = document.getElementById("sandbox");
		this.funcEl = document.getElementById("functionBtn");
		this.navEl = document.getElementById("navigation");
		this.inputEl = document.getElementById("searchInput");
		this.searchEl = document.getElementById("searchBtn");
		this.favoriteEl = document.getElementById("favoriteBtn");
		this.projectEl = document.getElementById("projectName");
		this.mainBGEl = document.getElementById("mainBG");
		this.data = data;
		this.selectEl = null;
		this.hideMainBG = false;
		this.open = false;
		//initial active
		this.createEl();
		this.bindEvent();
	}
	, "createEl": function () {
		var _content = "";
		this.data.map(function (item, index) {
			_content += "<li class='style_" + item.tag + "' data-index='" + index + "' data-fav='" + item.favorite + "'>" + item.name + "</li>";
		});
		//this.renderList(_content);
		this.listEl.innerHTML = _content;
	}
	, "bindEvent": function () {
		this.listEl.addEventListener("click", app.clickEvent);
		this.funcEl.addEventListener("click", app.funcEvent);
		this.inputEl.addEventListener("keydown", app.onKeydown);
		this.searchEl.addEventListener("click", app.searchEvent);
		this.favoriteEl.addEventListener("click", app.favoriteEvent);
		
	}
	, "clickEvent": function (event) {
		if (app.hideMainBG === false) {
			document.getElementById("mainBG").style.backgroundImage = "url('')";
			app.hideMainBG = true;
		}
		app.funcEvent();
		app.listSelected(event.toElement);
		var index = event.toElement.dataset.index;
		if (index) {
			app.renderSandbox(index);
		}
		else {
			console.log("no src");
		}
	}
	, "funcEvent": function () {
		if (app.open) {
			app.navEl.classList.remove("active");
			app.funcEl.classList.remove("active");
			app.open = false;
		}
		else {
			app.navEl.classList.add("active");
			app.funcEl.classList.add("active");
			app.open = true;
		}
	},
	"onKeydown": function(event) {
		if (event.keyCode === 13) {
			app.searchEvent();
		} else if (event.keyCode === 8 && app.inputEl.value.length === 1) {
			for (var i = 0, max = app.listEl.childNodes.length; i < max; i++) {
				app.listEl.childNodes[i].classList.remove("hide");
			}
		}
	},
	"searchEvent": function() {
		var value = (app.inputEl.value).toLowerCase();
		if (!value) { return };
		for (var i = 0, max = app.listEl.childNodes.length; i < max; i++) {
			var textContent = (app.listEl.childNodes[i].textContent).toLowerCase();
			if (textContent.indexOf(value) >= 0) {
				app.listEl.childNodes[i].classList.remove("hide");
			} else {
				app.listEl.childNodes[i].classList.add("hide");
			}
		}
	},
	"favoriteEvent": function() {
		if (app.favoriteEl.className.indexOf("showAll") >= 0) {
			for (var i = 0, max = app.listEl.childNodes.length; i < max; i++) {
				app.listEl.childNodes[i].classList.remove("hide");
			}
			app.favoriteEl.classList.remove("showAll");
		} else {
			for (var i = 0, max = app.listEl.childNodes.length; i < max; i++) {
				var favorite = app.listEl.childNodes[i].dataset.fav;
				console.log(favorite);
				if (favorite === "true") {
					app.listEl.childNodes[i].classList.remove("hide");
				} else {
					app.listEl.childNodes[i].classList.add("hide");
				}
			}
			app.favoriteEl.classList.add("showAll");
		}
	},
	"displayItem": function(con) {
		
	},
	"listSelected": function (element) {
		//console.log(element);
		if (app.selectEl !== null) {
			app.selectEl.classList.remove("active");
		}
		element.classList.add("active");
		app.selectEl = element;
	}
	, "renderSandbox": function (index) {
		//console.log(this);
		//console.dir(this.iframeEl);
		this.iframeEl.setAttribute("src", this.data[index].src);
		this.projectEl.innerText = this.data[index].name;
	}
};

function resizeView() {
	var setHeight = window.innerHeight - 50 + "px";
	app.navEl.style.height = setHeight;
	app.mainBGEl.style.height = setHeight;
	app.iframeEl.style.height = setHeight;
}
//event binding
document.addEventListener("DOMContentLoaded", function(event) {
	app.init(data);
	resizeView();
	window.addEventListener("resize", resizeView);
});


