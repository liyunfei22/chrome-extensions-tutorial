# API 概览

`Chrome`为扩展提供了许多特殊用途的 API，例如 `chrome.runtime` 和 `chrome.alarms`。
可以通过[API 参考](https://developer.chrome.com/docs/extensions/reference/)查看Chrom extension提供的api

## API 声明权限

要使用 chrome.* API，您的扩展程序必须在[manifest](https://developer.chrome.com/docs/extensions/mv3/manifest/)的权限字段中声明。
扩展可以请求三类权限：

- **`permissions`** 如 [Storage](https://developer.chrome.com/docs/extensions/reference/storage/)
- **`optional_permissions`** 可选的权限
- **`host_permissions`** 主机权限
实例：

```
"permissions": [
  "tabs",
  "bookmarks",
  "unlimitedStorage"
],
"optional_permissions": [
  "unlimitedStorage"
],
"host_permissions": [
  "http://www.blogger.com/",
  "http://*.google.com/"
],
```

可通过[权限列表](https://developer.chrome.com/docs/extensions/mv3/declare_permissions/)查看哪些api需要注册权限