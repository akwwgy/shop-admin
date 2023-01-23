<template>
  <el-container>
    <el-header>
      <theheader />
    </el-header>
    <el-container>
      <el-aside class="el-aside" :width="$store.state.asideWidth">
        <themenu />
      </el-aside>
      <el-main>
        <thetaglist />
        <router-view v-slot="{ Component }">
          <keep-alive :max="10">
            <component :is="Component">
            </component>
          </keep-alive>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import Theheader from '@/layouts/components/FHeader.vue'
import Themenu from '@/layouts/components/FMenu.vue'
import Thetaglist from '@/layouts/components/FTagList.vue'
</script>

<style scoped>
.el-aside {
  transition: all 0.2s;
}
</style>