<template>
  <div v-if="modelValue">
    <el-image :src="modelValue" fit="coverl" :lazy="true" class="w-[100px] h-[100px] rounded border mr - 2"></el-image>

  </div>
  <div class="choose-image-btn" @click="open">
    <el-icon :size="25">
      <Plus />
    </el-icon>
  </div>
  <el-dialog :title="选择图片" v-model="dialogVisible" width="80%" top="5vh">
    <el-container class=" bg-white rounded" style="height:70vh;">
      <el-header class="image-header">
        <el-button type="primary" size="small" @click="handleOpenCreate">新增图片分类</el-button>
        <el-button type="warning" size="small" @click="handleOpenUpload">上传图片</el-button>
      </el-header>
      <el-container>
        <ImageAside ref="ImageAsideRef" @change="handleAsideChange" />
        <ImageMain openChoose="true" ref="ImageMainRef" @choose="handleChoose" />
      </el-container>
    </el-container>
    <span></span>
    <template>

    </template>
    <span>
      <el-button @click="dialogVisible = false">Cancel</el-button>
      <el-button @click="submit">OK</el-button>
    </span>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import ImageAside from '@/components/ImageAside.vue'
import ImageMain from '@/components/ImageMain.vue'

const ImageAsideRef = ref(null);
const ImageMainRef = ref(null)

const handleOpenCreate = () => {
  ImageAsideRef.value.handleCreate();
}

const handleAsideChange = (image_class_id) => {
  console.log(image_class_id);
  ImageMainRef.value.loadData(image_class_id);
}

const handleOpenUpload = () => {
  ImageMainRef.value.openUploadFile();
}
const dialogVisible = ref(false)

const open = () => {
  dialogVisible.value = true
}

const props = defineProps({
  modelValue: [String, Array]
})
const emit = defineEmits(["update:modelValue"])

let urls = []
const handleChoose = (e) => {
  urls = e.map(o => o.url)
}
const submit = () => {
  if (urls.length) {
    emit("update:modelValue", urls[0])
  }
  dialogVisible.value = false
}
</script>

<style scoped>
.choose-image-btn {
  @apply w-[100px] h-[100px] rounded border flex justify-center items-center cursor-pointer hover: (bg-gray-100);
}

.image-header {
  border-bottom: 1px solid #eeeeee;
  @apply flex items-center;
}
</style>