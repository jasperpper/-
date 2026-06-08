# @dp/ui

DataPocket 设计系统 Vue 3 组件库。所有样式来自 `pencil-design-system.pen` 的设计令牌（62 个 token），改 `src/tokens/tokens.css` 即可全库联动。

这是从当前选中的 `基础组件`、`组件1`、`组件2` 画布归并生成的 Vue 3 组件库。选中设计中 269 个 reusable 节点已整理为可维护的组件族：基础控件、表单、导航、覆盖层、内容卡片、表格、布局、AI、Detail、Studio 和场景模板。

## 设计到代码规范

- [P0 Vue API Spec](./docs/p0-api-spec.md)：第一阶段基础组件的 props、slots、events、状态映射和实现顺序。
- [Component Coverage](./docs/component-coverage.md)：选中画布设计节点到 Vue 组件族的覆盖映射。
- [Raw Components](./docs/raw-components.md)：269 个设计稿 reusable 节点的 raw 快照导出清单。

## 开发

```bash
npm install
npm run dev      # 打开 playground 预览组件
npm run build    # 产出 dist（ESM + UMD + 类型 + 样式）
```

## 在其他项目中使用

```bash
npm install @dp/ui
```

全量注册（插件方式，组件名前缀 `Dp`）：

```ts
import { createApp } from 'vue'
import DpUI from '@dp/ui'
import '@dp/ui/style.css'

createApp(App).use(DpUI).mount('#app')
// 模板里：<DpButton>新建专题</DpButton>
```

按需引入（tree-shaking）：

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Button, Card, DataTable, Icon, SearchInput, SideNav, Tag, TopicCard } from '@dp/ui'
import '@dp/ui/style.css'

const keyword = ref('')
const nav = ref('home')
const navItems = [{ label: '首页', value: 'home', icon: 'document' }]
const columns = [{ key: 'name', title: '名称' }]
const data = [{ id: 1, name: 'DP 组件' }]
</script>

<template>
  <SideNav v-model="nav" :items="navItems" />
  <Button @click="onClick">
    <template #icon><Icon name="plus" /></template>
    新建专题
  </Button>
  <SearchInput v-model="keyword" placeholder="搜索专题" />
  <Tag variant="success" icon="document">已关注</Tag>
  <Card><TopicCard title="推荐专题" description="来自设计画布的内容卡片" /></Card>
  <DataTable :columns="columns" :data="data" />
</template>
```

## 组件 API

### Button

| Prop           | 类型                                                                 | 默认      | 说明                 |
| -------------- | -------------------------------------------------------------------- | --------- | -------------------- |
| `variant`      | `'primary' \| 'secondary' \| 'ghost' \| 'outline' \| 'destructive'`  | `primary` | 视觉变体             |
| `size`         | `'sm' \| 'md'`                                                       | `md`      | 尺寸（28 / 32px 高） |
| `iconOnly`     | `boolean`                                                            | `false`   | 纯图标正方形按钮     |
| `iconPosition` | `'left' \| 'right'`                                                  | `left`    | 图标位置             |
| `disabled`     | `boolean`                                                            | `false`   | 禁用                 |
| `loading`      | `boolean`                                                            | `false`   | 加载中               |
| `active`       | `boolean`                                                            | `false`   | 激活态               |
| `block`        | `boolean`                                                            | `false`   | 宽度撑满容器         |

- 事件：`click`
- 插槽：默认（文字）、`icon`（图标）、`loading`（加载图标）

### Input / SearchInput

| Prop          | 类型                 | 默认      | 说明       |
| ------------- | -------------------- | --------- | ---------- |
| `modelValue`  | `string \| number`   | `''`      | 输入值     |
| `placeholder` | `string`             | `''`      | 占位文案   |
| `size`        | `'sm' \| 'md'`       | `md`      | 尺寸       |
| `disabled`    | `boolean`            | `false`   | 禁用       |
| `readonly`    | `boolean`            | `false`   | 只读       |
| `clearable`   | `boolean`            | `false`   | 可清除     |
| `error`       | `boolean`            | `false`   | 错误态     |
| `errorMessage`| `string`             | `''`      | 错误提示   |
| `prefixIcon`  | `string`             | -         | 前置图标名 |
| `suffixIcon`  | `string`             | -         | 后置图标名 |

- 事件：`update:modelValue`、`change`、`focus`、`blur`、`clear`
- 插槽：`prefix`、`suffix`
- `SearchInput` 默认 `type="search"`、`prefixIcon="search"`、`clearable=true`

### Tag

| Prop       | 类型                                                                             | 默认      | 说明       |
| ---------- | -------------------------------------------------------------------------------- | --------- | ---------- |
| `variant`  | `'default' \| 'primary' \| 'success' \| 'warning' \| 'info' \| 'keyword'`         | `default` | 语义变体   |
| `size`     | `'sm' \| 'md'`                                                                   | `sm`      | 尺寸       |
| `selected` | `boolean`                                                                        | `false`   | 选中描边态 |
| `disabled` | `boolean`                                                                        | `false`   | 禁用       |
| `closable` | `boolean`                                                                        | `false`   | 可关闭     |
| `icon`     | `string`                                                                         | -         | 内置图标名 |

- 事件：`click`、`close`
- 插槽：默认（文字）、`icon`（图标）

### Icon

| Prop         | 类型                         | 默认           | 说明               |
| ------------ | ---------------------------- | -------------- | ------------------ |
| `name`       | `IconName \| string`         | 必填           | 图标名             |
| `size`       | `16 \| 20 \| 24 \| number`   | `16`           | 图标尺寸           |
| `color`      | `string`                     | `currentColor` | 图标颜色           |
| `decorative` | `boolean`                    | `true`         | 是否为纯装饰图标   |
| `label`      | `string`                     | -              | 非装饰图标访问名称 |

### More Components

完整导出组件见 [Component Coverage](./docs/component-coverage.md)。核心组件包括：

`Button`, `Icon`, `Input`, `SearchInput`, `Select`, `Textarea`, `Tag`, `Card`, `MetricCard`, `NavItem`, `Tab`, `SegmentedTabs`, `Breadcrumb`, `SideNav`, `MenuItem`, `DropdownMenu`, `EmptyState`, `LockedContent`, `DataTable`, `Table`, `TopicCard`, `RecentAccessCard`, `ListRow`, `Tile`, `CoverThumbnail`, `SectionHeader`, `PageHeader`, `TopNav`, `AppShell`, `AskBox`, `AnswerBlock`, `DialogInput`, `SourcePanel`, `CenterDialog`, `FeatureGrid`, `FeaturedTopicsPage`。

## Raw Components

`raw-components` 是设计稿原始节点快照层，适合设计还原、走查和 AI 生成参考，不建议替代正式组件 API。

```vue
<script setup lang="ts">
import { RawGallery, RawNode, RawBtnDPCreateTopicMd } from '@dp/ui'
</script>

<template>
  <RawNode name="Btn/DP/CreateTopic/md" />
  <RawBtnDPCreateTopicMd />
  <RawGallery query="DP/Input" :limit="20" />
</template>
```

说明：

- `RawNode`：按设计节点名或 id 渲染 raw 快照。
- `RawGallery`：渲染 raw 节点画廊，可用 `query` 过滤。
- `Raw*` 命名导出：每个 reusable 设计节点都有对应导出。

## 发布到 git.woa.com 私有 npm

1. 在 `package.json` 把 `name` 改成公司规范的 scope（如 `@tencent/dp-ui`），并设置 `publishConfig.registry` 指向内部 registry。
2. `npm run build`
3. `npm publish`
