# History

使用 chrome.history API可以操作浏览器访问过的页面记录。

可以在浏览器的历史记录中添加，删除和查询URL

## 权限申请

```JSON
 "permissions": ["history"]
 ```

## 方法使用

1. chrome.history.search(object query, function callback)
在历史记录中搜索与查询匹配的每个页面的上次访问记录

注意 query 参数，text 字段是必不可少的，但是 text 可以留空，相当于一个 keyword

```js
    const query = {
        text: ''
    };
    chrome.history.search(query, (res) => {
        console.log(res);
    })
```

2. chrome.history.getVisits(object details, function callback)
检索某个 URL 的访问信息

```Javascript
const details = {
    url: 'http://ptbird.cn'
};
chrome.history.getVisits(details, (res) => {
    const arr = res.slice(0,3).map((item) => {
        return item
    });
    let htm = '';
    arr.forEach(element => {
        htm += `<p>transition: ${element.transition}</p>`;
    });
    document.querySelector('#scroll').innerHTML = htm;
})
```

3. chrome.history.addUrl(object details, function callback)
使用 transition type link 向历史记录中添加一条记录

```Javascript
const details = {
    url: 'http://ptbird.cn/chrome_extensions_aaa_2-s_as'
};
chrome.history.addUrl(details, (res) => {
    console.log(res);
})
```

4. chrome.history.deleteUrl(object details, function callback)
从历史记录中删除所有出现的给定URL

```Javascript
const details = {
    url: 'http://ptbird.cn/chrome_extensions_aaa_2-s_as'
};
chrome.history.deleteUrl(details, (res) => {
    console.log(res);
})
```

5. chrome.history.deleteRange(object range, function callback)
从历史记录中删除指定日期范围内的所有项目。除非所有访问都在此范围内，否则页面不会从历史记录中删除。

```Javascript
const startTime = Date.now() - 50000;
const endTime = Date.now();
const query = {
    startTime,
    endTime
};
chrome.history.deleteRange(query, (res) => {
    console.log(res);
})
```Javascript
6、chrome.history.deleteAll(function callback)
删除历史记录中的所有项目。
```Javascript
chrome.history.deleteAll((res) => {
       console.log(res);
    })
```
