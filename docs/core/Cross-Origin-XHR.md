# Cross-origin XMLHttpRequest

常规网页可以使用 XMLHttpRequest 对象从远程服务器发送和接收数据，但它们受到同源策略的限制。

`content script`以植入网页的方式运行，因此`content script`本也受制于相同的源策略。
而扩展程序的后台脚本 `background scripts` 就不受此限制，只需要在 `host_permissions` 中声明后就可以访问相应的远程服务器；

如果是通过 `fetch()` 的方式获取扩展程序内部的静态资源，则不需要声明权限。

通过将主机或主机匹配模式（或两者）添加到清单文件的 host_permissions 部分，扩展可以请求访问其源之外的远程服务器。

## 声明主机权限

```Javascript
{
  "name": "My extension",
  ...
  "host_permissions": [
    "https://www.google.com/"
  ],
  ...
}
```

## 发送跨域请求

由于内容脚本 `content scripts` 受到同源政策的限制，可以通过信息传递 `message passing` 借助扩展程序来 fetch 相应的服务器获取数据。

sendMessage 与后台脚本通信

```Javascript
chrome.runtime.sendMessage(
    {contentScriptQuery: 'queryPrice', itemId: 12345},
    price => ...);
```

后台脚本进行事件监听

```Javascript
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.contentScriptQuery == 'queryPrice') {
        var url = 'https://www.google.com/?itemId=' +
            encodeURIComponent(request.itemId);
        fetch(url)
            .then(response => response.text())
            .then(text => parsePrice(text))
            .then(price => sendResponse(price))
            .catch(error => ...)
        return true;  // Will respond asynchronously.
      }
    });
```
