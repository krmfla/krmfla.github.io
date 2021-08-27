var linkData = {
	"goJsfiddle": "https://krmfla.github.io/example/jsfiddle/",
	"goWorldFamily": "https://www.worldfamily.com.tw/",
	"goCollection": "https://q4u.worldfamily.com.tw/card2/all/all.html",
	"goKidTest": "http://krmfla.byethost12.com/toys/index.html"
};

var linkDomain = {
	"goJsfiddle": "https://krmfla.github.io/example/jsfiddle/",
	"goWorldFamily": "https://www.worldfamily.com.tw/",
	"goCollection": "https://q4u.worldfamily.com.tw/card2/all/",
	"goKidTest": "http://krmfla.byethost12.com/toys/"
}

document.addEventListener("DOMContentLoaded", init);

function init() {
	var elements = document.querySelectorAll('.links');
	for (var i = 0, max = elements.length; i < max; i++) {
		var category = elements[i].dataset.url;
		elements[i].linkUrl = linkData[category];
		elements[i].addEventListener("click", function () {
			var url = this.linkUrl;
			var _category = this.dataset.url;
			console.log('click');
// 			gtag('set', 'linker', {'domains': ['krmfla.github.io', 'krmfla.github.io/example/jsfiddle/']});
			console.log(linkDomain[_category]);
// 			gtag('event', 'click', {
// 				'event_category': "作品集",
// 				'event_label': _category,
// 				'transport_type': 'beacon',
// 				'event_callback': function() {
// // 					window.open(url);
// 					location.href = url;
// 				}
// 			});
// 			window.open(url);
			location.href = url;
			console.log(url);
		});

	}
}
