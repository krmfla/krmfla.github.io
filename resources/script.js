var linkData = {
	"goJsfiddle": "https://krmfla.github.io/example/jsfiddle/",
	"goWorldFamily": "https://www.worldfamily.com.tw/",
	"goCollection": "https://q4u.worldfamily.com.tw/card2/all/all.html",
	"goKidTest": "http://krmfla.byethost12.com/toys/index.html"
};

document.addEventListener("DOMContentLoaded", init);

function init() {
	var elements = document.querySelectorAll('.links');
	// console.log(elements);
	for (var i = 0, max = elements.length; i < max; i++) {
		var category = elements[i].dataset.url;
		// console.log(category);
		elements[i].linkUrl = linkData[category];
		elements[i].addEventListener("click", function () {
			// console.log(this.linkUrl);
			window.open(this.linkUrl);
			gtag('event', 'click', {
				'event_category': "index",
				'event_label': this.dataset.url,
				'transport_type': 'beacon'
			});
			// console.log(this.dataset.url);
		});

	}
}
