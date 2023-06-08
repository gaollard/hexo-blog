---
title: 01 @babel/core
url: https://www.yuque.com/gaollard/ubc1q5/pacg57
---

@babel/core 暴露了 `源代码 => AST => 目标代码` 整个过程所需要的方法。

<a name="M0E0C"></a>

## transform

transform 方法将源代码处理后返回目标代码，sourcemap 代码，以及ast：

```javascript
/**
 * @param string code 源代码
 * @param object options 配置项
 * @param function callback 回调函数
 */
babel.transform(code: string, options?: Object, callback: Function)
```

```javascript
const babel = require("@babel/core");
const code = `const name = 1`
const options = {}

babel.transform(code, options, function(err, result) {
  result; // => { code, map, ast }
  console.log(result)
});
```

如果需要 ast 和 sourcemap:

```javascript
const babel = require("@babel/core");
const sourceCode = `var count = 1`

babel.transform(sourceCode, { ast: true, inputSourceMap: true }, function(err, result) {
  result; // => { code, map, ast }
  console.log(result)
});
```

这里的 options 用于配置 plugins，helpers 等等，后面会详细介绍。另外 bable 还提供了 transform 的同步方法 transformSync，以及异步Promise API transformAsync:

```javascript
// 同步API
var result = babel.transformSync("code();", options);
result.code;
result.map;
result.ast;

// 异步API
babel.transformAsync("code();", options).then(result => {
  result.code;
  result.map;
  result.ast;
});
```

<a name="0pOsO"></a>

## transformFile

transformFile 用于转换整个JS文件：

```javascript
babel.transformFile(filename: string, options?: Object, callback: Function)
```

其函数签名和 transform 差不多，只是第一个参数从源代码 code 变为了文件路径 filename：

```javascript
babel.transformFile("filename.js", options, function (err, result) {
  result; // => { code, map, ast }
});
```

类似的，tranformFile 也额外提供了同步和异步API，transformFileSync 和 transformFileAsync。

<a name="pLQf3"></a>

## parse

该方法会扫码源代码，返回一个 AST，并且 @babel/core 同样额外提供了 parse 方法的异步和同步API: parseAsync 和 parseSync。

```javascript
babel.parse(code: string, options?: Object, callback: Function)
```

```javascript
const babel = require("@babel/core");
const sourceCode = `var count = 1`

babel.parse(sourceCode, function(err, result) {
  console.log(JSON.stringify(result))
});
```

结果如下：

```javascript
{
	"type": "File",
	"start": 0,
	"end": 13,
	"loc": {
		"start": {
			"line": 1,
			"column": 0
		},
		"end": {
			"line": 1,
			"column": 13
		}
	},
	"errors": [],
	"program": {
		"type": "Program",
		"start": 0,
		"end": 13,
		"loc": {
			"start": {
				"line": 1,
				"column": 0
			},
			"end": {
				"line": 1,
				"column": 13
			}
		},
		"sourceType": "module",
		"interpreter": null,
		"body": [{
			"type": "VariableDeclaration",
			"start": 0,
			"end": 13,
			"loc": {
				"start": {
					"line": 1,
					"column": 0
				},
				"end": {
					"line": 1,
					"column": 13
				}
			},
			"declarations": [{
				"type": "VariableDeclarator",
				"start": 4,
				"end": 13,
				"loc": {
					"start": {
						"line": 1,
						"column": 4
					},
					"end": {
						"line": 1,
						"column": 13
					}
				},
				"id": {
					"type": "Identifier",
					"start": 4,
					"end": 9,
					"loc": {
						"start": {
							"line": 1,
							"column": 4
						},
						"end": {
							"line": 1,
							"column": 9
						},
						"identifierName": "count"
					},
					"name": "count"
				},
				"init": {
					"type": "NumericLiteral",
					"start": 12,
					"end": 13,
					"loc": {
						"start": {
							"line": 1,
							"column": 12
						},
						"end": {
							"line": 1,
							"column": 13
						}
					},
					"extra": {
						"rawValue": 1,
						"raw": "1"
					},
					"value": 1
				}
			}],
			"kind": "var"
		}],
		"directives": []
	},
	"comments": []
}
```

<a name="uz6Lw"></a>

## transformFromAst

给定一个 [AST](https://astexplorer.net/) ，将它进行转换为和parser方法输入一致的结果，也算是将 parse 方法的输入进行反序列化：

```javascript
babel.transformFromAst(ast: Object, code?: string, options?: Object, callback: Function): FileNode | null
```

```javascript
var babel = require("@babel/core");

const sourceCode = `var count = 1`

babel.parse(sourceCode, function(err, result) {
  if (err) {
    console.log(err);
    return;
  }

  // babel.transformFromAst(result, function(err, res) {
  //   console.log(res) // res === JSON.string(result)
  // })

  babel.transformFromAst(result, undefined, { ast: true }, function(err, res) {
    console.log(res)
  })
});
```

<a name="sUDTO"></a>

## Advanced APIs

许多使用了Babel的系统都喜欢自动注入 plugins 和 presets，或覆盖选项。为了实现此目标，Babel 公开了一些功能，这些功能有助于在不进行转换的情况下部分加载配置。

<a name="f97XD"></a>

### loadOptions

用于解析 Babel 的选项，产生一个 option 对象

```javascript
babel.loadOptions(options?: Object)
```

代码：

```javascript
var babel = require("@babel/core");

const res = babel.loadOptions({
  "plugins": ["@babel/plugin-transform-arrow-functions"]
})

console.log(res)
```

输出：

![20230608023018](http://s3.airtlab.com/blog/20230608023018.png)

### loadPartialConfig

```javascript
babel.loadPartialConfig(options?: Object): PartialConfig
```

<a name="W5FUN"></a>

### createConfigItem

```javascript
babel.createConfigItem(value: string | {} | Function | [string | {} | Function, {} | void], { dirname?: string, type?: "preset" | "plugin" }): ConfigItem
```

<a name="78gMW"></a>

## Options 配置

参考文档 <https://babeljs.io/docs/en/options>
