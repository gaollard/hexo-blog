---
title: 03 @babel/helpers
url: https://www.yuque.com/gaollard/ubc1q5/oofbrf
---

该模块用于提供了编译时的一些帮助函数。

```javascript
import * as helpers from '@babel/helpers';
import * as t from '@babel/types';

const typeofHelper = helpers.get('typeof');

t.isExpressionStatement(typeofHelper);
// true
```
