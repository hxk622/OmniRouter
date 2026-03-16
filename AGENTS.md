# OmniRouter Repo Rules

- 默认工作流：完成代码修改并通过必要验证后，除非用户明确说不要，直接执行 `git add`、`git commit`、`git push origin 当前分支`。
- 提交前排除本地运行时产物：不要提交 `deploy/.env`、`deploy/data/`、`deploy/postgres_data/`、`deploy/redis_data/` 及其备份目录。
- 如果变更包含环境文件，使用 `deploy/.env.dev`、`deploy/.env.test`、`deploy/.env.prod`；运行时由工具覆盖生成 `deploy/.env`。
