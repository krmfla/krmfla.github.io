# Manifest

<br />

html 中加上 .manifest
```html
<html manifest="offline.manifest">
```

<br />

## manifest

FILENAME.manifest 格式
```
CACHE MANIFEST
#2018-05-02 v1.0.1

# Explicitly cached 'master entries'.
CACHE:
index.html
panda.jpg

# Resources that require the user to be online.
NETWORK:
*
# * = All other resources (e.g. sites) require the user to be online.

FALLBACK:
/other 404.html
```

CACHE 區的檔案會被暫存

NETWORK 區的資料都從 server 取得

FALLBACK 當進到 /other 失敗時，會導向 404.html

<br />

## 檔案更新

檔案內容有修改時，manifest 也需更新，否則會用 cache 檔案

可在 manifest 檔中，將修改的檔案加上版本號，如：
```
index.html?v=1
```
**real time 的更新方式**

```javascript
var appCache = window.applicationCache;

appCache.update(); // Attempt to update the user's cache.

...

if (appCache.status == window.applicationCache.UPDATEREADY) {
  appCache.swapCache();  // The fetch was successful, swap in the new cache.
}
```

<br />

## 清除暫存檔的方式

删除 manifest 文件，并且删除 html 的 manifest 屬性

再次進入時，就會載最新内容

<br />

### Reference

http://louiszhai.github.io/2016/11/25/manifest/

应用缓存初级使用指南

https://www.html5rocks.com/zh/tutorials/appcache/beginner/
