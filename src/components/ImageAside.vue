<template>
  <el-aside width="220px" class="image-aside" loading>
    <div class="top">
      <AsideList :active="activeId == item.id" v-for="(item, index) in list" :key="index" @edit="handleEdit(item)"
        @delete="handleDelete(item.id)" @click="handleChangeActiveId(item.id)">
        {{ item.name }}
      </AsideList>
    </div>
    <div class="bottom">
      <el-pagination background layout="prev, next" :total="total" :current-page="currentPage" :page-size="limit"
        @current-change="getData" />
    </div>
  </el-aside>
  <FormDrawer :title="drawerTitle" ref="formDrawerRef" @submit="handleSubmit">
    <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false" size="normal">
      <el-form-item label="分类名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <!-- 因为要用到验证规则，所以必须加上prop字段 -->
      <el-form-item label="排序" prop="order">
        <el-input-number v-model="form.order" :min="0" :max="1000" />
      </el-form-item>
    </el-form>

  </FormDrawer>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import FormDrawer from '@/components/FormDrawer.vue'
import { getImageClassList, createImageClassList, updateImageClassList, deleteImageClassList } from '@/api/image_class.js'
import AsideList from '@/components/AsideList.vue'
import { toast } from '@/composables/util.js'
//分页部分
const currentPage = ref(1);
const total = ref(0)
const limit = ref(10)




//加载动画
const loading = ref(false)

//把网络请求数据保存起来，默认是空数组
const list = ref([])

//获取数据
function getData(p = null) {
  if (typeof p == "number") {
    currentPage.value = p
  }
  loading.value = true;
  getImageClassList(currentPage.value).then(res => {
    console.log(res);
    total.value = res.totalCount
    list.value = res.list;

    let item = list.value[0]
    if (item) {
      // activeId.value = item.id
      // 这么写才能获取分类之后，自动获取图库，去调用父组件，父组件去调用main中的方法
      handleChangeActiveId(item.id)
    }
  }).finally(() => {
    loading.value = false
  })
}
getData()


const editId = ref(0)
const drawerTitle = computed(() => editId.value ? "修改" : "新增")
const formDrawerRef = ref(null);


const form = reactive({
  name: "",
  oder: 50
})

const rules = {
  name: [{
    required: true,
    message: '不能为空',
    trigger: 'blur'
  }],
  order: [{
    required: true,
    message: '不能为空',
    trigger: 'blur'
  }]
}

const formRef = ref(null)
const handleSubmit = () => {
  formRef.value.validate((vaild) => {
    if (!vaild) return;
    // console.log("提交成功");
    formDrawerRef.value.showLoading();
    const fun = editId.value ? updateImageClassList(editId.value, form) : createImageClassList(form)

    fun.then(res => {
      toast(drawerTitle.value + "成功");
      getData(1)
      formDrawerRef.value.close();
    }).finally(() => {
      formDrawerRef.value.hideLoading();
    })
  })
}

//新增
//打开表单抽屉的方法
const handleCreate = () => {
  editId.value = 0;
  form.name = ""
  form.order = 50
  formDrawerRef.value.open();
}


//编辑
const handleEdit = (row) => {
  editId.value = row.id;
  form.name = row.name;
  form.order = row.order;
  formDrawerRef.value.open();
}

//删除
const handleDelete = (id) => {
  loading.value = true;
  deleteImageClassList(id).then(res => {
    toast("删除成功");
    getData(1)
  }).finally(() => {
    loading.value = false
  })
}
//选中图库分类ID
const activeId = ref(0)
const emit = defineEmits(["change"])

//切换分类
function handleChangeActiveId(id) {
  activeId.value = id;
  emit("change", id)
}

defineExpose({
  handleCreate
})
</script>

<style scoped>
.image-aside {
  border-right: 1px solid #eeeeee;
  position: relative;
}

.image-aside .top {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 50px;
  overflow-y: auto;
}

.image-aside .bottom {
  position: absolute;
  bottom: 0;
  height: 50px;
  left: 0;
  right: 0;
  @apply flex items-center justify-center;
}
</style>