# DP UI P0 Vue API Spec

本文档冻结 `@dp/ui` 第一阶段组件 API。来源为 `pencil-design-system.pen` 当前选中的 `基础组件`、`组件1`、`组件2`，目标是把设计里的状态组件整理为 Vue 3 组件的 props、slots、emits 和 CSS state。

## 范围

P0 只包含可跨业务复用的基础组件，不包含完整页面模板。

- `Button` / `IconButton`
- `Input` / `SearchInput` / `Select` / `Textarea`
- `Tag`
- `NavItem` / `Tab` / `SegmentedTabs`
- `Table`
- `Card` / `MetricCard`
- `Icon`

## 通用约定

- Vue 版本：Vue 3 + TypeScript。
- 双向绑定：统一使用 `modelValue` 和 `update:modelValue`。
- 样式来源：只能使用 `src/tokens/tokens.css` 中的 `--dp-*` token。
- 组件注册名：插件注册统一加 `Dp` 前缀，例如 `DpButton`。
- 源码导出名：保留无前缀命名，例如 `Button`、`Tag`。
- 状态处理：`hover`、`pressed`、`focused` 优先用 CSS pseudo-class；`disabled`、`selected`、`loading`、`error` 用 props。
- 插槽命名：装饰内容用 `prefix` / `suffix` / `icon`，结构区域用 `header` / `footer` / `actions`。
- 可访问性：交互组件必须透传合理的 `aria-*`，纯装饰图标默认 `aria-hidden="true"`。

## 状态映射

| 设计状态 | Vue 表达 | 实现方式 |
| --- | --- | --- |
| `md` / `default` | 默认 props | 基础样式 |
| `hover` | 无 props | `:hover` |
| `pressed` | 无 props | `:active` |
| `focused` | 无 props | `:focus-visible` |
| `disabled` | `disabled` | prop + disabled attribute / aria-disabled |
| `selected` / `active` | `selected` / `active` | prop + state class |
| `loading` | `loading` | prop + loading slot |
| `error` | `error` / `status="error"` | prop + state class |
| `open` | `open` / `modelValue` | controlled state |

## Button

设计来源：

- `Btn/DP/CreateTopic/md`
- `Btn/DP/CreateTopic/hover`
- `Btn/DP/CreateTopic/pressed`
- `Btn/DP/CreateTopic/disabled`
- `Btn/DP/AddSource/*`
- `Btn/DP/IconOnly/*`
- `Btn/DP/FormPrimary/sm`
- `Btn/DP/FormSecondary/sm`
- `DP2/Button/IconOnly/*`

### 组件

- `Button`
- `IconButton`

### Props

| Prop | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'outline' \| 'destructive'` | `'primary'` | 视觉层级 |
| `size` | `'sm' \| 'md'` | `'md'` | 设计稿目前以 28 / 32px 为主 |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | 原生按钮类型 |
| `disabled` | `boolean` | `false` | 禁用态 |
| `loading` | `boolean` | `false` | 加载态，触发时禁用点击 |
| `active` | `boolean` | `false` | 用于 toggle / selected 类按钮 |
| `block` | `boolean` | `false` | 宽度撑满容器 |
| `iconOnly` | `boolean` | `false` | 仅图标按钮；后续可由 `IconButton` 内部固定 |
| `iconPosition` | `'left' \| 'right'` | `'left'` | 文本按钮图标位置 |

### Slots

| Slot | 说明 |
| --- | --- |
| `default` | 按钮文本 |
| `icon` | 图标 |
| `loading` | 自定义加载图标 |

### Emits

| Event | Payload | 说明 |
| --- | --- | --- |
| `click` | `MouseEvent` | `disabled` 或 `loading` 时不触发 |

### 当前实现状态

`src/components/Button/Button.vue` 已实现 `variant`、`size`、`iconOnly`、`disabled`、`type`、`loading`、`active`、`block`、`iconPosition`、`icon/loading` slot 和 `click`。`secondary` 表示品牌浅底按钮，`outline` 表示描边按钮。

## Input

设计来源：

- `DP/Input/Search/md`
- `DP/Input/Search/hover/md`
- `DP/Input/Search/focused/md`
- `DP/Input/Search/error/md`
- `DP/Input/Search/disabled/md`
- `DP/Form/TextInput/md`
- `DP/Form/Select/md`
- `DP/Form/TextArea/md`

### 组件

- `Input`
- `SearchInput`
- `Select`
- `Textarea`

### Props

| Prop | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `modelValue` | `string \| number` | `''` | 输入值 |
| `placeholder` | `string` | `''` | 占位文案 |
| `size` | `'sm' \| 'md'` | `'md'` | 尺寸 |
| `disabled` | `boolean` | `false` | 禁用态 |
| `readonly` | `boolean` | `false` | 只读 |
| `clearable` | `boolean` | `false` | 展示清除按钮 |
| `error` | `boolean` | `false` | 错误态 |
| `errorMessage` | `string` | `''` | 错误提示 |
| `prefixIcon` | `string` | `undefined` | 内置图标名 |
| `suffixIcon` | `string` | `undefined` | 内置图标名 |
| `options` | `Array<SelectOption>` | `[]` | 仅 `Select` 使用 |

### Slots

| Slot | 说明 |
| --- | --- |
| `prefix` | 输入框前置内容 |
| `suffix` | 输入框后置内容 |
| `option` | `Select` 选项渲染 |
| `empty` | `Select` 无数据内容 |

### Emits

| Event | Payload | 说明 |
| --- | --- | --- |
| `update:modelValue` | `string \| number` | 输入变化 |
| `change` | `string \| number` | 提交变化 |
| `focus` | `FocusEvent` | 聚焦 |
| `blur` | `FocusEvent` | 失焦 |
| `clear` | `MouseEvent` | 清除 |

### 当前实现状态

`src/components/Input/Input.vue` 已实现 `modelValue`、`type`、`placeholder`、`size`、`disabled`、`readonly`、`clearable`、`error`、`errorMessage`、`prefixIcon`、`suffixIcon`、`prefix/suffix` slot 和全部输入事件。`src/components/SearchInput/SearchInput.vue` 已复用 `Input`，默认提供搜索图标和可清除能力。待补齐：`Select`、`Textarea`。

## Tag

设计来源：

- `DP/DataDisplay/Tag3/default/sm`
- `DP/DataDisplay/Tag3/primary/sm`
- `DP/DataDisplay/Tag3/hover/sm`
- `DP/DataDisplay/Tag3/selected/sm`
- `DP/DataDisplay/Tag3/success/sm`
- `DP/DataDisplay/Tag3/warning/sm`
- `DP/DataDisplay/Tag3/disabled/sm`
- `DP2/DataDisplay/Tag/keyword/sm`
- `DP2/DataDisplay/KeywordTag/soft/sm`

### 组件

- `Tag`

### Props

| Prop | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `variant` | `'default' \| 'primary' \| 'success' \| 'warning' \| 'info' \| 'keyword'` | `'default'` | 语义变体 |
| `size` | `'sm' \| 'md'` | `'sm'` | 尺寸 |
| `selected` | `boolean` | `false` | 选中态 |
| `disabled` | `boolean` | `false` | 禁用态 |
| `closable` | `boolean` | `false` | 可关闭 |
| `icon` | `string` | `undefined` | 内置图标名 |

### Slots

| Slot | 说明 |
| --- | --- |
| `default` | 标签文本 |
| `icon` | 自定义图标 |

### Emits

| Event | Payload | 说明 |
| --- | --- | --- |
| `click` | `MouseEvent` | 点击标签 |
| `close` | `MouseEvent` | 点击关闭 |

### 当前实现状态

`src/components/Tag/Tag.vue` 已实现 `variant`、`size`、`selected`、`disabled`、`closable`、`icon`、`icon` slot、`click` 和 `close`。为兼容早期样板，`variant="disabled"` 仍会被识别为禁用态。

## Navigation

设计来源：

- `DP/Navigation/SideNavItem/*`
- `DP/Navigation/TabItem/*`
- `DP/Navigation/ViewToggle/*`
- `DP/Navigation/TabRow/*`
- `DP/Navigation/HomeSideNav/*`
- `DP2/Navigation/UnderlineTab/*`
- `DP2/Navigation/Breadcrumb/compact`

### 组件

- `NavItem`
- `Tab`
- `SegmentedTabs`
- `Breadcrumb`

### Props

| Prop | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `value` | `string \| number` | 必填 | 当前项值 |
| `label` | `string` | `''` | 文案 |
| `icon` | `string` | `undefined` | 图标名 |
| `active` | `boolean` | `false` | 激活态 |
| `disabled` | `boolean` | `false` | 禁用态 |
| `collapsed` | `boolean` | `false` | 侧边栏折叠态 |
| `badge` | `string \| number` | `undefined` | 徽标 |
| `items` | `Array<NavigationItem>` | `[]` | 组合型导航使用 |
| `modelValue` | `string \| number` | `undefined` | 当前选中值 |

### Slots

| Slot | 说明 |
| --- | --- |
| `icon` | 自定义图标 |
| `badge` | 自定义徽标 |
| `item` | 列表项渲染 |

### Emits

| Event | Payload | 说明 |
| --- | --- | --- |
| `select` | `NavigationItem` | 选择导航项 |
| `update:modelValue` | `string \| number` | 更新选中值 |

## Table

设计来源：

- `DP/Table/ColumnHeader/*`
- `DP/Table/SortIndicator/*`
- `DP/Table/TableHeader/md`
- `DP/Table/TableRow/*`
- `DP/Table/ActionCell/*`
- `DP/Table/EmptyRow/md`
- `DP/Table/LoadingRow/md`
- `DP/Table/TableContainer/*`

### 组件

- `Table`

### Props

| Prop | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `columns` | `Array<TableColumn>` | `[]` | 列定义 |
| `data` | `Array<Record<string, unknown>>` | `[]` | 数据源 |
| `rowKey` | `string \| ((row) => string)` | `'id'` | 行 key |
| `loading` | `boolean` | `false` | 加载态 |
| `emptyText` | `string` | `'暂无数据'` | 空态文案 |
| `selectable` | `boolean` | `false` | 是否可选 |
| `selectedKeys` | `Array<string>` | `[]` | 已选行 |
| `sortBy` | `TableSort` | `undefined` | 排序状态 |
| `bordered` | `boolean` | `false` | 是否展示外边框 |
| `size` | `'sm' \| 'md'` | `'md'` | 行高密度 |

### Slots

| Slot | 说明 |
| --- | --- |
| `headerCell` | 表头单元格 |
| `cell` | 普通单元格 |
| `actions` | 行操作 |
| `empty` | 空态 |
| `loading` | 加载态 |

### Emits

| Event | Payload | 说明 |
| --- | --- | --- |
| `sortChange` | `TableSort` | 排序变化 |
| `rowClick` | `TableRowContext` | 点击行 |
| `selectionChange` | `Array<string>` | 勾选变化 |

## Card

设计来源：

- `DP2/Foundation/Surface/Card/elevated`
- `DP2/Foundation/Surface/Card/subtle`
- `DP/Content/TopicCard/*`
- `DP/DataDisplay/MetricMiniCard/*`
- `DP/Content/HomeTopicCard/*`

### 组件

- `Card`
- `MetricCard`

### Props

| Prop | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `variant` | `'default' \| 'subtle' \| 'elevated' \| 'interactive'` | `'default'` | 卡片样式 |
| `padding` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'md'` | 内边距 |
| `radius` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'lg'` | 圆角 |
| `clickable` | `boolean` | `false` | 是否可点击 |
| `selected` | `boolean` | `false` | 选中态 |
| `disabled` | `boolean` | `false` | 禁用态 |

### Slots

| Slot | 说明 |
| --- | --- |
| `default` | 主体 |
| `header` | 头部 |
| `footer` | 底部 |
| `actions` | 操作区 |

### Emits

| Event | Payload | 说明 |
| --- | --- | --- |
| `click` | `MouseEvent` | 卡片点击 |

## Icon

设计来源：

- `DP2/Icon/16/*`
- `DP2/Icon/20/*`
- `DP2/Icon/24/*`

### 组件

- `Icon`

### Props

| Prop | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `name` | `IconName` | 必填 | 图标名 |
| `size` | `16 \| 20 \| 24 \| number` | `16` | 图标尺寸 |
| `color` | `string` | `'currentColor'` | 图标颜色 |
| `decorative` | `boolean` | `true` | 是否为纯装饰图标 |
| `label` | `string` | `undefined` | 非装饰图标的可访问名称 |

### Slots

无。

### Emits

无。

## 建议实现顺序

1. 补齐 `Button` 和 `Tag` 到本文档定义，保持现有 API 兼容。
2. 新增 `Icon`，让 `Button`、`Tag`、`Navigation` 使用统一图标入口。
3. 新增 `Input` / `SearchInput`，沉淀 form control 基础样式。
4. 新增 `Card`，承接 `TopicCard`、`MetricCard` 等 P1 组合组件。
5. 新增 `Navigation` 和 `Table`，覆盖页面框架和数据展示主路径。

## 待确认项

- 是否将导出名统一改为 `DpButton`，还是继续源码无前缀、插件注册加 `Dp` 前缀。
- `destructive` 是否进入 P0，还是等业务有删除/危险操作场景再补。
- `Table` 是否要内置虚拟滚动；当前建议不进入 P0。
- 图标是否直接内置 SVG，还是先用 symbol sprite / icon font。
