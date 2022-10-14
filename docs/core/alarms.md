# chrome.alarms

使用 chrome.alarms API 使代码定期运行或在未来的指定时间运行。

要使用chrome.alarms.* API，首先需要在manifest.json文件中声明alarms授权如下：

```Json
{
    "permissions": [
        "alarms"
    ],
}
```

## Alarm 类型

`chrome.alarms.create()`方法可以创建一个`alarm`,Alarm包含以下字段：

- `name` ( string ) 该定时器的名称。
- `scheduledTime`
该定时器计划的触发时间。由于性能原因，定时器可能会延迟至该时间后的任意时间。
- `periodInMinutes` ( optional )
如果不是 null 的话，该定时器会重复触发，每隔 periodInMinutes 分钟触发。

## chrome.alarms 方法

`chrome.alarms` API中的常用方法：

- 创建一个`alarm`

```Javascript
chrome.alarms.create(
  name?: string,
  alarmInfo: AlarmCreateInfo,
)
```

`AlarmCreateInfo` 类型说明：

1. `delayInMinutes`: onAlarm 事件应该触发的时间长度（以分钟为单位）
2. `periodInMinutes`: 指定重复触发的时间间隔，如果未设置，则警报只会触发一次。
3. `when`: 警报应该触发的时间，以历元过去的毫秒数为单位（例如 Date.now() + n）

- 获取指定名字的alarm

```Javascript
chrome.alarms.get(
  name?: string,
  callback?: function,
)
```

- 获取所有alarm

```Javascript
chrome.alarms.getAll(  
  callback?: function,  
)
```

- 通过名字删除alarm

```Javascript
chrome.alarms.clear(  
  name?: string,  
  callback?: function,  
)
```

- 清除所有alarm

```Javascript
chrome.alarms.clearAll(
  callback?: function,
)
```

监听alarm发生的事件，用于event page

```Javascript
chrome.alarms.onAlarm.addListener(  
  callback: function,  
)
```

回调函数中的alarm就是触发事件的alarm对象。