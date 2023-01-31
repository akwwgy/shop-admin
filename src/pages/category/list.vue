<template>
  <el-card shadow="never" class="border-0">
    <ListHeader @create="handleCreate" @refresh="getData" />
    <el-tree :data="tableData" :props="{ label: 'name', children: 'child' }" v-loading="loading" node-key="id">
      <template #default="{ node, data }">
        <div class="custom-tree-node">
          <span>{{ data.name }}</span>
          <div class="ml-auto">
            <el-button text type="primary" size="small">推荐商品</el-button>
            <el-switch :modelValue="data.status" :active-value="1" :inactive-value="0"
              @change="handleStatusChange($event, data)" />
            <el-button text type="primary" size="small" @click.stop="handleEdit(data)">修改</el-button>


            <el-popconfirm title="是否要删除该记录？" confirmButtonText="确认" cancelButtonText="取消"
              @confirm="handleDelete(data.id)">
              <template #reference>
                <el-button text type="primary" size="small">删除</el-button>
              </template>
            </el-popconfirm>
          </div>

        </div>
      </template>
    </el-tree>

    <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
      <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
        <el-form-item label="菜单/规则" prop="menu">
          <el-radio-group v-model="form.menu">
            <el-radio :label="1" border>菜单</el-radio>
            <el-radio :label="0" border>规则</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" style="width: 30%;" placeholder="名称"></el-input>
        </el-form-item>
        <el-form-item label="菜单图标" prop="icon" v-if="form.menu == 1">
          <IconSelect v-model="form.icon" />
        </el-form-item>
        <el-form-item label="前端路由" prop="frontpath" v-if="form.menu == 1 && form.rule_id > 0">
          <el-input v-model="form.frontpath" placeholder="前端路由"></el-input>
        </el-form-item>
        <el-form-item label="后端规则" prop="condition" v-if="form.menu == 0">
          <el-input v-model="form.condition" placeholder="后端规则"></el-input>
        </el-form-item>
        <el-form-item label="请求方式" prop="method" v-if="form.menu == 0">
          <el-select v-model="form.method" class="m-2" placeholder="请选择请求方式">
            <el-option v-for="item in ['GET', 'POST', 'PUT', 'DELETE']" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="排序" prop="order">
          <el-input-number v-model="form.order" :min="0" :max="1000" />
        </el-form-item>
      </el-form>
    </FormDrawer>

  </el-card>
</template>
<script setup>
import { ref } from "vue"
import ListHeader from "@/components/ListHeader.vue"
import FormDrawer from "@/components/FormDrawer.vue"
import IconSelect from "@/components/IconSelect.vue"
import {
  getCategoryList,
  createCategory,
  updateCategory,
  updateCategoryStatus,
  deleteCategory
} from "@/api/Category.js"

import {
  useInitTable,
  useInitForm
} from "@/composables/useCommon.js"

const defaultExpandedKeys = ref([])
const {
  loading,
  tableData,
  getData,

  handleDelete,
  handleStatusChange
} = useInitTable({
  getList: getCategoryList,
  onGetListSuccess: (res) => {
    tableData.value = res
  },
  delete: deleteCategory,
  updateStatus: updateCategoryStatus
})


const {
  formDrawerRef,
  formRef,
  form,
  rules,
  drawerTitle,
  handleSubmit,
  handleCreate,
  handleEdit
} = useInitForm({
  form: {
    rule_id: 0,
    menu: 0,
    name: "",
    condition: "",
    method: "GET",
    status: 1,
    order: 50,
    icon: "",
    frontpath: ""
  },
  rules: {},

  getData,

  update: updateCategory,
  create: createCategory
})



</script>
<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  font-size: 14px;
  padding-right: 8px;
}

.el-tree-node__content {
  padding: 20px 0;
}
</style>