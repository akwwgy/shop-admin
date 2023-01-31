<template>
  <FormDrawer ref="formDrawerRef">
    <el-table :data="tableData" border stripe style="width:100%">
      <el-table-column prop="goods_id" label="ID" width="60" />
      <el-table-column label="商品封面" width="180">
        <template #default="{ row }">
          <el-image :src="row.cover" fit="fill" :lazy="true" style="width:64px;height:64px"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="商品名称" width="180" />
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button type="primary" text size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </FormDrawer>
</template>

<script setup>
import { ref } from 'vue'
import FormDrawer from '@/components/FormDrawer.vue'

import {
  getCategoryGoods
} from "@/api/category.js"

const formDrawerRef = ref(null);
const category_id = ref(0);
const tableData = ref([])

//item拿到传过来的信息
const open = (item) => {
  category_id.value = item.id
  getData().then(res => {
    formDrawerRef.value.open()
  })
}

function getData() {
  //因为这个return 返回的是一个promise 所以使用getData的可以使用then方法
  return getCategoryGoods(category_id.value)
    .then(res => {
      console.log(res);
      tableData.value = res;
    }).finally(() => {

    })
}

defineExpose({
  open
})
</script>

<style scoped>

</style>