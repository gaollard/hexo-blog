---
title: 03 babel 快速开始
---

## 1、依赖安装

```
yarn add --dev @babel/core @babel/cli @babel/preset-env
```

```js
const presets = [
  [
    "@babel/preset-env",
    {
      targets: {
        edge: "17",
        firefox: "60",
        chrome: "67",
        safari: "11.1",
      },
      useBuiltIns: "usage",
      corejs: "3.6.4",
    },
  ],
];

module.exports = { presets };
```

```
./node_modules/.bin/babel src --out-dir lib
```

## 2、配置文件
- 项目范围的配置
  - `babel.config.*` 文件，具有以下扩展名：.json, .js, .cjs, .mjs, .cts.
- 文件相关配置
  - `.babelrc.*` 文件，具有以下扩展名：.json, .js, .cjs, .mjs, .cts.
  - `.babelrc` 文件，没有扩展名。
  - `package.json` 文件，"babel" key

https://babeljs.io/docs/config-files 在这里了解他们的区别，我们应该用哪种？