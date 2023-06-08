const fs = require('fs');

hexo.extend.filter.register("server_middleware", function (app) {

  // 静态资源
  app.use(function (req, res, next) {
    const filePath = req.url.replace('/origin', 'origin')
    if (fs.existsSync(filePath)) {
      res.write(fs.readFileSync(filePath), () => {
      });
      res.end();
      return;
    }
    res.setHeader("X-Server", "hexo-theme-wood");
    next();
  });

  app.use('/api', function (req, res, next) {
    res.write(JSON.stringify({ msg: 'hello' }));
    res.end()
    next();
  })
});
