---
title: 03 return 下载文件
toc: true
tags: nginx
categories: 中间件
---

![20230512211033](http://s3.airtlab.com/blog/20230512211033.png)

nginx 使用 return 指令，会下载文件，配置返回内容的编码格式即可：

```nginx
location /test {
  default_type text/html ;
  return 200 "hello $remote_addr";
}
```