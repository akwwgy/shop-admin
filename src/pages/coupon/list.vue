<template>
  <el-card shadow="never" class="border-0">
    <!-- //新增刷新 -->
    <ListHeader @create="handleCreate" @refresh="getData"></ListHeader>
    <el-table :data="tableData" stripe style="width:100%" v-loading="loading">
      <el-table-column label="优惠券名称" width="350px">
        <!-- 自定义插槽 -->
        <template #default="{ row }">
          <div class="border border-dashed py-2 px-2 rounded" :class="row.statusText == '领取中' ? 'active' : 'inactive'">
            <h5 class="font-bold text-md">{{ row.name }}</h5>
            <small>{{ row.start_time }}~{{ row.end_time }}</small>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="statusText" label="状态"></el-table-column>
      <el-table-column label="优惠">
        <!-- 自定义插槽 -->
        <template #default="{ row }">
          {{ row.type ? "满减" : "折扣" }}{{ row.type ? ("￥" + row.value) : (row.value + "折") }}
        </template>
      </el-table-column>
      <el-table-column prop="total" label="发放数量" />
      <el-table-column prop="used" label="已使用" />
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
import { getCouponList, createCoupon, updateCoupon, deleteCoupon, updateCouponStatus } from '@/api/coupon.js'
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
  getList: getCouponList,
  onGetListSuccess: (res) => {
    tableData.value = res.list.map(o => {
      o.statusText = formatStatus(o)
      return o;
    })
    console.log(tableData.value);
    total.value = res.totalCount;
  },
  delete: deleteCoupon
});

function formatStatus(row) {
  let s = "领取中";
  let start_time = (new Date(row.start_time)).getTime()
  let now = (new Date()).getTime()
  let end_time = (new Date(row.end_time)).getTime()
  if (start_time > now) {
    s = "未开始"
  } else if (end_time < now) {
    s = "已结束"
  } else if (row.status == 0) {
    s = "已失效"
  }
  return s;
}


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
  update: updateCoupon,
  create: createCoupon,
})


</script>

<style scoped>
.active {
  @apply border-rose-200 bg-rose-50 text-red-400
}

.inactive {
  @apply border-gray-200 bg-gray-50 text-gray-400
}
</style>