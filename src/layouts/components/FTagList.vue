<template>
  <div class="f-tag-list" :style="{ left: $store.state.asideWidth }">
    <el-tabs v-model="activeTab" type="card" class="flex-1" @tab-remove="removeTab" style="overflow:auto"
      @tab-change="changeTab">
      <el-tab-pane v-for="item in tabList" :key="item.path" :closable="item.path != '/'" :label="item.title"
        :name="item.path">
      </el-tab-pane>
    </el-tabs>
    <span class="tag-btn">
      <el-dropdown @command="handleClose">
        <span class="el-dropdown-link">
          <el-icon>
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="clearAll">全部关闭</el-dropdown-item>
            <el-dropdown-item command="clearOther">关闭其他</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </span>
  </div>
  <!-- 定义一个占位符占住，不然下面的内容显示不出来 因为fiexed不占位，下面的会被盖住 -->
  <div style="height:40px"></div>
</template>

<script setup>
import { useTabList } from '@/composables/useTabList'
const { activeTab,
  tabList,
  changeTab,
  removeTab,
  handleClose, } = useTabList();
</script>

<style scoped>
.f-tag-list {
  @apply fixed bg-gray-100 flex items-center px-2;
  top: 64px;
  right: 0;
  height: 44px;
  z-index: 100;
}

.tag-btn {
  @apply bg-white rounded ml-auto flex justify-center items-center px-2;
  height: 32px;
  width: 32px;
}

:deep(.el-tabs__header) {
  border: 0 !important;
  @apply mb-0;
}

:deep(.el-tabs__nav) {
  @apply my-1;
  border: 0 !important;
}

:deep(.el-tabs__item) {
  @apply bg-white mx-1 rounded;
  height: 32px;
  line-height: 32px;
  border: 0 !important;
}

:deep(.is-disabled) {
  cursor: not-allowed;
  @apply text-gray-600;
}
</style>