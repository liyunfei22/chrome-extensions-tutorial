
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
// 监听onAlarm事件
chrome.alarms.onAlarm.addListener(() => {
  chrome.action.setBadgeText({ text: '' });
  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'popup/stay_hydrated.png',
    title: '温馨提示',
    message: '太累了就休息会儿吧',
    buttons: [
      { title: '好的' }
    ],
    priority: 0
  }, function (notificationId) {
    console.log('sss', notificationId)
  });
});
// 监听onButtonClicked事件
chrome.notifications.onButtonClicked.addListener(async () => {
  const item = await chrome.storage.sync.get(['minutes']);
  chrome.action.setBadgeText({ text: 'ON' });
  chrome.alarms.create({ delayInMinutes: item.minutes });
});
// 监听omnibox onInputEntered 事件
chrome.omnibox.onInputEntered.addListener(function(text) {
  const newURL = 'https://www.google.com/search?q=' + encodeURIComponent(text);
  chrome.tabs.create({ url: newURL });
});
// 侦听 runtime.onInstalled 事件以在安装时初始化扩展
// 设置contextMenus
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'go',
    title: "google 搜索: %s",
    type: 'normal',
    contexts: ['selection'],
  });
});
// 监听事件
chrome.contextMenus.onClicked.addListener(function (item, tab) {
  let url = 'https://google.com/search?q=' + encodeURIComponent(item.selectionText);
  chrome.tabs.create({url: url, index: tab.index + 1});
});
// 监听快命令
chrome.commands.onCommand.addListener(command => {
  console.log(command)
  if (command === 'go-google') {
    chrome.tabs.create({ url: "https://www.google.com" });
  } else {
    chrome.tabs.create({ url: "https://www.baidu.com" });
  }
});
