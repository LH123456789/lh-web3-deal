# LH-DEAL 后端服务

LH-DEAL 项目的后端服务，用于处理用户登录注册认证功能。

## 技术栈

- **运行时**: Node.js + TypeScript
- **框架**: Express.js
- **数据库**: MongoDB + Mongoose
- **认证**: JWT + bcrypt

## 快速开始

### 1. 安装依赖

```bash
cd backend
npm install
```

### 2. 配置环境变量

```bash
cp .env.example .env
```

编辑 `.env` 文件，修改以下配置：

```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/lh-deal
JWT_SECRET=your-super-secret-key-change-in-production
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

### 3. 启动 MongoDB

确保本地 MongoDB 服务已启动，或修改 `MONGODB_URI` 连接远程数据库。

### 4. 启动服务

```bash
# 开发模式（热重载）
npm run dev

# 生产模式
npm run build
npm start
```

## API 接口

### 认证接口

| 端点 | 方法 | 描述 | 认证 |
|------|------|------|------|
| `/api/auth/register` | POST | 用户注册 | 否 |
| `/api/auth/login` | POST | 用户登录 | 否 |
| `/api/auth/logout` | POST | 用户登出 | 是 |
| `/api/auth/me` | GET | 获取当前用户 | 是 |

### 请求/响应示例

#### 注册

```bash
POST /api/auth/register
Content-Type: application/json

{
  "username": "admin",
  "email": "admin@example.com",
  "password": "6666888"
}
```

响应：

```json
{
  "message": "注册成功",
  "data": {
    "user": {
      "id": "6579...",
      "username": "admin",
      "email": "admin@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### 登录

```bash
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "6666888"
}
```

响应：

```json
{
  "message": "登录成功",
  "data": {
    "user": {
      "id": "6579...",
      "username": "admin",
      "email": "admin@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### 获取当前用户

```bash
GET /api/auth/me
Authorization: Bearer <token>
```

响应：

```json
{
  "data": {
    "user": {
      "id": "6579...",
      "username": "admin",
      "email": "admin@example.com",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

## 项目结构

```
backend/
├── src/
│   ├── controllers/      # 控制器
│   │   └── authController.ts
│   ├── models/           # 数据模型
│   │   └── User.ts
│   ├── routes/           # 路由
│   │   └── authRoutes.ts
│   ├── middleware/       # 中间件
│   │   └── authMiddleware.ts
│   ├── utils/            # 工具函数
│   │   ├── password.ts
│   │   └── jwt.ts
│   ├── config/           # 配置
│   │   ├── index.ts
│   │   └── database.ts
│   ├── app.ts            # Express 应用
│   └── server.ts         # 服务器入口
├── .env.example
├── package.json
└── tsconfig.json
```

## 安全说明

1. **JWT Secret**: 生产环境请使用强密码并妥善保管
2. **密码存储**: 使用 bcrypt 加密存储，不可逆
3. **环境变量**: 不要将敏感信息提交到代码仓库