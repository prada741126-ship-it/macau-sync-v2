const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8080;

// 禁用所有缓存（开发 + 生产都一样）
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

// 静态文件服务
app.use(express.static(__dirname + '/dist'));

// SPA 回退：所有其他请求返回 index.html
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'dist', 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('index.html not found');
  }
});

app.listen(PORT, () => {
  console.log(`澳门洗码报表 v10.21 启动成功！`);
  console.log(`本地访问：http://localhost:${PORT}`);
  console.log(`版本：v10.21（正式版V1.0）`);
  console.log(`时间：${new Date().toLocaleString('zh-CN', {timeZone: 'Asia/Macau'})}`);
});
