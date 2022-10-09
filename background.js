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
// 监听message 并设置徽章
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
  if (request.greeting === "hello") {
   
    chrome.storage.local.get(['count'], function (result) {
      const count = result.count;
      if (count) {
        const nextCount = count + 1
        // text 为 string
        chrome.action.setBadgeText({ text: String(nextCount) });
        chrome.action.setBadgeBackgroundColor(
          {color: [0, 255, 0, 0]},
        );
        // 设置storage
        chrome.storage.local.set({ count: nextCount })
      } else {
        chrome.storage.local.set({ count: 1 });
        chrome.action.setBadgeText({ text: '1' });
        chrome.action.setBadgeBackgroundColor(
          {color: [0, 255, 0, 0]},  // Green
        );
      }
    })
    sendResponse({farewell: "goodbye"});
  }
})