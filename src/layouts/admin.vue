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
          <!-- transition使用的时候每一个vue文件只能有一个根节点 -->
          <transition name="fade">
            <keep-alive :max="10">
              <component :is="Component">
              </component>
            </keep-alive>
          </transition>
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

.fade-enter-from {
  opacity: 0;
}

.fade-enter-to {
  opacity: 1;
}

.fade-leave-from {
  opacity: 1;
}

.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: all .3s;
}
</style>