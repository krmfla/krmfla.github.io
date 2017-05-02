document.addEventListener("DOMContentLoaded", init);

function init() {
	var linkData = {
		"goJsfiddle"   : "https://krmfla.github.io/example/jsfiddle/",
		"goWorldFamily": "http://www.worldfamily.com.tw/index.aspx",
		"goCollection" : "http://q4u.worldfamily.com.tw/card2/all/all.html",
		"goKidTest"    : "http://krmfla.byethost12.com/toys/index.html"
	};
	
	for (var key in linkData) {
		var elements = document.getElementsByClassName(key);
		for (var i = 0, max = elements.length; i < max; i++) {
			elements[i].linkUrl = linkData[key];
			elements[i].addEventListener("click", function() {
				window.open(this.linkUrl);
			});
		}
		elements = null;
	}
}
