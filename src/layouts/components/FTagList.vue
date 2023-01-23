<template>
  <div class="f-tag-list" :style="{ left: $store.state.asideWidth }">
    <el-tabs v-model="activeTab" type="card" class="flex-1" @tab-remove="removeTab" style="overflow:auto">
      <el-tab-pane v-for="item in tabList" :key="item.path" :closable="item.path != '/'" :label="item.title"
        :name="item.path">
      </el-tab-pane>
    </el-tabs>
    <span class="tag-btn">
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-icon>
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>Action 1</el-dropdown-item>
            <el-dropdown-item>Action 2</el-dropdown-item>
            <el-dropdown-item>Action 3</el-dropdown-item>
            <el-dropdown-item disabled>Action 4</el-dropdown-item>
            <el-dropdown-item divided>Action 5</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </span>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { useCookies } from '@vueuse/integrations/useCookies'

const route = useRoute();
const cookie = useCookies();

const activeTab = ref(route.path)

const tabList = ref([
  {
    title: '后台首页',
    path: "/"
  },
  {
    title: '商品管理',
    path: "/goods/list"
  },
])

//添加标签导航
function addTab(tab) {
  //如果findIndex等于-1 就相当于没有找到
  let noTab = tabList.value.findIndex(t => t.path == tab.path) == -1
  if (noTab) {
    tabList.value.push(tab)
  }
  cookie.set("tabList", tabList.value)
}

onBeforeRouteUpdate((to, from) => {
  //如何添加之后，处于激活状态呢？
  activeTab.value = to.path
  addTab({ title: to.meta.title, path: to.path })
})

const removeTab = (targetName) => {
}
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