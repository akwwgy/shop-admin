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
      <el-pagination background layout="prev, pager,next" :total="total" :current-page="currentPage" :page-size="limit"
        @current-change="getData" />
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
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { getManagerList, updateManagerStatus, createManager, updateManager, deleteManager } from '@/api/manager.js'
import FormDrawer from '@/components/FormDrawer.vue'
import { toast } from '@/composables/util.js'

const searchForm = reactive({
  keyword: ""
})

const resetSearchFrom = () => {
  searchForm.keyword = "";
  getData();
}

const roles = ref([])

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
    tableData.value = res.list.map(o => {
      //利用map添加属性
      o.statusLoading = false;
      return o
    })
    total.value = res.totalCount
    roles.value = res.roles
  }).finally(() => {
    loading.value = false
  })
}

getData()

//删除
const handleDelete = (id) => {
  loading.value = true;
  deleteManager(id).then(res => {
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
  username: "",
  password: "",
  role_id: null,
  status: 1,
  avatar: ""

})
const rules = {}

const editId = ref(0)
const drawerTitle = computed(() => editId.value ? "修改" : "新增")

//新增
const handleSumbit = () => {
  formRef.value.validate((vaild) => {
    //如果vaild为false 就证明验证没有通过
    if (!vaild) return;
    formDrawerRef.value.showLoading();

    const fun = editId.value ? updateManager(editId.value, form.value) : createManager(form)


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
    username: "",
    password: "",
    role_id: null,
    status: 1,
    avatar: ""
  });
  formDrawerRef.value.open();
}

//修改状态
const handleStatusChange = (status, row) => {
  row.statusLoading = true;
  updateManagerStatus(row.id, status).then(res => {
    toast("修改状态成功")
    row.status = status;
  }).finally(() => {
    row.statusLoading = false;
  })
}
</script>

<style scoped>

</style>