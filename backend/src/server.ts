import app from './app';
import { config } from './config';
import { connectDatabase } from './config/database';

const startServer = async (): Promise<void> => {
  try {
    await connectDatabase();

    app.listen(config.port, () => {
      console.log(`🚀 服务器运行在 http://localhost:${config.port}`);
      console.log(`📦 环境: ${config.nodeEnv}`);
      console.log(`🔗 API 地址: http://localhost:${config.port}/api/auth`);
    });
  } catch (error) {
    console.error('启动服务器失败:', error);
    process.exit(1);
  }
};

startServer();