# UI

与 Chrome 的用户界面 (UI) 一样，`extension` UI 应该是有目的的和最小的。`extension`允许用户自定义或增强用户的浏览体验，而不会分散注意力。

## action

[Action API](https://developer.chrome.com/docs/extensions/reference/action/) 控制`extension`的操作（工具栏图标）。它可以在单击时打开一个[popup](https://developer.chrome.com/docs/extensions/mv3/user_interface/#popup)或当点击的时候触发某些功能。
![截屏2022-10-13 10.59.01.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/be95d237c86448d5b25c58f3935aa2ca~tplv-k3u1fbpfcp-watermark.image?)
要使用 [Action API](https://developer.chrome.com/docs/extensions/reference/action/)，[manifest](https://developer.chrome.com/docs/extensions/mv3/manifest/)必须包含一个“action”键。

```Json
{
  "name": "My Awesome action MV3 Extension",
  ...
  "action": {
    ...
  }
  ...
}
```

通过default_icon 字段设置extension 位于工具栏右侧 的icon。可以设置多个尺寸的图片

```Json
{
  "name": "My Awesome Extension",
  ...
  "action": {
    "default_icon": {
      "16": "extension_toolbar_icon16.png",
      "32": "extension_toolbar_icon32.png"
    }
  }
  ...
}
```

## icons

可以通过manifest 中的`icons`字段设置工具栏以外的其他icon

```Json
 "icons": {
    "16": "extension_icon16.png",
    "32": "extension_icon32.png",
    "48": "extension_icon48.png",
    "128": "extension_icon128.png"
  }
```

|Icon Size | Icon Use  |
| --------- | ----------------------------------|
| 16x16     | extension pages 和上下问菜单中的icon |
| 32x32     |Windows 计算机通常需要这种尺寸|
| 48x48     | extension 管理页面中展示|
| 128x128   |Chrome Web Store 展示 |

## 其他用户界面功能

### Action badge

`Action badge` 在操作图标顶部显示彩色`banner`

![截屏2022-10-13 11.33.23.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4407248d3872419f8a775bd4f2056603~tplv-k3u1fbpfcp-watermark.image?)

可以使用以下api设置：

```Javascript
chrome.action.setBadgeText({text: '14'});
chrome.action.setBadgeBackgroundColor({color: '#4688F1'});
```

### Popup

Popup是HTML文件，当点击action icon时可以展示该页面。

它可以包含样式表和脚本标签的链接，但不允许内联 JavaScript。
popup在“action”键下的清单中注册

```Json
{
  "name": "Drink Water Event",
  ...
  "action": {
    "default_popup": "popup.html"
  }
  ...
}
```

也可以通过[`action.setPopup`](https://developer.chrome.com/docs/extensions/reference/action#method-setPopup) 动态设置

```Javascript
chrome.storage.local.get('signed_in', (data) => {
  if (data.signed_in) {
    chrome.action.setPopup({popup: 'popup.html'});
  } else {
    chrome.action.setPopup({popup: 'popup_sign_in.html'});
  }
});
```

### Tooltip

将鼠标悬停在操作图标上时，使用`Tooltip`向用户提供简短描述或说明。

![截屏2022-10-13 11.52.28.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a50a867a26214ebd83057ad3db20f1a6~tplv-k3u1fbpfcp-watermark.image?)

```Json
{
  "name": "Tab Flipper",
  ...
  "action": {
    "default_title": "学习chrome extension 演示demo"
  }
...
}
```

### Click Event

通过 `action.onClicked.addListener`给action注册点击事件，但是如果设置了popup不会生效

```JS
chrome.action.onClicked.addListener(function(tab) {
  chrome.action.setTitle({tabId: tab.id, title: "You are on tab:" + tab.id});
});
```

### Omnibox

```json
{
  "name": "Omnibox New Tab Search",
  ...
  "omnibox": { "keyword" : "nt" },
  "default_icon": {
    "16": "newtab_search16.png",
    "32": "newtab_search32.png"
  }
  ...
}
```

### Context menu

可以使用[ContextMenus API](https://developer.chrome.com/docs/extensions/reference/contextMenus/) 设置 Context menu。
现在manifest中注册 `contextMenus`权限

```json
{
  "permissions": [
    "contextMenus",
  ]
}
```

通过[`contextMenus.create()`](https://developer.chrome.com/docs/extensions/reference/contextMenus#method-create)创建 Context menu。通常在`runtime.onInstalled` 的回调函数中完成

```js
chrome.runtime.onInstalled.addListener(async () => {
  for (let [tld, locale] of Object.entries(tldLocales)) {
    chrome.contextMenus.create({
      id: tld,
      title: locale,
      type: 'normal',
      contexts: ['selection'],
    });
  }
});
```

### Commands

扩展可以定义特定的 Commands API 并将它们绑定到一个组合键。在“commands”键下的清单中注册一个或多个快捷方式

```js
{
   "commands": {
    "go-google": {
      "suggested_key": {
        "default": "Ctrl+Shift+L",
        "mac": "Command+Shift+L"
      },
      "description": "谷歌"
    },
    "go-baidu": {
      "suggested_key": {
        "default": "Ctrl+Shift+P",
        "mac": "Command+Shift+P"
      },
      "description": "百度"
    }
  }
}
```

然后在 service worker中通过进行事件监听：

```js
chrome.commands.onCommand.addListener(command => {
  if (command === 'go-google') {
    chrome.tabs.create({ url: "https://www.google.com" });
  } else {
    chrome.tabs.create({ url: "https://www.baidu.com" });
  }
});

```

参考：<https://developer.chrome.com/docs/extensions/reference/commands/>

### Override pages

extension 允许用户通过`Override pages`历替换史记录、新选项卡或书签页面，
像popup一样，但不允许内联 JavaScript。

在manifest`chrome_url_overrides`字段中注册覆盖页面,只能注册一个页面

```JSON
{
  "name": "Awesome Override Extension",
  ...

  "chrome_url_overrides" : {
    "newtab": "override_page.html"，
    // "history": "history.html"
  },
  ...
}
```

### Notifications

您可以通过直接在系统托盘中显示通知来向用户传达相关信息
需要先注册 notifications 权限：

```json
// manifest.json
{ 
  "name": "Drink Water Event Popup",
...
  "permissions": [
    "alarms",
    "notifications",
    "storage"
  ],
 ...
}
```

调用`notifications.create`发送通知：

```js
 chrome.notifications.create({
    type: 'basic',
    iconUrl: 'popup/stay_hydrated.png',
    title: '温馨提示',
    message: '太累了就休息会儿吧',
    buttons: [
      { title: '好的' }
    ],
    priority: 0
  });
```
