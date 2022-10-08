// 侦听 runtime.onInstalled 事件以在安装时初始化扩展
chrome.runtime.onInstalled.addListener(async () => {
  console.log('ss')
  chrome.contextMenus.create({
    "id": "sampleContextMenus",
    "title": "Sample Context Menu",
    "contexts": ["selection"],
  });
});
// 侦听器必须从页面开始同步注册。
// 监听创建书签的event
chrome.bookmarks.onCreated.addListener(() => {
  // do something
  console.log('make a bookmarks')
});

// 注入脚本
function injectedFunction() {
  console.log('ssss')
  document.body.style.backgroundColor = 'orange';
}
// 改变颜色
chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: injectedFunction
  });
});