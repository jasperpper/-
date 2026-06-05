<script setup lang="ts">
import { ref } from 'vue'
import {
  AnswerBlock,
  AppShell,
  AskBox,
  BarChartCard,
  Button,
  Card,
  DataTable,
  EmptyState,
  FeatureGrid,
  Icon,
  Input,
  MetricCard,
  PageHeader,
  SearchInput,
  SegmentedTabs,
  Select,
  SideNav,
  Tag,
  Textarea,
  Tile,
  TopicCard,
} from '../src'

const clicks = ref(0)
const tags = ref(['专题', '精选', '已关注', '需处理'])
const keyword = ref('')
const title = ref('DataPocket')
const tab = ref('cards')
const nav = ref('home')
const selected = ref('a')
const question = ref('')

const navItems = [
  { label: '首页', value: 'home', icon: 'document' },
  { label: '专题', value: 'topics', icon: 'square' },
  { label: '消息', value: 'messages', icon: 'message', badge: 3 },
]

const options = [
  { label: '全部', value: 'all' },
  { label: '已关注', value: 'followed' },
]

const tableColumns = [
  { key: 'name', title: '名称', sortable: true },
  { key: 'owner', title: '负责人' },
  { key: 'status', title: '状态' },
]

const tableData = [
  { id: '1', name: '数据专题', owner: 'DP Team', status: '已上线' },
  { id: '2', name: '来源面板', owner: 'AI Team', status: '设计中' },
]

const features = [
  { title: '摘要生成', description: '快速生成内容总结', icon: 'zap' },
  { title: '报告分析', description: '读取数据并生成报告', icon: 'report' },
]

function removeTag(i: number) {
  tags.value.splice(i, 1)
}
</script>

<template>
  <AppShell>
    <template #sidebar>
      <SideNav v-model="nav" :items="navItems" />
    </template>

    <template #topbar>
      <PageHeader title="DP UI" subtitle="DataPocket 设计系统 · 选中画布组件 Vue 3 包">
        <template #actions>
          <Button size="sm">发布</Button>
        </template>
      </PageHeader>
    </template>

    <main class="page">
    <section class="block">
      <h2>基础控件</h2>
      <div class="row">
        <Button @click="clicks++">新建专题</Button>
        <Button variant="secondary">添加来源</Button>
        <Button variant="outline">描边按钮</Button>
        <Button variant="ghost">更多</Button>
        <Button variant="destructive">删除</Button>
        <Button disabled>禁用</Button>
      </div>

      <div class="row">
        <Button size="sm">小号主按钮</Button>
        <Button size="sm" variant="secondary">小号次按钮</Button>
        <Button active>
          <template #icon><Icon name="zap" /></template>
          已激活
        </Button>
        <Button loading>生成中</Button>
        <Button icon-position="right" variant="outline">
          <template #icon><Icon name="arrowUp" /></template>
          右侧图标
        </Button>
        <Button icon-only aria-label="搜索">
          <template #icon><Icon name="search" :size="20" /></template>
        </Button>
        <Button icon-only variant="outline" aria-label="更多">
          <template #icon><Icon name="ellipsisVertical" :size="20" /></template>
        </Button>
      </div>

      <div class="row">
        <Input v-model="title" placeholder="请输入标题" clearable />
        <SearchInput v-model="keyword" placeholder="搜索专题、来源或指标" />
        <Select v-model="selected" :options="options" />
        <Input placeholder="错误状态" error error-message="请输入有效内容" />
        <Textarea placeholder="多行输入" />
      </div>

      <SegmentedTabs v-model="tab" :options="[{ label: '卡片', value: 'cards' }, { label: '表格', value: 'table' }]" />
      <p class="hint">点击主按钮次数：{{ clicks }}；搜索词：{{ keyword || '空' }}</p>
    </section>

    <section class="block">
      <h2>标签与数据展示</h2>
      <div class="row">
        <Tag>专题</Tag>
        <Tag variant="primary">精选</Tag>
        <Tag variant="primary" selected>已选择</Tag>
        <Tag variant="success">已关注</Tag>
        <Tag variant="warning">需处理</Tag>
        <Tag variant="info">信息</Tag>
        <Tag variant="keyword">关键词</Tag>
        <Tag disabled>暂无权限</Tag>
        <Tag size="md" icon="document">文档</Tag>
      </div>

      <div class="row">
        <Tag
          v-for="(t, i) in tags"
          :key="t"
          variant="primary"
          closable
          @close="removeTag(i)"
          >{{ t }}</Tag
        >
      </div>

      <div class="grid three">
        <MetricCard label="访问量" value="12.8k" trend="+18%" />
        <MetricCard label="收藏数" value="340" muted />
        <BarChartCard title="来源热度" :data="[{ label: 'A', value: 40 }, { label: 'B', value: 80 }, { label: 'C', value: 56 }]" />
      </div>
    </section>

    <section class="block">
      <h2>内容与场景</h2>
      <div class="grid three">
        <TopicCard title="推荐专题" description="最近访问的数据专题" tag="精选" />
        <Tile title="文件夹" description="归档后的内容集合" icon="document" />
        <Card>
          <template #header>普通卡片</template>
          这里可以放任意业务内容。
        </Card>
      </div>
    </section>

    <section class="block">
      <h2>表格</h2>
      <DataTable :columns="tableColumns" :data="tableData" bordered />
    </section>

    <section class="block">
      <h2>AI / Studio</h2>
      <AskBox v-model="question" placeholder="问问这个专题" @submit="question = ''" />
      <AnswerBlock content="这里是 AI 回答内容，可放来源、操作和加载态。" />
      <FeatureGrid :items="features" />
      <EmptyState title="暂无更多内容" description="选中的画布组件已归并为 Vue 组件族。" />
    </section>
  </main>
  </AppShell>
</template>

<style scoped>
.page {
  max-width: 1120px;
  margin: 0 auto;
  padding: 48px 24px;
  font-family: var(--dp-font-zh);
  color: var(--dp-foreground);
}
.page__head h1 {
  font-size: 32px;
  margin: 0 0 8px;
}
.page__head p {
  color: var(--dp-muted-foreground);
  margin: 0;
}
.block {
  margin-top: 40px;
  padding: 24px;
  background: var(--dp-card);
  border: 1px solid var(--dp-border);
  border-radius: var(--dp-radius-lg);
}
.block h2 {
  font-size: 16px;
  margin: 0 0 16px;
}
.row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}
.hint {
  color: var(--dp-muted-foreground);
  font-size: 12px;
  margin: 0;
}
.icons {
  color: var(--dp-foreground-body);
}
.grid {
  display: grid;
  gap: 16px;
}
.grid.three {
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
}
:global(body) {
  background: var(--dp-background);
  margin: 0;
}
</style>
