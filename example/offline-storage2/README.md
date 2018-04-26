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
