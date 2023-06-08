---
title: 02 babel 版本变更
---

babel 目前还在使用为 v7 和 v6、其中 v6 已经很少了。

## 1、v6 VS v7
Babel V7 相对于 Babel V6来说，有以下几个主要的区别：

1. 命令行工具改进：V7 增加了一些新的命令行工具，如 `babel-upgrade和babel-merge` 等，这些工具让你更方便地维护Babel配置和升级到新的版本。

2. 插件新增：V7 在默认插件集合中新增了一些新的插件，如 `@babel/plugin-transform-runtime` 和 `@babel/plugin-proposal-class-properties` 等，这些插件为开发者提供更多的便利和控制力。

3. 配置文件更改：Babel V7 将配置文件名称从 .babelrc 更改为 babel.config.js，并支持更复杂的配置选项。

4. 匹配更多的ECMAScript特性：Babel V7 支持更多的 ECMAScript 特性，如对象的 Rest 和 Spread 属性，对象的解构赋值，Async 函数和模板字符串标记等。

总之，Babel V7 相对于 Babel V6 的改进主要在于命令行工具、插件集合、配置文件和匹配更多的 ECMAScript 特性等方面。

## 2、V7.4.0
- @babel/polyfill 被弃用，取而代之的是 `"core-js/stable"`

## 3、v7.6.0
- 支持 TypeScript 命名空间的编译。