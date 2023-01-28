<template>
  <el-card shadow="never" class="border-0">
    <!-- //新增刷新 -->
    <ListHeader @create="handleCreate" @refresh="getData"></ListHeader>
    <el-table :data="tableData" stripe style="width:100%" v-loading="loading">
      <el-table-column prop="title" label="公告标题"></el-table-column>
      <el-table-column prop="create_time" label="发布时间" width="380"></el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template #default="scope">
          <el-button type="primary" size="small" text @click="handleEdit(scope.row)">修改</el-button>
          <span @click.stop="() => { }">
            <el-popconfirm title="是否要删除该分类？" confirmButtonText="确认" cancelButtonText="取消"
              @confirm="handleDelete(scope.row.id)">
              <template #reference>
                <el-button text class="px-1" type="primary" size="small">
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
        <el-form-item label="公告标题" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="公告内容" prop="content">
          <el-input v-model="form.content" type="textarea" :rows="5"></el-input>
        </el-form-item>
      </el-form>
    </FromDrawer>
  </el-card>
</template>

<script setup>
import ListHeader from "@/components/ListHeader.vue"
import { getNoticeList, createNotice, updateNotice, deleteNotice } from '@/api/notice.js'
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
} = useInitTable({
  getList: getNoticeList,
  delete: deleteNotice
});


const {
  formDrawerRef,
  formRef,
  form,
  rules,
  editId,
  drawerTitle,
  handleSubmit,
  handleEdit,
  handleCreate
} = useInitForm({
  form: {
    title: "",
    content: ""
  },
  rules: {
    title: [{
      required: true,
      message: "公告标题不能为空",
      trigger: 'blur'
    }],
    content: [{
      required: true,
      message: "公告内容不能为空",
      trigger: 'blur'
    }]
  },
  getData,
  update: updateNotice,
  create: createNotice,
})


</script>

<style scoped>

</style>