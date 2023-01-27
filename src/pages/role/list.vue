<template>
  <el-card shadow="never" class="border-0">
    <!-- //新增刷新 -->
    <ListHeader @create="handleCreate" @refresh="getData"></ListHeader>
    <el-table :data="tableData" stripe style="width:100%" v-loading="loading">
      <el-table-column prop="name" label="角色名称"></el-table-column>
      <el-table-column prop="desc" label="角色描述" width="380"></el-table-column>
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
      <el-table-column label="操作" width="180" align="center">
        <template #default="scope">
          <el-button type="primary" size="small" text @click="handleEdit(scope.row)">修改</el-button>
          <span @click.stop="() => { }">
            <el-popconfirm title="是否要删除该分类？" confirmButtonText="确认" cancelButtonText="取消" @confirm="handleDelete">
              <template #reference>
                <el-button text class="px-1" type="primary" size="small" @click="handleDelete(scope.row.id)">
                  删除
                </el-button>
              </template>
            </el-popconfirm>
          </span>
        </template>
      </el-table-column>
    </el-table>

    <div class="flex justify-center items-center mt-5">
      <el-pagination background layout="prev, pager,next" :total="total" :current-page="currentPage" :page-size="limit"
        @current-change="getData" />
    </div>
    <FromDrawer :title="drawerTitle" ref="formDrawerRef" @submit="handleSubmit">
      <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="desc">
          <el-input v-model="form.desc" type="textarea" :rows="5"></el-input>
        </el-form-item>
        <el-form-item label="角色状态" prop="status">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="0">
          </el-switch>

        </el-form-item>
      </el-form>

    </FromDrawer>
  </el-card>
</template>

<script setup>
import ListHeader from "@/components/ListHeader.vue"
import { getRoleList, createRole, updateRole, deleteRole, updateRoleStatus } from '@/api/role.js'
import FromDrawer from '@/components/FormDrawer.vue'
import { useInitTable, useInitForm } from '@/composables/useCommon.js'



const {

  tableData,
  loading,
  currentPage,
  total,
  limit,
  getData,
  handleDelete,
  handleStatusChange
} = useInitTable({
  getList: getRoleList,
  delete: deleteRole,
  updateStatus: updateRoleStatus
});


const {
  formDrawerRef,
  formRef,
  form,
  rules,
  editId,
  drawerTitle,
  handleSubmit,
  resetForm,
  handleEdit,
  handleCreate
} = useInitForm({
  form: {
    name: "",
    desc: "",
    status: 1
  },
  rules: {
    name: [{
      required: true,
      message: "角色名称不能为空",
      trigger: 'blur'
    }]
  },
  getData,
  update: updateRole,
  create: createRole,
})


</script>

<style scoped>

</style>