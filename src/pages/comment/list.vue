<template>
  <el-card shadow="never" class="border-0">
    <!-- 搜索框 -->
    <el-form :model="searchForm" label-width="80px" class=" mb-3">
      <el-row :gutter="20">
        <el-col :span="8" :offset="0">
          <el-form-item label="关键词">
            <el-input v-model="searchForm.title" placeholder="商品标题" clearable></el-input>
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
    <el-table :data="tableData" stripe style="width:100%" v-loading="loading">
      <el-table-column lable="ID" width="70" align="center" prop="id" />
      <el-table-column label="商品" width="200">
        <template #default="{ row }">
          <div class="flex items-center">
            <el-image :src="row.goods_item ? row.goods_item.cover : ''" fit="fill" :lazy="true"
              style="width:50px;height:50px"></el-image>
            <div class="ml-3">
              <h6>{{ row.goods_item?.title ?? 商品已被删除 }}</h6>
            </div>
          </div>

        </template>
      </el-table-column>
      <el-table-column label="评价信息" width="200">
        <template #default="{ row }">
          <div>
            <p>用户：{{ row.user.nickname || row.user.username }}</p>
            <p><el-rate v-model="row.rate" disabled show-score text-color="#ff9900" /></p>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="评价时间" width="180" align="center" prop="review_time" />
      <el-table-column label="状态">
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
      <el-pagination background layout="prev, pager,next" :total="total" :current-page="currentPage" :page-size="limit"
        @current-change="getData" />
    </div>

  </el-card>
</template>

<script setup>
import { ref } from 'vue'
import { getGoodsCommentList, updateGoodsCommentStatus } from '@/api/goods_comment.js'
import ListHeader from "@/components/ListHeader.vue"

import { useInitTable } from '@/composables/useCommon.js'

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
    title: ""
  },
  getList: getGoodsCommentList,
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
  updateStatus: updateGoodsCommentStatus
});




</script>

<style scoped>

</style>