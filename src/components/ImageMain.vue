<template>
  <el-main class="image-main">
    <div class="top">
      <div v-for="(item, index) in list" :key="index">{{ item.url }}</div>
    </div>
    <div class="bottom">
      <el-pagination background layout="prev, pager,next" :total="total" :current-page="currentPage" :page-size="limit"
        @current-change="getData" />
    </div>
  </el-main>
</template>

<script setup>
import { ref } from 'vue'
import { getImageList } from '@/api/image.js'

const currentPage = ref(1);
const total = ref(0)
const limit = ref(10)
//加载动画
const loading = ref(false)
const image_class_id = ref(0);


//把网络请求数据保存起来，默认是空数组
const list = ref([])
//获取数据
function getData(p = null) {
  if (typeof p == "number") {
    currentPage.value = p
  }
  loading.value = true;
  getImageList(image_class_id.value, currentPage.value).then(res => {
    total.value = res.totalCount
    list.value = res.list;

  }).finally(() => {
    loading.value = false
  })
}
//根据分类id重新加载图片列表
const loadData = (id) => {
  currentPage.value = 1;
  image_class_id.value = id;
  getData();
}

defineExpose({
  loadData
})

</script>

<style scoped>
.image-main {
  position: relative;
}

.image-main .top {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 50px;
  overflow-y: auto;
}

.image-main .bottom {
  position: absolute;
  bottom: 0;
  height: 50px;
  left: 0;
  right: 0;
  @apply flex items-center justify-center;
}
</style>