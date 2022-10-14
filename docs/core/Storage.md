# Storage

该 API 已经过优化以满足扩展的特定存储需求。它提供与 localStorage API 相同的存储功能，但主要区别如下:

- 使用 `chrome.storage.sync` 相关方法，就可以利用 Chrome 的**同步**功能，实现同一账户下的扩展程序数据在多个设备之间同步
- 批量的读取和写入数据操作是**异步执行**的，因此与 localStorage 引起的阻塞和串行相比操作更快
- 存储的**数据类型可以是对象**，而 localStorage 只允许存储字符串

## 使用

先声明权限

```Json
{
  "name": "My extension",
  ...
  "permissions": [
    "storage"
  ],
  ...
}
```

## sync 同步存储

```Javascript
chrome.storage.sync.set({key: value}, function() {
  console.log('Value is set to ' + value);
});

chrome.storage.sync.get(['key'], function(result) {
  console.log('Value currently is ' + result.key);
});
```

## 本地存储

```Javascript
chrome.storage.local.set({key: value}, function() {
  console.log('Value is set to ' + value);
});

chrome.storage.local.get(['key'], function(result) {
  console.log('Value currently is ' + result.key);
});
```

## 参考

[Storage API 参考](https://developer.chrome.com/docs/extensions/reference/storage/#property-sync)
