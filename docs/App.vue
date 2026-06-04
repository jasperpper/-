<script setup lang="ts">
import { ref } from 'vue'
import { Button, Icon, Input, SearchInput, Tag } from '../src'

const clicks = ref(0)
const tags = ref(['专题', '精选', '已关注', '需处理'])
const keyword = ref('')
const title = ref('DataPocket')

function removeTag(i: number) {
  tags.value.splice(i, 1)
}
</script>

<template>
  <main class="page">
    <header class="page__head">
      <h1>DP UI</h1>
      <p>DataPocket 设计系统 · Vue 3 组件库样板（token 驱动，源自 pencil-design-system.pen）</p>
    </header>

    <section class="block">
      <h2>Button</h2>

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

      <p class="hint">点击主按钮次数：{{ clicks }}</p>
    </section>

    <section class="block">
      <h2>Input</h2>

      <div class="row">
        <Input v-model="title" placeholder="请输入标题" clearable />
        <SearchInput v-model="keyword" placeholder="搜索专题、来源或指标" />
        <Input placeholder="错误状态" error error-message="请输入有效内容" />
        <Input placeholder="禁用状态" disabled />
      </div>

      <p class="hint">标题：{{ title || '空' }}；搜索词：{{ keyword || '空' }}</p>
    </section>

    <section class="block">
      <h2>Tag</h2>

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
    </section>

    <section class="block">
      <h2>Icon</h2>
      <div class="row icons">
        <Icon name="search" :size="20" />
        <Icon name="calendar" :size="20" />
        <Icon name="panelRight" :size="20" />
        <Icon name="pencil" :size="20" />
        <Icon name="document" :size="20" />
        <Icon name="message" :size="20" />
        <Icon name="report" :size="20" />
        <Icon name="send" :size="20" />
      </div>
    </section>
  </main>
</template>

<style scoped>
.page {
  max-width: 880px;
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
:global(body) {
  background: var(--dp-background);
  margin: 0;
}
</style>
