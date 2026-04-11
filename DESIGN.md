# Anna Xiao 个人网站 · 设计文档

> 最后更新：2025年  
> 协作完成：Anna Xiao × Claude (Anthropic)

---

## 一、页面结构

| 文件名 | 页面 | 说明 |
|--------|------|------|
| `index.html` | 主页 Landing Page | Hero、关于我、教育背景、CTA |
| `journey.html` | 历程 Journey | 时间线，8个节点 |
| `projects.html` | 项目 Projects | 实习+项目卡片，共5张 |
| `interests.html` | 爱好 Interests | Bento Grid，7张卡片 |
| `gallery.html` | 摄影相册 Gallery | 瀑布流，23张照片，含灯箱 |
| `games.html` | 游戏经历 Games | 卡片列表，含平台/类型筛选 |

---

## 二、设计系统

### 色彩

| 名称 | 用途 | 色值 |
|------|------|------|
| `primary` | 品牌主色，樱花玫瑰 | `#864e5a` |
| `primary-container` | 主色浅版，按钮背景 | `#ffb7c5` |
| `primary-fixed` | 最浅粉，卡片背景 | `#ffd9df` |
| `secondary` | 茉莉金，强调色 | `#6f5d11` |
| `secondary-fixed` | 浅金黄，标签背景 | `#fae189` |
| `secondary-fixed-dim` | 金色，下划线装饰 | `#ddc570` |
| `tertiary` | 嫩叶绿，辅助色 | `#146a5f` |
| `tertiary-fixed` | 浅绿，标签背景 | `#a4f1e3` |
| `surface` | 页面底色，暖米白 | `#f5f0eb` |
| `surface-container-lowest` | 卡片白 | `#fdfaf6` |
| `surface-container-low` | 区块浅背景 | `#ede8e1` |
| `on-surface` | 正文深色 | `#1a1c1c` |
| `on-surface-variant` | 次要文字 | `#514345` |

### 字体

| 用途 | 字体 | 说明 |
|------|------|------|
| 标题 `font-headline` | Newsreader | 衬线，文艺感 |
| 正文 `font-body` | Plus Jakarta Sans | 无衬线，清晰易读 |

### 间距与圆角

- 卡片圆角：`1.25rem`–`2rem`（`rounded-2xl` / `rounded-3xl`）
- 大图卡片最小高度：`350px`–`400px`
- 页面最大宽度：`max-w-7xl`（1280px）

---

## 三、组件说明

### 导航栏
- 固定顶部，磨砂玻璃效果
- 背景：`rgba(245,240,235,0.88)` + `backdrop-filter:blur(20px)`
- 当前页面链接有 `border-b border-secondary-fixed-dim` 下划线标记

### 大图卡片（杂志封面风）
用于：摄影、游戏、品鉴生活、运动、手帐日记、阅读
```html
<div class="rounded-3xl overflow-hidden group relative min-h-[350px]">
  <div class="absolute inset-0 z-0"><img .../></div>
  <div class="absolute inset-0 bg-gradient-to-t from-xxx/80 to-transparent z-10"></div>
  <div class="absolute bottom-0 left-0 p-10 z-20">
    <span class="leaf-chip ...">类别标题</span>
    <h2 class="font-headline text-base text-white/80">副标题</h2>
    <p class="text-white/85 text-sm">说明文字</p>
  </div>
</div>
```

### 标签 Chips
- 绿色 `.leaf-chip`：`background:#a4f1e3; color:#00201c`
- 金色 `.leaf-chip-gold`：`background:#fae189; color:#221b00`
- 粉色 `.leaf-chip-pink`：`background:#ffd9df; color:#360c19`

### 植物阴影
```css
.botanical-shadow {
  box-shadow: 0 32px 64px -10px rgba(134, 78, 90, 0.09);
}
```

---

## 四、页面交互说明

### Journey 页面
- 滚动时卡片从左/右方向淡入（`.reveal-l` / `.reveal-r`）
- 使用 `IntersectionObserver` 触发动画

### Projects 页面
- 点击卡片弹出详情浮层（`openDetail(key)`）
- 详情内容存储在 JS 对象 `details` 中
- 后续可替换为真实详情页路由

### Gallery 摄影页
- 瀑布流布局：`columns: 2/3/4`
- 点击照片进入灯箱（`openLB(i)`）
- 支持键盘左右切换和 Esc 关闭

### Games 游戏页
- 顶部筛选按钮：按平台 / 类型 / 状态过滤
- 筛选逻辑：`data-platform` / `data-type` / `data-status` 属性匹配

---

## 五、后续待完善

- [ ] 导航栏各页面链接互相打通（目前部分链接为 `#`）
- [ ] Projects 详情页设计与开发
- [ ] Landing Page "近日生活"模块（最近在读/在刷/在玩）
- [ ] 联系表单功能接入（EmailJS 或 Formspree）
- [ ] 域名注册建议：`annaxiao.me`（.com 已被注册）
- [ ] 部署上线（推荐 Vercel 或 GitHub Pages，免费）

---

## 六、部署建议

**推荐方案：Vercel（免费）**
1. 将整个文件夹上传至 GitHub 仓库
2. 在 vercel.com 导入仓库，自动部署
3. 绑定自定义域名 `annaxiao.me`

**备选方案：GitHub Pages（免费）**
1. 新建仓库，上传所有文件
2. Settings → Pages → 选择 main 分支
3. 访问 `username.github.io/repo-name`

---

*Design & Code：Anna Xiao × Claude · 2025*
