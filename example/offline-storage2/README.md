# Offline Storage 2

## manifest

FILENAME.manifest 格式
```
CACHE MANIFEST
# v1.0.0
content.css

NETWORK:
app.js

FALLBACK:
/other 404.html
```

CACHE MANIFEST 後的檔案會被暫存

NETWORK 區的資料都從 server 取得

FALLBACK 當進到 /other 失敗時，會導向 404.html

<br />

## 檔案更新

檔案內容有修改時，manifest 也需更新，否則會用 cache 檔案

用 js 更新, `window.applicationCache.update()`

<br />

## 清除暫存檔的方式

删除 manifest 文件，并且删除 html 的 manifest 屬性

再次進入時，就會載最新内容
