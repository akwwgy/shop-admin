<template>
  <div class="f-header">
    <span class="logo">
      <el-icon class=" mr-1"><eleme-filed /></el-icon>
      Coderwgy
    </span>
    <el-tooltip class="box-item" effect="dark" content="Top Left prompts info" placement="top-start">
      <el-icon class="icon-btn" @click="$store.commit('handleAsideWidth')">
        <fold v-if="$store.state.asideWidth == '250px'" />
        <Expand v-else />
      </el-icon>
    </el-tooltip>

    <el-tooltip class="box-item" effect="dark" content="刷新" placement="top-start">
      <el-icon class="icon-btn" @click="handRefresh">
        <refresh />
      </el-icon>
    </el-tooltip>

    <div class="ml-auto flex justify-center items-center">
      <el-tooltip class="box-item" effect="dark" content="全屏" placement="top-start">
        <el-icon class="icon-btn" @click="toggle">
          <full-screen />
        </el-icon>
      </el-tooltip>

      <el-dropdown class="dropdown" @command="handleCommand">
        <span class="flex items-center text-light-50 justify-around">
          <el-avatar class="mr-2" :size="25" :src="$store.state.user.avatar"></el-avatar>
          {{ $store.state.user.username }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="rePassword">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
  <!-- <el-drawer v-model="showDrawer" title="修改密码" size="45%">
    <el-form ref="fromRef" :rules="rules" :model="form" label-width="80px">
      <el-form-item prop="oldpassword" label="旧密码">
        <el-input v-model="form.oldpassword" placeholder="请输入老密码">
        </el-input>
      </el-form-item>
      <el-form-item prop="password" label="新密码">
        <el-input v-model="form.password" type="password" placeholder="请输入新密码">
        </el-input>
      </el-form-item>
      <el-form-item prop="repassword" label="确认密码">
        <el-input v-model="form.repassword" type="password" placeholder="请确认新密码">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :loading="loading">提交</el-button>
      </el-form-item>
    </el-form>
  </el-drawer> -->
  <FormDrawer ref="formDrawerRef" title="修改密码" @submit="onSubmit" destroyOnClose>
    <el-form ref="fromRef" :rules="rules" :model="form" label-width="80px">
      <el-form-item prop="oldpassword" label="旧密码">
        <el-input v-model="form.oldpassword" placeholder="请输入老密码">
        </el-input>
      </el-form-item>
      <el-form-item prop="password" label="新密码">
        <el-input v-model="form.password" type="password" placeholder="请输入新密码">
        </el-input>
      </el-form-item>
      <el-form-item prop="repassword" label="确认密码">
        <el-input v-model="form.repassword" type="password" placeholder="请确认新密码">
        </el-input>
      </el-form-item>
    </el-form>
  </FormDrawer>
</template>

<script setup>
import { useFullscreen } from '@vueuse/core'
import FormDrawer from '@/components/FormDrawer.vue'
import { useRepassword, useLogout } from '@/composables/useManager.js'

const { isFullscreen, enter, exit, toggle } = useFullscreen();
const { formDrawerRef,
  form,
  rules,
  fromRef,
  onSubmit } = useRepassword();

const { handleLogout } = useLogout();


const handRefresh = () => location.reload()

const handleCommand = (c) => {
  switch (c) {
    case "logout":
      handleLogout();
      break;
    case "rePassword":
      // showDrawer.value = true;
      formDrawerRef.value.open();
      break;
  }
}




</script>

<style scoped>
.f-header {
  height: 64px;
  @apply flex items-center bg-indigo-700 text-light-50 fixed top-0 left-0 right-0;
}

.logo {
  width: 250px;
  @apply flex justify-center items-center text-xl font-thin;
}

.icon-btn {
  @apply flex justify-center items-center;
  width: 42px;
  height: 64px;
  cursor: pointer;
}

.icon-btn:hover {
  @apply bg-indigo-600
}

.f-header .dropdown {
  height: 64px;
  cursor: pointer;
  @apply flex justify-center items-center mx-4 px-1;

}
</style>