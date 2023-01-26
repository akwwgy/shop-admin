<template>
  <el-card shadow="never" class=" border-0">
    <ListHeader @create="handleCreate" @refresh="getData"></ListHeader>
  </el-card>

</template>

<script setup>
import ListHeader from "@/components/ListHeader.vue"

const handleCreate = () => {

}
const getData = () => {

}
</script>

<style scoped>

</style>