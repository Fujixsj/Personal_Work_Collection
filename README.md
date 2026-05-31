# 福记の作品集

一个基于 Astro 构建的极简内容驱动型个人作品集网站，用于展示个人介绍、代表项目、成长时间线、简历入口和联系方式。

网站目标是保持静态优先、加载快速、内容真实、后续容易维护。当前版本主要完成首页、项目展示、时间线、CV 页面、主题切换、首页粒子背景和基础 SEO。

## 技术栈

- Astro
- TypeScript
- Tailwind CSS
- 静态内容文件：JSON

## 本地开发

安装依赖：

```powershell
npm install
```

启动预览：

```powershell
$env:ASTRO_TELEMETRY_DISABLED='1'
npm run dev -- --host 127.0.0.1 --port 4321
```

构建检查：

```powershell
$env:ASTRO_TELEMETRY_DISABLED='1'
npm run build
```

## 内容修改位置

后续大部分内容都可以在 `content/` 和 `public/` 里维护，不需要改页面代码。

### 个人信息

文件：`content/profile.json`

可修改内容包括：

- 中文名
- 英文名 / 账号名
- 身份标题
- 一句话介绍
- 所在地
- 个人简介
- 邮箱
- 简历链接
- 社交链接
- 首页顶部状态文案

例如：

```json
{
  "name": "福记想睡觉",
  "englishName": "fuji_xsj",
  "title": "Student, Developer & Investor",
  "resumeUrl": "/resume.pdf"
}
```

### 项目内容

文件：`content/projects.json`

可修改内容包括：

- 项目名称
- 项目 slug
- 项目简介
- 我的角色
- 开始和结束时间
- 项目状态
- 技术栈
- 项目亮点
- 成果说明
- 项目链接
- GitHub 链接
- 是否首页展示
- 排序优先级

当前的“项目经历待补充 A / B”可以直接在这里替换成真实项目。

### 时间线内容

文件：`content/timeline.json`

可修改内容包括：

- 时间线标题
- 副标题
- 日期
- 类型
- 描述
- 相关链接
- 标签
- 排序字段

时间线会按日期倒序展示，最新内容会排在前面。

### 简历文件

文件位置：`public/resume.pdf`

替换方式：

1. 把新的简历 PDF 放到 `public/` 文件夹。
2. 推荐命名为 `resume.pdf`。
3. 确认 `content/profile.json` 中的字段为：

```json
"resumeUrl": "/resume.pdf"
```

如果使用其他文件名，比如 `fuji-resume.pdf`，则同步修改为：

```json
"resumeUrl": "/fuji-resume.pdf"
```

### 网站图标和首页头像

文件位置：`public/icon.jpg`

这个文件同时用于：

- 浏览器标签页图标
- Apple touch icon
- 首页头像标识

替换时保持文件名为 `icon.jpg` 最简单。如果改成其他文件名，需要同步修改：

- `src/layouts/BaseLayout.astro`
- `src/pages/index.astro`

### 站点配置

文件：`src/config/site.ts`

可修改内容包括：

- 站点名称
- 站点域名
- 默认 SEO 标题
- 默认 SEO 描述
- 默认 OG 图片
- 顶部导航

上线前请把 `siteUrl` 从 `https://example.com` 改成真实域名。

### SEO 和站点地图

相关文件：

- `src/config/site.ts`
- `public/robots.txt`
- `public/sitemap.xml`

上线前需要把其中的 `https://example.com` 改为真实域名。

## 主要目录说明

```text
content/
  profile.json      # 个人信息、联系方式、简历入口
  projects.json     # 项目列表
  timeline.json     # 时间线

public/
  icon.jpg          # 网站图标和首页头像
  resume.pdf        # 简历 PDF
  robots.txt        # 搜索引擎规则
  sitemap.xml       # 站点地图

src/
  components/       # 页面组件
  config/           # 站点配置
  layouts/          # 基础布局和 SEO
  lib/              # 内容读取和排序
  pages/            # 页面路由
  styles/           # 全局样式
  types/            # 内容类型

doc/
  AGENTS.md
  PRD.md
  TECH_DESIGN.md
  参考网站网址.md
```

## 当前待补充内容

- 真实项目经历：修改 `content/projects.json`
- 更完整的成长经历：修改 `content/timeline.json`
- 真实 LinkedIn 或其他社交链接：修改 `content/profile.json`
- 真实线上域名：修改 `src/config/site.ts`、`public/robots.txt`、`public/sitemap.xml`
- 真实 OG 分享图：放入 `public/og/` 后修改 `src/config/site.ts`

## 备注

本项目优先保持内容真实和结构清晰。新增内容时，建议先更新 `content/` 下的数据文件，只有当现有字段无法表达时，再考虑修改组件或新增字段。
