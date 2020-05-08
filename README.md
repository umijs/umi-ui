# Umi UI

**[Umi](https://github.com/umijs/umi) 研发工作台**，集成一系列可视化辅助编程（VAP）插件，帮助开发者更快更好地开发 Umi 项目。

![https://user-images.githubusercontent.com/13595509/73431180-c77ab400-437a-11ea-9baa-ebd00109b1d0.png](https://user-images.githubusercontent.com/13595509/73431180-c77ab400-437a-11ea-9baa-ebd00109b1d0.png)

**用于 umi@3 项目**

## 🎬 快速开始

第一步，先在项目中安装 `@umijs/preset-ui`

```sh
$ yarn add @umijs/preset-ui -D
```

开始使用：

```bash
# in umi project root path
- $ umi dev
```

## ✨ 主要功能

### 任务

命令可视化展示

![https://camo.githubusercontent.com/9352fc593eb35e8cde6162b8a333d32d2a3c3197/68747470733a2f2f63646e2e6e6c61726b2e636f6d2f79757175652f302f323031392f6769662f38363032352f313537303638373036313932302d36663239623636342d346335382d343335312d383933622d6234333035333334316366352e676966](https://camo.githubusercontent.com/9352fc593eb35e8cde6162b8a333d32d2a3c3197/68747470733a2f2f63646e2e6e6c61726b2e636f6d2f79757175652f302f323031392f6769662f38363032352f313537303638373036313932302d36663239623636342d346335382d343335312d383933622d6234333035333334316366352e676966)

### 资产

页面中插入区块

![https://camo.githubusercontent.com/b8218fb0de21a567f474c0bb4e4a9d8dd96257ca/68747470733a2f2f63646e2e6e6c61726b2e636f6d2f79757175652f302f323031392f6769662f38363032352f313537343134353634323731322d34656638663065302d623833352d343633382d616336382d3732336163303736393533352e676966](https://camo.githubusercontent.com/b8218fb0de21a567f474c0bb4e4a9d8dd96257ca/68747470733a2f2f63646e2e6e6c61726b2e636f6d2f79757175652f302f323031392f6769662f38363032352f313537343134353634323731322d34656638663065302d623833352d343633382d616336382d3732336163303736393533352e676966)

指定页面中可插入区块位置

```tsx
import React from 'react';
import { UmiUIFlag } from 'umi';

import { Button } from 'antd';

export default () => (
  <div>Hello
    <div>
      <p>World</p>
      <UmiUIFlag />
      <p>
        aaaaa
        <div>
          <UmiUIFlag inline />Hello Inline<UmiUIFlag inline />
        </div>
      </p>
    </div>
    <Button type="primary">World</Button>
  </div>
)
```

![https://user-images.githubusercontent.com/13595509/73427305-731f0680-4371-11ea-83de-1f19a99c32cd.png](https://user-images.githubusercontent.com/13595509/73427305-731f0680-4371-11ea-83de-1f19a99c32cd.png)

### 从页面打开资产

![gif](https://user-images.githubusercontent.com/13595509/76141271-8ffbd780-609d-11ea-8a28-e9ac6c77552d.gif)

```js
window.postMessage(
  JSON.stringify({
    action: 'umi.ui.block.addTemplate',
    // 只需要 4 个参数
    payload:  {
      name: '分析页',
      key: "DashboardAnalysis",
      url: "https://github.com/ant-design/pro-blocks/tree/master/DashboardAnalysis",
      path: "DashboardAnalysis",
    }
  }),
  '*'
)
```

## 自定义添加资产

```js
// .umirc.ts
export default {
  ui: {
    assets: {

    }
  }
}
```

### 内置终端

![https://camo.githubusercontent.com/d627fa3b419e9231b32f8515db90e632d9dd2262/68747470733a2f2f63646e2e6e6c61726b2e636f6d2f79757175652f302f323031392f6769662f38363032352f313537343134353634313431352d30366339626465372d303166392d343463652d383962392d3235616635613836643330392e676966](https://camo.githubusercontent.com/d627fa3b419e9231b32f8515db90e632d9dd2262/68747470733a2f2f63646e2e6e6c61726b2e636f6d2f79757175652f302f323031392f6769662f38363032352f313537343134353634313431352d30366339626465372d303166392d343463652d383962392d3235616635613836643330392e676966)

[更多功能](https://github.com/sorrycc/blog/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+Umi+UI+in%3Atitle+)

## 📖 API

API 由 [Umi 插件基础 API](https://umijs.org/plugin/umi-ui.html#%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%8E%A5%E5%8F%A3) + [客户端 API](https://umijs.org/plugin/umi-ui.html#客户端接口) 组成。

## 😊 如何贡献？

`master` 用于 `umi@3`。

### 目录结构

```bash
.
├── README.md
├── examples
│   └── app # dev 开发时测试的项目
├── lerna.json
├── package.json
├── packages
│   ├── preset-ui # ui 插件集，包含后面的插件
│   │   ├── package.json
│   │   └── src
│   │       ├── bubble # mini 版小气泡
│   │       ├── index.ts # 集成 blocks、tasks、./plugins/*
│   │       └── plugins
│   │           ├── configuration # 配置 UI 插件
│   │           ├── dashboard # Dashboard 面板插件
│   │           └── routes # TODO: 路由
│   │  
│   ├── block-sdk # 区块 SDK，用于 plugin-blocks 和 plugin-ui-blocks
│   │   ├── package.json
│   │   ├── .fatherrc.ts # father-build 构建 cjs
│   │   └── src # sdk 主体
│   │
│   ├── plugin-ui-blocks # 资产 UI 插件
│   │   ├── dist # ui 目录构建的 index.umd.js
│   │   ├── package.json
│   │   ├── .fatherrc.ts # father-build 构建 umd 与 cjs
│   │   ├── src # 服务端逻辑
│   │   └── ui # 客户端 UI 部分
│   ├── plugin-ui-tasks
│   │   ├── package.json
│   │   ├── src
│   │   └── ui
│   ├── theme # Umi UI 主题包，后续更换成 antd@4 暗色主题包
│   │   ├── dark.less
│   │   ├── light.less
│   │   └── package.json
│   ├── types # Umi UI 类型，集成在 @umijs/types 中，建议社区插件从 @umijs/types 导入
│   └── ui # Umi UI server
│       ├── client # Umi UI 主体
│       │   └── src
│       │       └── PluginAPI.ts # 提供插件客户端 API
│       ├── package.json
│       └── src # Umi UI Server
├── scripts
│   ├── dev.ts
│   ├── publish.js
│   ├── syncTNPM.js # 同步 tnpm
│   ├── ui.js # ui 构建脚本，使用 umi 构建 Umi UI 主框架
│   └── uiPlugins.js
└── test # TODO: 更多场景测试用例
     └── ui.e2e.ts  # e2e 测试用例
```

### 准备工作

clone 下仓库后，先执行相应包的安装、link 工作。

```bash
$ yarn
```

### 开发调试

执行构建，并且带上 `-w` 用于实时修改编译：

```bash
# 单独一个终端
$ yarn build -w
```

执行 UI 构建，也带上 `-w` ：

```bash
# 另启一个终端
$ yarn ui:build -w
```

进入 `cd example/app` 测试项目：

```bash
# 第三个终端
# 仓库调试带上了 BABEL_CACHE=none DEBUG=umiui*
$ yarn start
🚀 Starting Umi UI using umi@3.0.1...
🌈 Umi UI mini Ready on port 3000
```

访问 [http://localhost:3000](http://localhost:3000) 就是 Umi UI。

调试如图：

![](https://raw.githubusercontent.com/ycjcl868/cdn/master/20200202091318.png?token=ADHXG5NO7FQGSB4U5HFYBH26GYRG6)

### 插件开发原理

UI 插件与普通 Umi 的插件实际是一样的原理。

只是比一般的 Umi 插件，多使用两个 API：

- `api.addUIPlugin` 用于加载 ui 的 umd 包
- `api.onUISocket` 为前端 ui 提供服务端接口

[了解更多](https://umijs.org/plugin/umi-ui.html#%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%8E%A5%E5%8F%A3)

### UI 插件组织

本仓库包括：

- UI Server（@umijs/ui/src/UmiUI.ts，使用 Express）
- UI 主框架（@umijs/ui/client，使用 umi 构建）
- UI 插件集（@umijs/plugin-ui）
    - Dashboard 面板（./plugins/dashboard）
    - 配置插件（./plugins/configuration）
    - 资产插件（@umijs/plugin-ui-blocks）
    - 任务插件（@umijs/plugin-ui-tasks）
