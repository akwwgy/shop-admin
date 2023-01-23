<template>
  <div>
    <el-row :gutter="20">
      <!-- elementplus默认一行24列 -->
      <el-col :span="6" :offset="0" v-for="(item, index) in panels" :key="index">
        <el-card shadow="hover" class=" border-0">
          <template #header>
            <div class="flex justify-between">
              <span>{{ item.title }}</span>
              <el-tag :type="item.unitColor" effect="plain">
                {{ item.unit }}
              </el-tag>
            </div>
          </template>
          <span class=" text-3xl font-bold text-gray-500">
            {{ item.value }}
          </span>
          <el-divider />
          <div class=" flex justify-between text-gray-500">
            <span>{{ item.subTitle }}</span>
            <span>{{ item.subValue }}</span>
          </div>
        </el-card>

      </el-col>
    </el-row>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getStatistics1 } from '@/api/index.js'

const panels = ref([]);
getStatistics1().then(res => {
  panels.value = res.panels;
  console.log(panels.value);
})


</script>

<style scoped>

</style>