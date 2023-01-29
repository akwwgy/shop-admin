<template>
  <div>
    <el-tabs v-model="searchForm.tab" class="demo-tabs" @tab-change="getData">
      <el-tab-pane :label="item.name" :name="item.key" v-for="(item, index) in tabbars"></el-tab-pane>
    </el-tabs>
    <el-card shadow="never" class="border-0">
      <!-- 搜索框 -->
      <el-form :model="searchForm" label-width="80px" class=" mb-3">
        <el-row :gutter="20">
          <el-col :span="8" :offset="0">
            <el-form-item label="关键词">
              <el-input v-model="searchForm.title" placeholder="商品名称" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="8">
            <el-form-item>
              <div class=" flex justify-end items-center">
                <el-button type="primary" @click="getData">搜索</el-button>
                <el-button type="primary" @click="resetSearchFrom">重置</el-button>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- //新增刷新 -->
      <ListHeader @create="handleCreate" @refresh="getData"></ListHeader>
      <el-table :data="tableData" stripe style="width:100%" v-loading="loading">
        <el-table-column label="管理员" width="200">
          <template #default="{ row }">
            <div>
              <el-avatar :size="40" src="row.avatar" @error="errorHandler">
                <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
              </el-avatar>
            </div>
            <div class="ml-3">
              <h2>{{ row.username }}</h2>
              <small>ID:{{ row.id }}</small>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="所属角色" align="center">
          <template #default="{ row }">
            {{ row.role ? row.role.name : "" }}
          </template>
        </el-table-column>
        <el-table-column label="状态" width="120">
          <template #default="{ row }">
            <!-- <el-switch :modelValue="row.status" :active-value="1" :inactive-value="0" :disabled="row.super == 1"
            :loading="row.statusLoading" @change="handleStatusChange($event, row)">
          </el-switch> -->
            <el-switch :modelValue="row.status" :active-value="1" :inactive-value="0" :loading="row.statusLoading"
              :disabled="row.super == 1" @change="handleStatusChange($event, row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="发布时间" width="380"></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template #default="scope">
            <small v-if="scope.row.super == 1" class="text-sm text-gary-500">暂无操作</small>
            <div v-else>
              <el-button type="primary" size="small" text @click="handleEdit(scope.row)">修改</el-button>
              <span @click.stop="() => { }">
                <el-popconfirm title="是否要删除该管理员？" confirmButtonText="确认" cancelButtonText="取消"
                  @confirm="handleDelete(scope.row.id)">
                  <template #reference>
                    <el-button text class="px-1" type="primary" size="small">
                      删除
                    </el-button>
                  </template>
                </el-popconfirm>
              </span>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <div class="flex justify-center items-center mt-5">
        <el-pagination background layout="prev, pager,next" :total="total" :current-page="currentPage"
          :page-size="limit" @current-change="getData" />
      </div>
      <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
        <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item label="头像" prop="avatar">
            <ChooseImage v-model="form.avatar" />
          </el-form-item>
          <el-form-item label="所属角色" prop="role_id">
            <el-select v-model="form.role_id" placeholder="选择所属角色">
              <el-option v-for="item in roles" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态" prop="content">
            <el-switch v-model="form.status" :active-value="1" :inactive-value="0">
            </el-switch>
          </el-form-item>
        </el-form>
      </FormDrawer>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getGoodsList, updateGoodsStatus, createGoods, updateGoods, deleteGoods } from '@/api/goods.js'
import FormDrawer from '@/components/FormDrawer.vue'
import ChooseImage from '@/components/ChooseImage.vue'
import ListHeader from "@/components/ListHeader.vue"

import { useInitTable, useInitForm } from '@/composables/useCommon.js'

const roles = ref([])

const {
  searchForm,
  resetSearchFrom,
  tableData,
  loading,
  currentPage,
  total,
  limit,
  handleDelete,
  handleStatusChange,
  getData
} = useInitTable({
  searchForm: {
    title: "",
    tab: "all",
    category_id: null,
  },
  getList: getGoodsList,
  onGetListSuccess: (res) => {
    // console.log(res);
    tableData.value = res.list.map(o => {
      //利用map添加属性
      o.statusLoading = false;
      return o
    })
    total.value = res.totalCount
    roles.value = res.roles
  },
  delete: deleteGoods,
  updateStatus: updateGoodsStatus
});

const {
  formDrawerRef,
  formRef,
  form,
  rules,
  drawerTitle,
  handleSubmit,
  handleCreate,
  handleEdit,
} = useInitForm({
  form: {
    username: "",
    password: "",
    role_id: null,
    status: 1,
    avatar: ""
  },
  getData,
  update: updateGoods,
  create: createGoods
})

const tabbars = [{
  key: "all",
  name: "全部"
}, {
  key: "checking",
  name: "审核中"
}, {
  key: "saling",
  name: "出售中"
}, {
  key: "off",
  name: "已下架"
}, {
  key: "min_stock",
  name: "库存预警"
}, {
  key: "delete",
  name: "回收站"
}]



</script>

<style scoped>

</style>