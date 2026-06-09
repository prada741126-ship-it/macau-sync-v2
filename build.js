const fs = require('fs');
const path = require('path');

console.log('构建开始...');
console.log('版本：v10.21 正式版V1.0');
console.log('时间：' + new Date().toLocaleString('zh-CN', {timeZone: 'Asia/Macau'}));

// 检查 dist/index.html 是否存在
const indexFile = path.join(__dirname, 'dist', 'index.html');
if (!fs.existsSync(indexFile)) {
  console.error('ERROR: dist/index.html 不存在！');
  process.exit(1);
}

const stats = fs.statSync(indexFile);
console.log(`✓ dist/index.html 存在 (${(stats.size / 1024).toFixed(1)} KB)`);

// 简单验证：检查关键函数是否存在
const content = fs.readFileSync(indexFile, 'utf-8');
const checks = [
  ['doQuery', '查询功能'],
  ['renderOverview', '总览页面'],
  ['renderAll', '全部交易页面'],
  ['openModal', '编辑模态框'],
  ['deleteTx', '删除功能'],
  ['syncUpload', '同步上传'],
  ['syncDownload', '同步下载'],
  ['APP_VERSION', '版本变量']
];

let pass = 0;
checks.forEach(([func, desc]) => {
  if (content.includes(func)) {
    console.log(`  ✓ ${desc} (${func})`);
    pass++;
  } else {
    console.warn(`  ✗ ${desc} (${func}) 未找到！`);
  }
});

console.log(`\n构建完成：${pass}/${checks.length} 检查通过`);

if (pass < checks.length) {
  console.error('构建失败：有功能缺失！');
  process.exit(1);
}

// 运行测试（如果有 test.js）
if (process.env.NODE_ENV !== 'production' && !process.env.RAILWAY_ENVIRONMENT) {
  console.log('\n运行测试...');
  try {
    require('./test.js');
  } catch (e) {
    console.error('测试失败：', e.message);
    process.exit(1);
  }
} else {
  console.log('\n生产环境：跳过测试');
}

console.log('\n✅ 所有检查通过，可以部署！');
