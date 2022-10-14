# Service Workers

在 `Manifest V2` 版本中，后台页面 `background pages` 是扩展程序中的一个独立页面，一般设置事件监听，以响应用户的操作，但是它会长期驻留后台影响性能。

## Service Workers 特点

在 Manifest V3 版本中，后台脚本迁移到 `Service Workers` 中运行以提供性能，其中有两个特点：

- `Service Workers` 在执行事件处理函数后终止，并在新的事件触发下重新运行

- 它是一种 [JavaScript Worker](https://link.juejin.cn?target=https%3A%2F%2Fwww.html5rocks.com%2Fen%2Ftutorials%2Fworkers%2Fbasics%2F "https://www.html5rocks.com/en/tutorials/workers/basics/")，**无法直接访问 DOM**。

💡 [Service Worker](https://link.juejin.cn?target=https%3A%2F%2Fdevelopers.google.com%2Fweb%2Ffundamentals%2Fprimers%2Fservice-workers%2F "https://developers.google.com/web/fundamentals/primers/service-workers/") 是浏览器**完全独立于网页运行**的脚本。除了以上的特点，还要注意以下的相关事项：

- 它是一种可编程网络代理，让您能够控制页面所发送网络请求的处理方式。

- 它广泛地利用了 promise 进行异步操作。

如果需要使用 `service workers` 时需要在配置清单 `manifest.json` 的选项 `background.service_worker` 中声明注册，属性值指定需要执行的一个 JavaScript 文档的路径（它必须在项目的根目录下）

```json
{
  "name": "Awesome Test Extension",
  ...
  "background": {
    "service_worker": "background.js",
    "type": "module" // 
  },
  ...
}
```

## Service Workers注意事项

1. 事件注册在`Service Workers`脚本的顶层

```Javascript
// background.js
chrome.storage.local.get(["badgeText"], ({ badgeText }) => {
  chrome.action.setBadgeText({ text: badgeText });
  
  chrome.action.onClicked.addListener(handleActionClick);
});

// true
chrome.action.onClicked.addListener(handleActionClick);

```

2. `Service Workers` 基于监听事件-响应模型来执行。是 `short-lived`，有别于`long-lived`
在Manifest V2中：

```Javascript
let savedName = undefined;

chrome.runtime.onMessage.addListener(({ type, name }) => {
  if (type === "set-name") {
    savedName = name;
  }
});

chrome.browserAction.onClicked.addListener((tab) => {
  chrome.tabs.sendMessage(tab.id, { name: savedName });
});
```

在Manifest V3中实现此功能，需要借助[Storage APIs](https://developer.chrome.com/docs/extensions/reference/storage/)

```Javascript
// background.js
chrome.runtime.onMessage.addListener(({ type, name }) => {
  if (type === "set-name") {
    chrome.storage.local.set({ name });
  }
});

chrome.action.onClicked.addListener((tab) => {
  chrome.storage.local.get(["name"], ({ name }) => {
    chrome.tabs.sendMessage(tab.id, { name });
  });
});
```

3. 在 Service Workers 中不能使用`setTimeout` or `setInterval`，这些 API 在`Service Workers` 中可能会失败，因为调度程序将在`Service Workers`终止时取消计时器

```Javascript
// background.js

// This worked in Manifest V2.
const TIMEOUT = 3 * 60 * 1000; // 3 minutes in milliseconds
setTimeout(() => {
  chrome.action.setIcon({
    path: getRandomIconPath(),
  });
}, TIMEOUT);
```

需要使用[Alarms API](https://developer.chrome.com/docs/extensions/reference/alarms/)

```Javascript
// background.js
chrome.alarms.create({ delayInMinutes: 3 });

chrome.alarms.onAlarm.addListener(() => {
  chrome.action.setIcon({
    path: getRandomIconPath(),
  });
});
```

4. 无权访问 DOM。`Service Worker` 不再提供 XMLHttpRequest，而是支持更现代的 `fetch()`。
