<template>
  <el-card shadow="never" class="border-0">
    <!-- //新增刷新 -->
    <div class=" flex justify-between items-center mb-4">
      <el-button type="primary" size="small">
        新增
      </el-button>
      <el-tooltip class="box-item" effect="dark" content="刷新数据" placement="top" @click="getData">
        <el-button text>
          <el-icon :size="20">
            <Refresh />
          </el-icon>
        </el-button>
      </el-tooltip>
    </div>
    <el-table :data="tableData" stripe style="width:100%" v-loading="loading">
      <el-table-column prop="title" label="公告标题"></el-table-column>
      <el-table-column prop="create_time" label="发布时间" width="380"></el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template #default="scope">
          <el-button type="primary" size="small" text>修改</el-button>
          <span @click.stop="() => { }">
            <el-popconfirm title="是否要删除该分类？" confirmButtonText="确认" cancelButtonText="取消" @confirm="handleDelete">
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
  </el-card>
</template>

<script setup>
import { ref } from 'vue'
import { getNoticeList } from '@/api/notice.js'

const tableData = ref([])

const loading = ref(false);

const currentPage = ref(1)
const total = ref(0)
const limit = ref(10);


//获取数据
function getData(p = null) {
  if (typeof p == "number") {
    currentPage.value = p
  }
  loading.value = true;
  getNoticeList(currentPage.value).then(res => {
    console.log(res);
    tableData.value = res.list
    total.value = res.totalCount
  }).finally(() => {
    loading.value = false
  })
}

getData()

//
</script>

<style scoped>

</style>