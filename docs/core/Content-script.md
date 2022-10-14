# Content scripts

`Content scripts` 是运行在web 上下文的脚本。

它可以访问页面的 DOM 对象,还可以以通过信息传递 `message passing`的方式与扩展程序进行通讯，可以将它看作是页面与扩展程序之间的桥梁角色。

## Content scripts 可访问API

`Content scripts`可以直接访问以下 chrome API：

- [i18n](https://developer.chrome.com/docs/extensions/reference/i18n/)

- [storage](https://developer.chrome.com/docs/extensions/reference/storage/)

- [runtime](https://developer.chrome.com/docs/extensions/reference/runtime/):

  - [connect](https://developer.chrome.com/docs/extensions/reference/runtime#method-connect)
  - [getManifest](https://developer.chrome.com/docs/extensions/reference/runtime#method-getManifest)
  - [getURL](https://developer.chrome.com/docs/extensions/reference/runtime#method-getURL)
  - [id](https://developer.chrome.com/docs/extensions/reference/runtime#property-id)
  - [onConnect](https://developer.chrome.com/docs/extensions/reference/runtime#event-onConnect)
  - [onMessage](https://developer.chrome.com/docs/extensions/reference/runtime#event-onMessage)
  - [sendMessage](https://developer.chrome.com/docs/extensions/reference/runtime#method-sendMessage)

## 独立运行环境

内容脚本 `content script` 在一个独立的环境中执行（私有作用域），因此页面和扩展程序都**无法**访问内容脚本 `content script` 的变量，可以避免与页面或扩展程序的脚本发生冲突。
注入脚本

## 注入脚本

内容脚本可以静态声明或以编程方式注入

### 静态注入

静态声明的脚本在“content_scripts”字段下的清单中注册。它们可以包括 JavaScript 文件、CSS 文件或两者兼有。所有自动运行的内容脚本都必须指定匹配模式。

```
{
 "name": "My extension",
 ...
 "content_scripts": [
   {
     "matches": ["https://*.nytimes.com/*"],
     "css": ["my-styles.css"],
     "js": ["content-script.js"]
   }
 ],
 ...
}
```

content_scripts 字段中的值的含义
Name                       | Type             | Description         |
| -------------------------- | ---------------- | ----------------- |
| `matches`                  | array of strings | *Required.*       |
| `css`                      | array of strings | *Optional.*       |
| `js`                       | array of strings | *Optional.*       |
| `match_about_blank`        | boolean          | *Optional.*       |
| `match_origin_as_fallback` | boolean          | *Optional.*       |

### 动态注入

动态注入脚本需要对应的主机权限和 `scripting`权限。

主机权限可以通过将它们作为扩展清单的一部分请求来授予（请参阅 host_permissions），也可以通过 activeTab 临时授予。

> 在配置清单 `manifest.json` 的选项 `permissions` 中声明 `activeTab` 权限，可以**临时获取许可，以访问当前激活的标签页**，并在当前页面使用 [tabs 相关的 API](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.chrome.com%2Fdocs%2Fextensions%2Freference%2Ftabs%2F "https://developer.chrome.com/docs/extensions/reference/tabs/")。

> 由于扩展程序的很多使用场景都只需临时访问当前激活的标签页，而不是针对特定的网页，所以与基于 URL 规则获取的永久访问权限相比，该类型的权限更常用。该权限基于用户的主动请求临时获取的（例如通过点击 Action 控件），而且仅限制在当前激活页面，相对而言更安全。

示例：

```
{
  "name": "My extension",
  ...
  "permissions": [
    "activeTab"
  ],
  "background": {
    "service_worker": "background.js"
  }
}
```

background.js:

```
function injectedFunction() {
  document.body.style.backgroundColor = 'orange';
}

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: injectedFunction
  });
});
```

[官方文档](https://developer.chrome.com/docs/extensions/mv3/content_scripts/)

源码参考：
[s]()

## 通信 Message passing

由于内容脚本在网页上下文而不是扩展程序的上下文中运行，因此它们通常需要某种方式与扩展程序的其余部分进行通信。

Chrome 除了提供简单的 API 进行一次性的请求-响应通讯([one-time requests](https://developer.chrome.com/docs/extensions/mv3/messaging/#simple))，也提供复杂的 API 进行长连接通讯([long-lived connections](https://developer.chrome.com/docs/extensions/mv3/messaging/#connect))，还可以基于 ID 进行跨扩展程序的通讯。

### Simple one-time requests

使用[runtime.sendMessage](https://developer.chrome.com/docs/extensions/reference/runtime#method-sendMessage) or [tabs.sendMessage](https://developer.chrome.com/docs/extensions/reference/tabs#method-sendMessage) 进行**单次请求**，这两个方法可以设置回调函数，默认接收返回的响应数据作为参数。
发送消息

```
// content script发送消息

chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
  console.log(response.farewell);
});
// 向content script中发送消息

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
    console.log(response.farewell);
  });
});
```

接收方接收消息

```
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting === "hello")
      sendResponse({farewell: "goodbye"});
  }
);
```

### Long-lived connections

可以使用[runtime.connect](https://developer.chrome.com/docs/extensions/reference/runtime#method-connect) or [tabs.connect](https://developer.chrome.com/docs/extensions/reference/tabs#method-connect) 为内容脚本 content script 和扩展程序之间**建立一个长连接**（可以为信息通道 channel 设置名称，以区别多个通道）。

使用以上方法创建通道后，会返回一个 [`runtime.Port` 端口对象](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.chrome.com%2Fdocs%2Fextensions%2Freference%2Fruntime%2F%23type-Port "https://developer.chrome.com/docs/extensions/reference/runtime/#type-Port")，其中包括了关于信息通道的相关方法和属性，然后就可以通过该通道发送 `portObj.postMessage()` 和接收 `portObj.onMessage.addListener()` 信息。

```
// 在页面脚本 content script 建立长连接的信息通道
let port = chrome.runtime.connect({name: "knockknock"});
// 通过该端口发送信息
port.postMessage({joke: "Knock knock"});
// 设置事件监听器，通过该端口接收信息，将接收到的信息作为入参
port.onMessage.addListener(function(msg) {
  if (msg.question === "Who's there?")
    port.postMessage({answer: "Madame"});
  else if (msg.question === "Madame who?")
    port.postMessage({answer: "Madame... Bovary"});
});
```

类似地，如果在扩展程序中建立长连接发送消息时，使用方法 `chrome.tabs.connect()`，需要指定请求是发送给哪个特定的 tab 标签页。

信息通道是双向的，因此除了发起端创建端口，还需要在接收端使用[runtime.onConnect](https://developer.chrome.com/docs/extensions/reference/runtime#event-onConnect) **响应通道连接请求**（在内容脚本 content script 和扩展程序中一样）。当通道发起端口调用 connect 方法时，接收端的监听器就会调用回调函数，它将相应的 `runtime.Port` 端口对象作为入参，然后可以使用该端口在通道中发送和接收消息，这样通道两端的接口就可以**相互接收和发送信息**了。

```
chrome.runtime.onConnect.addListener(function(port) {
  console.assert(port.name === "knockknock");
  port.onMessage.addListener(function(msg) {
    if (msg.joke === "Knock knock")
      port.postMessage({question: "Who's there?"});
    else if (msg.answer === "Madame")
      port.postMessage({question: "Madame who?"});
    else if (msg.answer === "Madame... Bovary")
      port.postMessage({question: "I don't get it."});
  });
});
```
