# OmniRouter

<div align="center">

[![Go](https://img.shields.io/badge/Go-1.26.1-00ADD8.svg)](https://golang.org/)
[![Vue](https://img.shields.io/badge/Vue-3.4+-4FC08D.svg)](https://vuejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-336791.svg)](https://www.postgresql.org/)
[![Redis](https://img.shields.io/badge/Redis-7+-DC382D.svg)](https://redis.io/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED.svg)](https://www.docker.com/)

**统一 AI API 网关平台**

中文首页 | [详细中文文档](README_CN.md)

</div>

---

## 项目简介

OmniRouter 是一个面向多账号、多上游模型的 AI API 网关。  
它负责统一接入、账号调度、鉴权、限流、计费、请求转发和后台管理。

当前仓库首页之所以之前还是英文，是因为 GitHub 默认展示根目录的 `README.md`，而中文内容放在 `README_CN.md`。现在首页已经切为中文。

## 核心能力

- 多账号管理：支持 OAuth、API Key 等不同上游账号形态
- API Key 分发：为平台用户生成和管理调用密钥
- 智能调度：按平台、模型、限流状态、粘性会话做账号选择
- 精确计费：按 Token / 请求维度统计和结算
- 限流与并发控制：支持用户级、账号级限制
- 管理后台：提供完整的 Web 管理界面

## 技术栈

| 组件 | 技术 |
|------|------|
| 后端 | Go, Gin, Ent |
| 前端 | Vue 3, Vite |
| 数据库 | PostgreSQL |
| 缓存 | Redis |

## 本地开发

### 1. 安装依赖

```bash
pnpm install
```

### 2. 环境文件约定

项目使用下面 3 套环境源文件：

- `deploy/.env.dev`
- `deploy/.env.test`
- `deploy/.env.prod`

不要使用 `.env.example`。  
运行时会根据 `APP_ENV` 选择其中一份，覆盖生成 `deploy/.env`，程序和 Docker Compose 默认读取这份 `deploy/.env`。

```bash
# 开发环境
pnpm run env:sync

# 测试环境
APP_ENV=test pnpm run env:sync

# 生产环境
APP_ENV=prod pnpm run env:sync
```

### 3. 启动服务

```bash
# 后端
pnpm dev:api

# 前端
pnpm dev:web
```

默认开发模式下：

- PostgreSQL 连接本地宿主机
- Redis 连接本地宿主机
- 不强制要求把 PostgreSQL / Redis 容器化

### 4. 常用开发命令

```bash
# 同步环境
pnpm run env:sync

# 后端单测
cd backend && go test -tags=unit ./...

# 前端开发
pnpm dev:web

# 后端开发
pnpm dev:api
```

## 部署建议

推荐拆分为两台机器：

- 后端机：OmniRouter 后端 + PostgreSQL + Redis
- 前端机：Nginx + 前端静态资源

如果后端机已经有本地 PostgreSQL / Redis，优先直接复用，不必为了部署 OmniRouter 再单独容器化数据库和缓存。

## 文档入口

- 中文详细说明：[README_CN.md](README_CN.md)
- 部署目录说明：[deploy/README.md](deploy/README.md)
- 依赖安全说明：`docs/dependency-security.md`

## 演示环境

- 地址：`https://v2.pincc.ai/`
- 演示账号：`admin@omnirouter.com`
- 演示密码：`admin123`

注意：演示环境账号不会在你的自建环境里自动创建。
