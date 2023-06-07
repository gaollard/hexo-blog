---
title: 02 Git 设置代理
tags: Git
---

https://www.cnblogs.com/cscshi/p/15705045.html

```shell
# 去掉代理设置
git config --global --unset http.proxy
git config --global --unset https.proxy

# 这里我使用了丰巢客户端
git config --global http.proxy http://127.0.0.1:7890
git config --global https.proxy https://127.0.0.1:7890
```