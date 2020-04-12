# @umijs/ui-builder

用于 Umi UI 插件前端构建打包。

## 约定

Umi UI 插件目录大致是这样，约定 `ui/index.(tsx|jsx)` 作为 UI 插件入口：

```bash
- umi-plugin-ui-bar
  - dist # ui 插件产物
    - index.umd.js
  - lib # 插件产物
    -index.js
  - src # 插件目录
    - index.ts
  - ui # ui 目录
    - index.tsx
  - package.json
  - .fatherrc.ts # father-build 构建 src 下 cjs
  - tsconfig.json
```

## 使用

安装

```bash
$ yarn add @umijs/ui-builder -D
```

在插件根目录 `package.json`，添加 `ui-build`：

```json
{
  "name": "umi-plugin-ui-bar",
  "scripts": {
    "ui:build": "ui-build"
  }
}
```

### 多 UI 插件

如果一插件里包括多个 ui umd 插件包，可以在根目录下配置 `ui.config.js`：

```js
module.exports = {
  entry: {
    bar: 'ui/bar.tsx',
    foo: 'ui/foo.tsx',
  },
  // less theme vars
  theme: {

  },
}
```

打包后会有以下产物：

```bash
- dist
  - bar.umd.js
  - foo.umd.js
```

### 开发模式

工具提供开发模式，只需在 `ui-build` 后加上 `-w` 或 `--watch`，即启动 watch 模式，改动相关文件即重构建：

```bash
$ npx ui-build
🎉 ui build success

$ npx ui-build -w
🌈 [watch] ui build success
```

