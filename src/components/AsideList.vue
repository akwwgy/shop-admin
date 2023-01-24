<template>
  <div class="aside-list" :class="{ 'active': active }">
    <span class="truncate">
      <slot />
    </span>
    <!-- 因为外层是flex布局，所以使用ml-auto可以使其及其后面的元素都在右边 -->
    <el-button class="ml-auto px-1" text type="primary" size="small" @click="$emit('edit')">
      <el-icon :size="12">
        <Edit />
      </el-icon>
    </el-button>
    <el-button text type="primary" size="small" @click="$emit('delete')">
      <el-icon :size="12">
        <Close />
      </el-icon>
    </el-button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
defineProps({
  active: {
    type: Boolean,
    default: false
  }
})
//这是引入父组件的两个事件进来 
defineEmits(["edit", "delete"])
</script>

<style>
.aside-list {
  border-bottom: 1px solid #f4f4f4;
  @apply flex items-center p-3 text-sm text-gray-600;
}

.aside-list:hover {
  @apply bg-blue-50;
}
</style>