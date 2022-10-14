# 架构概述

扩展程序依其功能的不同，项目的结构和所包含的文件类型也不同，但是它们一般都由以下部分构成：

- Manifest：每一个扩展程序都必须有一个配置清单 `manifest.json` 文档，在其中清楚地包含该扩展程序的相关信息和所需使用的权限。

- Service worker：`Service worker`是扩展的事件处理程序；它包含对浏览器事件的侦听器。
  它处于休眠状态，直到触发事件然后执行指示的逻辑；它仅在需要时加载并在空闲时卸载。`Service Worker` 可以访问所有 [Chrome API](https://developer.chrome.com/docs/extensions/reference/)，只要它在 manifest.json 中声明了所需的权限

- Content Script：内容脚本，它可以植入页面，一般用于读取页面内容，或向页面插入内容。
- UI element
ui 包括:  [Action badge](https://developer.chrome.com/docs/extensions/mv3/user_interface/#badge)
 、 [Popup](https://developer.chrome.com/docs/extensions/mv3/user_interface/#popup)
、  [Tooltip](https://developer.chrome.com/docs/extensions/mv3/user_interface/#tooltip)
、[Click Event](https://developer.chrome.com/docs/extensions/mv3/user_interface/#click)
、   [Omnibox](https://developer.chrome.com/docs/extensions/mv3/user_interface/#omnibox)
、   [Context menu](https://developer.chrome.com/docs/extensions/mv3/user_interface/#context_menu)
、   [Commands](https://developer.chrome.com/docs/extensions/mv3/user_interface/#commands)
、   [Override pages](https://developer.chrome.com/docs/extensions/mv3/user_interface/#override)
、   [Notifications](https://developer.chrome.com/docs/extensions/mv3/user_interface/#notifications)
