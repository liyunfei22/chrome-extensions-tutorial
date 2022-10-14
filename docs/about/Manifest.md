# Manifest V3

每一个扩展程序都需要有一个**配置清单 `manifest.json` 文档**，它提供了关于扩展程序的基本信息，例如所需的权限、名称、版本等。

**当前配置清单类型最新的版本是 Manifest V3**，遵循该配置清单版本的扩展程序会更注重安全和用户的隐私保护，在性能方面也会得到提升，同时开发简易性和功能实现也会更佳。

从 **Chrome 88 版本**开始支援配置清单为 Manifest V3 版本的扩展程序，Chrome 网上应用店从 2021 年 1 月开始支持分发配置清单为 Manifest V3 版本的扩展程序。

![截屏2022-09-29 14.20.06.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8282125057134899932c7bf49c27fc9f~tplv-k3u1fbpfcp-watermark.image?)

其中，`manifest_version`、`name`、`version`3个是必不可少的，`description`和`icons`是推荐的。

[Manifest file format](https://developer.chrome.com/docs/extensions/mv3/manifest/)。

```json
{
  // Required
  "manifest_version": 3,
  "name": "My Extension",
  "version": "versionString",

  // Recommended
  "action": {...},
  "default_locale": "en",
  "description": "A plain text description",
  "icons": {...},

  // Optional
  "author": ...,
  "automation": ...,
  "background": {
    // Required
    "service_worker": "background.js",
    // Optional
    "type": ...
  },
  "chrome_settings_overrides": {...},
  "chrome_url_overrides": {...},
  "commands": {...},
  "content_capabilities": ...,
  "content_scripts": [{...}],
  "content_security_policy": {...},
  "converted_from_user_script": ...,
  "cross_origin_embedder_policy": {"value": "require-corp"},
  "cross_origin_opener_policy": {"value": "same-origin"},
  "current_locale": ...,
  "declarative_net_request": ...,
  "devtools_page": "devtools.html",
  "differential_fingerprint": ...,
  "event_rules": [{...}],
  "externally_connectable": {
    "matches": ["*://*.example.com/*"]
  },
  "file_browser_handlers": [...],
  "file_system_provider_capabilities": {
    "configurable": true,
    "multiple_mounts": true,
    "source": "network"
  },
  "homepage_url": "https://path/to/homepage",
  "host_permissions": [...],
  "import": [{"id": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"}],
  "incognito": "spanning, split, or not_allowed",
  "input_components": ...,
  "key": "publicKey",
  "minimum_chrome_version": "versionString",
  "nacl_modules": [...],
  "natively_connectable": ...,
  "oauth2": ...,
  "offline_enabled": true,
  "omnibox": {
    "keyword": "aString"
  },
  "optional_host_permissions": ["..."],
  "optional_permissions": ["tabs"],
  "options_page": "options.html",
  "options_ui": {
    "page": "options.html"
  },
  "permissions": ["tabs"],
  "platforms": ...,
  "replacement_web_app": ...,
  "requirements": {...},
  "sandbox": [...],
  "short_name": "Short Name",
  "storage": {
    "managed_schema": "schema.json"
  },
  "system_indicator": ...,
  "tts_engine": {...},
  "update_url": "https://path/to/updateInfo.xml",
  "version_name": "aString",
  "web_accessible_resources": [...]
}
```