// server.js
// 引入必要的库
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// 从.env文件加载环境变量
dotenv.config();

// 创建Express应用
const app = express();
const port = 3001; // 服务器运行的端口

// 从环境变量中安全地读取API密钥
const apiKey = process.env.COZE_API_KEY;

// 检查密钥是否存在
if (!apiKey) {
    console.error("致命错误：请在 .env 文件中设置 COZE_API_KEY 环境变量。");
    process.exit(1); // 如果没有密钥，则退出程序
}

// --- 中间件配置 ---
// 启用CORS，允许所有来源的请求。在生产环境中，为了安全，您应该限制为您的网站域名。
// 例如: app.use(cors({ origin: 'https://your-domain.com' }));
app.use(cors());

// 使用express.static中间件来托管文件夹中的静态文件（如HTML, CSS, JS, 图片）
app.use(express.static(path.join(__dirname, '.')));


// --- API路由 ---
// 创建一个API端点，前端将通过这个地址获取密钥
app.get('/api/get-coze-token', (req, res) => {
    // 以JSON格式将密钥返回给前端
    res.json({ token: apiKey });
});

// --- 启动服务器 ---
app.listen(port, () => {
    console.log(`✅ EcoMimic服务器已启动!`);
    console.log(`   - 前端页面运行在: http://localhost:${port}/index.html`);
    console.log(`   - 安全API端点在: http://localhost:${port}/api/get-coze-token`);
});
