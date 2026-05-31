# 个人作品集网站技术设计文档

版本：v1.0
日期：2026-05-28
关联 PRD：Personal_Work_Collection/PRD.md
项目名称：个人作品集网站

---

## 1. 文档目的

本文档用于将 PRD 中的产品需求转化为可落地的技术方案，明确网站的整体架构、技术选型、目录结构、页面拆分、数据模型、渲染策略、SEO、性能与可访问性方案，以及后续扩展路径。

本项目定位为“极简内容驱动型个人作品集网站”，因此技术设计的核心原则是：

- 静态优先
- 内容可维护
- 首屏快速加载
- 组件化但不过度复杂
- 便于后续迭代扩展

---

## 2. 设计目标

### 2.1 技术目标

1. 支持首页、项目页、时间线页、博客页、简历页等内容展示。
2. 支持 Markdown / MDX 内容维护，尽量减少对后台的依赖。
3. 具备良好的 SEO、分享卡片和性能表现。
4. 适配桌面端和移动端，保证阅读体验。
5. 预留主题切换、搜索、统计、多语言等扩展能力。

### 2.2 非技术目标

1. 不引入复杂的后端服务。
2. 不依赖数据库作为第一版内容存储。
3. 不实现登录、评论、用户系统。
4. 不将交互做成高成本动画站点。

---

## 3. 总体方案

### 3.1 架构结论

第一版采用“静态站点生成 + 内容文件驱动 + 组件化页面”的方案。

推荐技术栈：

- 框架：Astro
- 语言：TypeScript
- 内容：Markdown / MDX + JSON/YAML
- 样式：Tailwind CSS + 少量原生 CSS
- 部署：Vercel 或 Cloudflare Pages
- 图标：Lucide Icons 或 Heroicons
- 图片：本地静态资源 + 构建期优化

### 3.2 选择理由

Astro 适合内容型网站，具备以下优势：

- 默认输出静态 HTML，性能优秀
- 对 Markdown / MDX 支持好
- 组件可以按需岛屿化，避免过多 JS
- 适合博客、作品集、简历型站点
- 后续可以平滑扩展搜索、主题、统计等能力

---

## 4. 系统架构设计

### 4.1 架构分层

系统按照以下层次组织：

1. 内容层：个人信息、项目、时间线、文章、简历等 Markdown / JSON 文件
2. 业务层：内容聚合、排序、过滤、格式化、SEO 元数据生成
3. 展示层：页面、区块组件、卡片、导航、时间线等 UI
4. 平台层：构建、部署、图片优化、分析埋点、站点地图

### 4.2 页面渲染策略

- 首页：静态生成
- 项目详情页：静态生成
- 时间线页：静态生成
- 博客列表页：静态生成
- 博客详情页：静态生成
- CV 页：静态生成

所有内容页面均在构建期生成，保证访问速度与 SEO 友好性。

### 4.3 交互策略

交互只用于增强阅读体验，不作为页面主体。

适合采用客户端交互的部分：

- 主题切换
- 移动端导航菜单
- 邮箱复制按钮
- 微信二维码弹窗
- 搜索输入与筛选
- 统计埋点触发

其余内容展示部分尽量保持静态。

---

## 5. 技术选型

### 5.1 前端框架

#### 选择：Astro

原因：

- 内容驱动站点天然适配
- 默认零 JS 或少 JS
- Markdown/MDX 原生支持
- 可按需组合 React / Vue / Svelte 组件，如后期需要

### 5.2 开发语言

#### 选择：TypeScript

原因：

- 内容模型结构清晰
- 页面 props 与数据类型易维护
- 降低字段缺失和数据格式错误风险

### 5.3 样式方案

#### 选择：Tailwind CSS + 少量组件级 CSS

原因：

- 适合快速搭建一致风格页面
- 原子类有利于形成统一的设计系统
- 配合 CSS variables 可实现主题切换

### 5.4 内容管理方案

#### 选择：文件系统内容管理

结构包括：

- Markdown / MDX：项目、文章、时间线正文
- JSON：个人信息、社交链接、站点配置
- YAML：可选，用于简洁配置

优点：

- 无需后台
- Git 即内容管理
- 易于版本控制
- 适合长期维护

### 5.5 部署方案

#### 选择：Vercel 或 Cloudflare Pages

原因：

- 静态部署简单
- 自动构建和预览环境支持好
- CDN 加速天然可用
- 适合个人站点

---

## 6. 信息架构与路由设计

### 6.1 页面路由

推荐路由如下：

- / ：首页
- /projects ：项目列表页
- /projects/[slug] ：项目详情页
- /timeline ：时间线页
- /blog ：博客列表页
- /blog/[slug] ：文章详情页
- /cv ：简历页
- /about ：关于页，可选
- /contact ：联系页，可选，若首页已包含可省略

### 6.2 路由设计原则

1. URL 简短、语义化。
2. slug 使用小写、短横线分隔。
3. 不使用复杂查询参数作为主要页面信息承载。
4. 未来如果启用多语言，可通过 /zh-cn、/en 等前缀扩展。

---

## 7. 目录结构设计

### 7.1 推荐目录结构

```text
content/
  profile.json
  projects/
    project-a.md
    project-b.md
  posts/
    post-a.md
    post-b.md
  timeline/
    2024.md
    2025.md
public/
  images/
    avatar/
    projects/
    posts/
    og/
src/
  components/
    common/
    layout/
    home/
    projects/
    timeline/
    blog/
    cv/
  layouts/
  pages/
  styles/
  lib/
  config/
  types/
```

### 7.2 目录职责说明

- content/：所有可编辑内容
- public/：静态资源，如图片、图标、PDF、OG 图
- src/components/：可复用 UI 组件
- src/layouts/：页面布局模板
- src/pages/：路由页面
- src/styles/：全局样式、主题变量、辅助样式
- src/lib/：内容读取、排序、格式化、SEO 工具函数
- src/types/：内容模型与通用类型定义
- src/config/：站点常量、导航配置、社交链接配置

---

## 8. 内容模型设计

### 8.1 个人信息模型

来源：content/profile.json

字段建议：

- name：姓名
- title：身份定位
- location：所在地
- bio：简介
- avatar：头像路径
- email：邮箱
- socialLinks：社交链接数组
- resumeUrl：简历 PDF 地址
- tagline：一句话标语
- availability：可合作状态

### 8.2 社交链接模型

每个链接包含：

- label：名称
- url：地址
- icon：图标标识
- type：external / mailto / copy / modal
- visible：是否展示
- order：排序权重

### 8.3 项目模型

来源：content/projects/*.md

字段建议：

- title：项目名称
- slug：唯一标识
- summary：一句话简介
- coverImage：封面图
- role：个人角色
- teamSize：团队规模，可选
- startDate：开始时间
- endDate：结束时间
- status：进行中 / 已上线 / 已停止
- techStack：技术栈数组
- highlights：亮点数组
- metrics：成果指标数组
- websiteUrl：访问链接
- githubUrl：源码链接
- caseStudyContent：正文内容
- priority：优先级
- tags：标签数组
- featured：是否首页重点展示

### 8.4 时间线模型

来源：content/timeline/*.md 或 JSON

字段建议：

- title：标题
- subtitle：副标题
- date：时间
- type：工作 / 项目 / 学习 / 开源 / 获奖 / 文章 / 其他
- description：描述
- links：相关链接数组
- tags：标签数组
- order：展示顺序

### 8.5 博客文章模型

来源：content/posts/*.md

字段建议：

- title
- slug
- excerpt
- coverImage
- publishedAt
- updatedAt
- category
- tags
- readingTime
- content
- seoTitle
- seoDescription
- draft：草稿标记

### 8.6 站点配置模型

建议使用 src/config/site.ts 维护：

- siteName
- siteUrl
- defaultTitle
- defaultDescription
- defaultOgImage
- navigation
- footerLinks
- analyticsConfig
- themeConfig

---

## 9. 页面技术设计

## 9.1 首页

### 页面职责

首页是整个站点的核心入口，必须在首屏内展示：

- 姓名
- 身份定位
- 简短介绍
- 主要 CTA
- 核心社交链接
- 重点项目入口

### 首页模块拆分

1. Header / Navbar
2. Hero
3. Social Links
4. Featured Projects
5. Timeline Preview
6. Blog Preview，可选
7. Contact Section
8. Footer

### 首页实现要点

- Hero 区尽量保证信息密度，但避免堆砌。
- 重点项目数量控制在 3–6 个。
- 时间线展示 3–5 条最新经历即可，避免首屏过长。
- 社交链接采用图标 + 文本并列方式。

## 9.2 项目列表页

### 页面职责

展示所有项目，支持按标签、类型或状态筛选。

### 实现方式

- 构建期读取 projects 目录
- 按 priority、featured、startDate 排序
- 前端提供简单筛选，不依赖后端

### 交互建议

- 点击卡片进入详情页
- 若项目没有详情内容，则外链到项目站点或 GitHub
- 支持简单标签筛选，后续可加入搜索

## 9.3 项目详情页

### 页面职责

完整讲述一个项目的背景、思路、过程与结果。

### 页面结构

1. 标题与简介
2. 封面图
3. 项目概览信息
4. 背景与问题
5. 目标与挑战
6. 我的贡献
7. 解决方案
8. 关键功能或设计亮点
9. 成果数据
10. 复盘与收获
11. 相关链接

### 实现要点

- 使用 Markdown/MDX 作为正文内容载体
- 正文支持标题、列表、表格、图片、代码块
- 自动生成目录锚点，可选
- 页面需要独立 SEO 信息

## 9.4 时间线页

### 页面职责

展示个人成长和经历轨迹。

### 实现方式

- 时间线按 date 倒序排序
- 可按年份分组渲染
- 通过 type 标签控制视觉样式

### 交互建议

- 默认折叠过长描述，可选展开
- 相关链接支持外跳或内部跳转
- 移动端采用单列时间轴

## 9.5 博客页

### 页面职责

用于展示文章列表、文章详情、分类与标签。

### 实现方式

- 列表页使用构建期数据聚合
- 详情页支持 Markdown/MDX 渲染
- 支持代码高亮和图片懒加载

### SEO 要点

- 每篇文章单独 title / description
- 增加文章发布时间和更新时间
- 可选生成文章结构化数据

## 9.6 简历页

### 页面职责

以更正式、简洁的方式呈现教育、工作、技能和项目经历。

### 实现方式

- 在线简历页面采用单页长文布局
- 提供 PDF 下载链接
- 输出便于打印的样式，可选

---

## 10. 组件设计

### 10.1 基础组件

建议先实现以下通用组件：

- Button
- Badge / Tag
- SectionTitle
- Card
- ExternalLink
- IconLink
- Avatar
- Divider
- Modal
- ThemeToggle
- MobileMenu

### 10.2 业务组件

首页和内容页建议拆分为：

- HeroSection
- SocialLinks
- FeaturedProjectsGrid
- ProjectCard
- TimelineList
- TimelineItem
- BlogPreviewList
- ContactSection
- ResumeDownloadCard
- ProjectMeta
- ArticleContent
- ArticleCard

### 10.3 组件设计原则

1. 一个组件只承担一个明确职责。
2. 结构与样式分离，避免组件过度耦合。
3. 优先复用，减少重复布局代码。
4. 组件 props 结构保持稳定，便于未来内容迁移。

---

## 11. 状态与交互设计

### 11.1 无状态优先

由于站点以内容展示为主，大部分页面无需复杂状态管理。

### 11.2 需要状态的功能

1. 主题切换状态
2. 移动端导航开关
3. 搜索输入状态
4. 标签筛选状态
5. 邮箱复制提示状态
6. 微信二维码弹窗状态

### 11.3 状态管理方式

- 轻量组件状态：组件内部 state
- 跨页面主题状态：localStorage + CSS variables
- 统计埋点：函数封装，不进入全局状态管理

不建议第一版引入 Redux、Zustand 等重型状态库。

---

## 12. 主题系统设计

### 12.1 主题方案

支持：

- 默认暗色主题
- 浅色主题切换
- 跟随系统主题

### 12.2 实现方式

- 使用 CSS variables 定义颜色系统
- 通过 data-theme 切换主题变量
- 在首屏脚本中尽早读取本地存储，避免闪烁

### 12.3 存储策略

- localStorage 保存用户选择
- 未设置时使用 prefers-color-scheme
- 切换后立即生效并持久化

---

## 13. SEO 与分享设计

### 13.1 基础 SEO

每个页面都应具备：

- title
- meta description
- canonical
- Open Graph title
- Open Graph description
- Open Graph image
- Twitter Card
- robots meta（按需）

### 13.2 结构化数据

建议增加以下 JSON-LD：

- Person：个人主页
- WebSite：站点信息
- Article：博客文章
- CreativeWork：项目详情，可选

### 13.3 Sitemap 与 Robots

- 自动生成 sitemap.xml
- robots.txt 允许主要页面收录
- 草稿页面和不公开页面不纳入 sitemap

### 13.4 Open Graph 图

建议为首页和重要内容页生成统一风格的 OG 图片：

- 包含姓名、定位、站点名
- 保持视觉简洁
- 适配社交平台分享预览

---

## 14. 性能设计

### 14.1 性能目标

- 首屏加载尽量低于 2 秒
- Lighthouse Performance 90+
- JS 体积尽量最小化

### 14.2 优化策略

1. 静态生成，减少运行时计算。
2. 除必要交互外，不加载多余 JS。
3. 图片使用 WebP / AVIF。
4. 封面图按尺寸裁剪，避免原图直出。
5. 字体优先系统字体，必要时再引入网络字体。
6. 非首屏资源懒加载。
7. 仅在需要时加载动画或统计脚本。

### 14.3 图片策略

- 头像和项目封面统一尺寸规范
- 文章内图片按内容宽度自适应
- 所有图片提供 alt
- 首页首屏图片预加载或优先加载

### 14.4 代码拆分策略

- 交互性组件单独岛屿化
- 非必要组件保持纯静态渲染
- 博客代码高亮方案避免过重依赖

---

## 15. 可访问性设计

### 15.1 设计目标

确保键盘用户、低视力用户和辅助技术用户都能正常访问内容。

### 15.2 关键措施

1. 所有交互元素支持键盘操作。
2. 链接、按钮具有明确文本或 aria-label。
3. 对比度满足阅读要求。
4. hover 不作为唯一反馈。
5. 图像有合适 alt。
6. 表单或复制交互有明确反馈。
7. 动画遵守 prefers-reduced-motion。
8. 字体大小不低于 16px。

---

## 16. 数据分析设计

### 16.1 埋点目标

统计以下关键行为：

- 首页访问量
- 项目点击量
- 简历下载次数
- 外链点击次数
- 来源渠道
- 设备类型
- 页面停留时间

### 16.2 实现策略

采用轻量第三方统计工具：

- Plausible
- Umami
- Vercel Analytics
- Google Analytics

### 16.3 埋点原则

- 尽量异步加载
- 不影响首屏体验
- 只收集必要事件
- 不采集敏感个人信息

---

## 17. 内容维护与发布流程

### 17.1 内容更新流程

1. 修改 Markdown / JSON 内容文件。
2. 提交到 Git 仓库。
3. 触发自动构建。
4. 部署到静态托管平台。
5. 线上生效。

### 17.2 适合维护的内容形式

- 个人简介：JSON
- 项目：Markdown
- 时间线：Markdown 或 JSON
- 博客：Markdown/MDX
- 简历下载文件：PDF

### 17.3 内容更新原则

- 保持真实
- 强调结果与贡献
- 尽量短句化，避免长篇空话
- 结构稳定，避免频繁改版导致维护困难

---

## 18. 测试策略

### 18.1 测试范围

1. 内容渲染是否正确
2. 路由是否可访问
3. 重要链接是否有效
4. 移动端布局是否正常
5. SEO 是否输出完整
6. 图片是否正常显示
7. 主题切换是否持久化

### 18.2 建议测试类型

- 单元测试：内容处理工具函数
- 集成测试：页面渲染结果
- 手动验收：移动端、不同分辨率、不同浏览器
- Lighthouse 检查：性能、SEO、可访问性

### 18.3 最低验收项

- 首页信息完整
- 项目详情可正常打开
- 时间线排序正确
- 移动端无横向滚动
- 分享卡片正常

---

## 19. 错误处理设计

### 19.1 常见错误场景

- 内容文件缺字段
- 图片路径错误
- 外链失效
- markdown 语法错误
- 构建期数据读取失败

### 19.2 处理方式

- 构建期校验字段完整性
- 对缺失字段设置默认值
- 关键页面提供兜底渲染
- 外链统一加上安全属性
- 构建失败时明确提示错误位置

---

## 20. 安全设计

### 20.1 安全边界

虽然网站无登录和复杂后端，仍需注意：

- 外链安全
- Markdown 内容注入风险
- 可执行脚本注入风险

### 20.2 处理策略

- Markdown 渲染时避免不受控 HTML
- 外链统一加 rel="noopener noreferrer"
- 不接受用户在线输入内容，因此 XSS 风险较低
- 如后续引入表单，需增加防刷与验证机制

---

## 21. 部署设计

### 21.1 构建流程

1. 拉取代码
2. 安装依赖
3. 构建站点
4. 输出静态资源
5. 上传到 CDN/静态托管平台

### 21.2 环境划分

- 开发环境：本地热更新
- 预览环境：PR 预览部署
- 生产环境：正式域名

### 21.3 域名与资源

- 主域名用于首页
- 图片资源走静态托管或 CDN
- PDF 简历放在 public 或独立静态资源目录

---

## 22. 版本规划

### 22.1 第一版

目标：满足 PRD 中 P0 需求。

实现内容：

- 首页
- 项目展示
- 时间线
- 联系方式
- 简历下载
- 响应式适配
- SEO 基础
- 基础性能优化

### 22.2 第二版

实现内容：

- 项目详情页
- 博客系统
- 主题切换
- 标签筛选
- 搜索
- 数据统计
- OG 图

### 22.3 第三版

实现内容：

- 多语言
- 自动同步 GitHub 项目数据
- 后台管理或半自动内容管理
- AI 简历问答助手
- 邮件订阅

---

## 23. 风险与应对

### 23.1 内容不足风险

风险：页面空、缺少说服力。

应对：优先整理真实项目、真实指标、真实时间线，宁可少也不要虚。

### 23.2 设计过度风险

风险：视觉炫技影响可读性。

应对：坚持极简、低干扰、内容优先。

### 23.3 维护成本风险

风险：内容更新复杂，导致长期不维护。

应对：采用文件驱动内容管理，减少流程成本。

### 23.4 性能下降风险

风险：图片、字体、动画、统计脚本拖慢首屏。

应对：严格控制资源大小，优先静态输出。

---

## 24. 验收标准对应技术检查项

### 24.1 首页

- 首屏显示姓名、定位、简介、CTA
- 核心社交链接可点击
- 重点项目至少 3 个
- 无横向滚动

### 24.2 项目

- 项目字段完整
- 详情页可正常访问
- 外链打开正常
- 封面图显示正确

### 24.3 时间线

- 按时间倒序
- 支持类型标签
- 移动端阅读良好

### 24.4 性能

- Lighthouse Performance 90+
- 图片压缩完成
- 首屏 JS 轻量

### 24.5 SEO

- 页面 title / description 独立
- sitemap 可生成
- OG 分享图可展示

---

## 25. 推荐实现顺序

### 阶段 1：基础框架

1. 搭建 Astro 项目结构
2. 配置 Tailwind、TypeScript、路径别名
3. 建立内容目录和类型定义
4. 完成基础布局与导航

### 阶段 2：核心页面

1. 首页
2. 项目列表与卡片
3. 时间线页
4. 简历页
5. 联系区

### 阶段 3：增强功能

1. 项目详情页
2. 博客系统
3. 主题切换
4. 搜索与筛选
5. SEO 增强

### 阶段 4：上线优化

1. 性能优化
2. OG 图与 sitemap
3. 统计接入
4. 最终验收

---

## 26. 附录：建议实现清单

### 26.1 必做文件

- src/pages/index.astro
- src/pages/projects/index.astro
- src/pages/projects/[slug].astro
- src/pages/timeline.astro
- src/pages/cv.astro
- src/layouts/BaseLayout.astro
- src/components/ProjectCard.astro
- src/components/TimelineItem.astro
- src/components/SocialLinks.astro
- src/components/SEO.astro
- src/lib/content.ts
- src/lib/seo.ts
- src/types/content.ts

### 26.2 必备配置

- astro.config.mjs
- tailwind.config.mjs
- tsconfig.json
- sitemap 配置
- robots 配置

---

## 27. 结语

本技术方案坚持“静态优先、内容驱动、长期可维护”的原则，优先完成能直接支撑个人品牌展示的核心能力。第一版不追求功能全面，而是确保首页、项目、时间线和联系方式能够清晰表达个人价值；随后再逐步补充博客、搜索、主题切换和多语言等能力，形成可持续迭代的个人作品集网站。
