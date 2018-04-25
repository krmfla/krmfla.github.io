
const CACHE_NAME = "fed-cache";
this.addEventListener("install", function(event) {
    this.skipWaiting();
    console.log("install service worker");
    // 创建和打开一个缓存库
    caches.open(CACHE_NAME);
    // 首页
    let cacheResources = [
        'index.html',
        'panda.jpg'
    ];
    event.waitUntil(
        // 请求资源并添加到缓存里面去
        caches.open(CACHE_NAME).then(cache => {
            cache.addAll(cacheResources);
        })
    );
});

this.addEventListener("active", function(event) {
    console.log("service worker is active");
});

this.addEventListener("fetch", function(event) {
    console.log("fetch");
    event.respondWith(
        caches.match(event.request).then(response => {
            // cache hit
            console.warn(response);
            console.warn(event.request.clone());
            // var h1 = document.getElementById("title");
            if (navigator.onLine === false && response) {
                return response;
            }
            return util.fetchPut(event.request.clone());
        })
    );
});

// caches.match(event.request, {ignoreVary: true})

let util = {
    fetchPut: function (request, callback) {
        return fetch(request).then(response => {
            // 跨域的资源直接return
            if (!response || response.status !== 200 || response.type !== "basic") {
                return response;
            }
            util.putCache(request, response.clone());
            typeof callback === "function" && callback();
            return response;
        });
    },
    putCache: function (request, resource) {
        // 后台不要缓存，preview链接也不要缓存
        if (request.method === "GET" && request.url.indexOf("wp-admin") < 0 
              && request.url.indexOf("preview_id") < 0) {
            caches.open(CACHE_NAME).then(cache => {
                cache.put(request, resource);
            });
        }
    }
};