# Bookmarks

使用 chrome.bookmarks 能够创建、组织和操作书签，能够自定义操作书签的页面。

## 权限申请

如果要使用 chrome.bookmarks 需要在 manifest 的 permissions 中增加 bookmarks 权限申请。

```JSON
  "permissions": ["tabs", "bookmarks", "storage"]
```

## 书签组织形式

书签以树形式组织，树中的每个节点都是书签或文件夹（有时称为组）。

树中的每个节点都由 bookmarks.BookmarkTreeNode 对象表示。

整个 chrome.bookmarks API 都是使用 BookmarkTreeNode 属性。例如，当调用 bookmarks.create 时，传入新节点的父节点（parentId），并且可以选择传入节点的索引、标题和 URL 属性。

注意：无法使用 chrome.bookmarks API 添加或删除根文件夹中的条目。无法重命名、移动或删除特殊的 “书签栏” 和 “其他” 文件夹。

## 方法示例

1. chrome.bookmarks.getTree(function callback)
获取整个书签栏的树

```JS
btn1.onclick = () => {
    chrome.bookmarks.getTree((res) => {
        console.log(res);
    })
};
```

2. chrome.bookmarks.getSubTree(string id, function callback)
获取某个节点的子树

```JS
btn2.onclick = () => {
    chrome.bookmarks.getSubTree(tree[0].children[0].children[0].id, (res) => {
        console.log(res);
    })
};
```

3. chrome.bookmarks.get(string or array of string idOrIdList, function callback)
获取节点信息

需要注意的是，无论是什么 get 方法，每次都是返回一个 Array 类型，即使请求的是节点，返回的也是 Array

```JS
btn3.onclick = () => {
    chrome.bookmarks.get("5", (res) => {
        console.log(res);
    })
};
```

4. chrome.bookmarks.getChildren(string id, function callback)
获取所有的子节点

```JS
btn4.onclick = () => {
    chrome.bookmarks.getChildren("5", (res) => {
        console.log(res);
    })
};
```

5. chrome.bookmarks.getRecent(integer numberOfItems, function callback)
获取最近的书签

```JS
btn5.onclick = () => {
    chrome.bookmarks.getRecent(5, (res) => {
        console.log(res);
    })
};
```

6. chrome.bookmarks.search(string or object query, function callback)
搜索书签

```JS
<div class="col-md-12">
  <textarea id="textarea" cols="30" rows="1">postbird</textarea>
  <button id="btn6" class="btn btn-primary">search</button>
</div>
btn6.onclick = () => {
    const value = document.querySelector('#textarea').value;
    chrome.bookmarks.search(value, (res) => {
        console.log(res);
    })
};
```

7. chrome.bookmarks.create(object bookmark, function callback)
创建一个书签，在指定的 parentId 下创建书签或文件夹。如果 url 为N ULL 或没有该字段，会创建一个文件夹。

```JS
btn7.onclick = () => {
    const title = document.querySelector('#title').value;
    const url = document.querySelector('#url').value;
    const obj = {
        parentId: '5',
        title,
        url,
    }
    chrome.bookmarks.create(obj, (res) => {
        console.log(res);
    })
};
```

8. chrome.bookmarks.move(string id, object destination, function callback)
移动书签，注意不能移动到 0 这个 root 节点中，因为不允许任何修改 root 节点的行为

```JS
btn8.onclick = () => {
    const dest = {
        parentId: '1'
    }
    chrome.bookmarks.move('48', dest, (res) => {
        console.log(res);
    })
};
```

9. chrome.bookmarks.update(string id, object changes, function callback)
更新书签或文件夹的属性。仅指定要更改的属性; 未指定的属性将保持不变。注意：**目前，仅支持 title 和 url。

```JS
btn9.onclick = () => {
    const title = document.querySelector('#titleUpdate').value;
    const url = document.querySelector('#urlUpdate').value;
    const obj = {
        title,
        url,
    }
    chrome.bookmarks.update('48', obj, (res) => {
        console.log(res);
    })
};
```

10. chrome.bookmarks.remove(string id, function callback)
删除书签或空书签文件夹。

```JS
chrome.bookmarks.remove('48', (res) => {
        console.log(res);
    })
```

11、chrome.bookmarks.removeTree(string id, function callback)
删除整个书签树

```JS
chrome.bookmarks.removeTree('5', (res) => {
        console.log(res);
    })
```
