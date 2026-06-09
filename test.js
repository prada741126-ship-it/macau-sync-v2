const fs = require('fs');
const path = require('path');

console.log('=== 测试开始 ===');

const indexFile = path.join(__dirname, 'dist', 'index.html');
if (!fs.existsSync(indexFile)) {
  console.error('ERROR: dist/index.html 不存在！');
  process.exit(1);
}

const content = fs.readFileSync(indexFile, 'utf-8');
console.log(`文件大小：${(content.length / 1024).toFixed(1)} KB`);

// 基本检查
const checks = [
  { name: '查询功能 (doQuery)', func: 'function doQuery' },
  { name: '总览页面 (renderOverview)', func: 'function renderOverview' },
  { name: '全部交易 (renderAll)', func: 'function renderAll' },
  { name: '编辑模态框 (openModal)', func: 'function openModal' },
  { name: '删除功能 (deleteTx)', func: 'function deleteTx' },
  { name: '同步上传 (syncUpload)', func: 'function syncUpload' },
  { name: '同步下载 (syncDownload)', func: 'function syncDownload' },
  { name: '版本变量 (APP_VERSION)', func: 'APP_VERSION' },
  { name: 'Firebase SDK', func: 'firebase-app-compat' },
  { name: 'Chart.js', func: 'chart.js' }
];

let pass = 0;
checks.forEach(check => {
  if (content.includes(check.func)) {
    console.log(`  ✓ ${check.name}`);
    pass++;
  } else {
    console.error(`  ✗ ${check.name} 未找到！`);
  }
});

console.log(`\n结果：${pass}/${checks.length} 通过`);

if (pass < checks.length) {
  console.error('测试失败！');
  process.exit(1);
}

// 检查 HTML 结构
const hasDoctype = content.includes('<!DOCTYPE html>');
const hasHead = content.includes('<head>') && content.includes('</head>');
const hasBody = content.includes('<body>') && content.includes('</body>');

console.log(`\nHTML 结构检查：`);
console.log(`  ${hasDoctype ? '✓' : '✗'} DOCTYPE`);
console.log(`  ${hasHead ? '✓' : '✗'} Head`);
console.log(`  ${hasBody ? '✓' : '✗'} Body`);

console.log('\n✅ 所有测试通过！');
