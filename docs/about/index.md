# Chrome extensions 概况

## 什么是 Chrome extensions

浏览器扩展程序 extensions 是一个小型的程序，它可以使用[浏览器提供的 API](https://developer.chrome.com/docs/extensions/reference/) 和 web 技术以增强浏览器功能。它们让用户可以通过多种方式定制 Chrome 的功能和行为，例如生产力工具、信息聚合、 丰富网页内容等

官方说明：
> Extensions are made of different, but cohesive, components. Components can include [background scripts](https://developer.chrome.com/docs/extensions/mv3/background_pages/), [content scripts](https://developer.chrome.com/docs/extensions/mv3/content_scripts/), an [options page](https://developer.chrome.com/docs/extensions/mv3/options/), [UI elements](https://developer.chrome.com/docs/extensions/mv3/user_interface/) and various logic files. Extension components are created with web development technologies: HTML, CSS, and JavaScript.
扩展由不同但有凝聚力的组件组成。组件可以包括背景脚本、内容脚本、选项页面、UI 元素和各种逻辑文件。扩展组件是使用 Web 开发技术创建的：HTML、CSS 和 JavaScript。

Chrome插件官方称为Chrome扩展(`Chrome Extension`)，真正意义上的Chrome插件是更底层的浏览器功能扩展。本文遵循官方文档，称为Chrome扩展。

## Chrome extensions 能干什么

增强浏览器功能，轻松实现属于自己的“定制版”浏览器。

参考官方文档：[Extension development overview](https://developer.chrome.com/docs/extensions/mv3/devguide/)
Chrome插件提供了很多实用API供我们使用，包括但不限于：

* 书签控制；
* 自定义扩展用户界面
* 下载控制；
* 窗口控制；
* 标签控制；
* 网络请求控制，各类事件监听；
* 自定义原生菜单；
* 完善的通信机制；

请访问[Chrome 应用商店](https://chrome.google.com/webstore/category/extensions)查看已发布扩展程序示例。

![截屏2022-09-28 15.09.13.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/314e0a29e5084fbb9245ad68892da313~tplv-k3u1fbpfcp-watermark.image?)
