<template>
  <div class=" flex justify-between items-center mb-4">
    <el-button type="primary" size="small" @click="$emit('create')">
      新增
    </el-button>
    <el-tooltip class="box-item" effect="dark" content="刷新数据" placement="top" @click="$emit('refresh')">
      <el-button text>
        <el-icon :size="20">
          <Refresh />
        </el-icon>
      </el-button>
    </el-tooltip>
  </div>
</template>

<script setup>

defineEmits(["create", "refresh"])
</script>

<style scoped>

</style>