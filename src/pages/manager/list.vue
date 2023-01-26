<template>
  <el-card shadow="never" class="border-0">
    <!-- 搜索框 -->
    <el-form :model="searchForm" label-width="80px" class=" mb-3">
      <el-row :gutter="20">
        <el-col :span="8" :offset="0">
          <el-form-item label="关键词">
            <el-input v-model="searchForm.keyword" placeholder="管理员昵称" clearable></el-input>
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
    <div class=" flex justify-between items-center mb-4">
      <el-button type="primary" size="small" @click="handleCreate">
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
      <el-table-column label="所属管理员" align="center">
        <template #default="{ row }">
          {{ row.role ? row.role.name : "" }}
        </template>
      </el-table-column>
      <el-table-column label="状态" width="120">
        <template #default="{ row }">
          <el-switch :module="row.status" :active-value="1" :inactive-value="0">
          </el-switch>

        </template>
      </el-table-column>
      <el-table-column prop="create_time" label="发布时间" width="380"></el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template #default="scope">
          <el-button type="primary" size="small" text @click="handleEdit(scope.row)">修改</el-button>
          <span @click.stop="() => { }">
            <el-popconfirm title="是否要删除该管理员？" confirmButtonText="确认" cancelButtonText="取消" @confirm="handleDelete">
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
    <FromDrawer :title="drawerTitle" ref="formDrawerRef" @submit="handleSumbit">
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
import { ref, reactive, computed } from 'vue'
import { getNoticeList, createNotice, updateNotice, deleteNotice } from '@/api/notice.js'
import { getManagerList } from '@/api/manager.js'
import FromDrawer from '@/components/FormDrawer.vue'
import { toast } from '@/composables/util.js'

const searchForm = reactive({
  keyword: ""
})

const resetSearchFrom = () => {
  searchForm.keyword = "";
  getData();
}

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
  //searchForm本来就是reactive类型的,正好需要传对象类型的,所以我们直接传searchForm即可
  getManagerList(currentPage.value, searchForm).then(res => {
    console.log(res);
    tableData.value = res.list
    total.value = res.totalCount
  }).finally(() => {
    loading.value = false
  })
}

getData()

//删除
const handleDelete = (id) => {
  loading.value = true;
  deleteNotice(id).then(res => {
    toast("删除成功")
    getData()
  }).finally(() => {
    loading.value = false;
  })
}
//表单部分
const formDrawerRef = ref(null);
const formRef = ref(null)
const form = reactive({
  title: "",
  content: ""
})
const rules = {
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
}

const editId = ref(0)
const drawerTitle = computed(() => editId.value ? "修改" : "新增")

//新增
const handleSumbit = () => {
  formRef.value.validate((vaild) => {
    //如果vaild为false 就证明验证没有通过
    if (!vaild) return;
    formDrawerRef.value.showLoading();

    const fun = editId.value ? updateNotice(editId.value, form.value) : createNotice(form)


    fun.then(res => {
      toast(drawerTitle.value + "成功")
      getData(1)
      formDrawerRef.value.close();
    }).finally(() => {
      formDrawerRef.value.hideLoading();
    })
  })
}

//重置表单的方法
function resetForm(row = false) {
  if (formRef.value) formRef.value.clearValidate()
  if (row) {
    for (const key in form) {
      //拿进来form值，赋值给表单的值
      form[key] = row[key];
    }
  }
}

//修改
const handleEdit = (row) => {
  editId.value = row.id;
  resetForm(row);
  formDrawerRef.value.open()
}

//拉出来表单
const handleCreate = () => {
  editId.value = 0;
  resetForm({
    title: "",
    content: ""
  });
  formDrawerRef.value.open();
}
</script>

<style scoped>

</style>