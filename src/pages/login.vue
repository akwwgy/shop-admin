<template>
  <el-row class="login-container">
    <el-col :lg="16" :md="12" class="left">
      <div>
        <div class=" font-bold text-5xl text-light-50 mb-4">欢迎光临</div>
        <div class=" text-gray-200 text-sm">基于vue3+vite实战商城后台开发</div>
      </div>
    </el-col>
    <el-col :lg="8" :md="12" class="right">
      <h2 class="font-bold text-3xl text-gray-800">欢迎回来</h2>
      <div class=" flex items-center justify-center my-5 text-gray-300 space-x-2">
        <span class="h-[1px] w-16 bg-gray-200"></span>
        <span>账号密码登录</span>
        <span class="h-[1px] w-16 bg-gray-200"></span>
      </div>
      <el-form ref="fromRef" :rules="rules" :model="form" class="w-[250px]">
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名">
            <template #prefix>
              <el-icon>
                <User />
              </el-icon>
            </template>
          </el-input>

        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" type="password" placeholder="请输入密码" show-password>
            <template #prefix>
              <el-icon>
                <Lock />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="w-[250px]" type="primary" @click="onSubmit" round color="#626aef"
            :loading="loading">登录</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script setup>
import { reactive, ref, onMounted, onBeforeUnmount } from 'vue'
import { toast } from '@/composables/util.js'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex';

const store = useStore();

const loading = ref(false);

const router = useRouter();
// do not use same name with ref
const form = reactive({
  username: '',
  password: ''
})

const rules = {
  username: [
    {
      required: true,
      message: '用户名不能为空',
      trigger: 'blur'
    },
  ],
  password: [
    {
      required: true,
      message: '密码不能为空',
      trigger: 'blur'
    }
  ]
};
const fromRef = ref(null);

const onSubmit = () => {
  fromRef.value.validate((vaild) => {
    if (!vaild) return false;
    loading.value = true;
    store.dispatch("login", { username: form.username, password: form.password }).then(res => {
      toast("登陆成功")
      router.push('/')
    }).finally(() => {
      loading.value = false;
    })
    // login(form.username, form.password).then(res => {
    //   setToken(res.token)
    //   console.log(res.token);
    //   //提示成功
    //   toast("登录成功");

    //   router.push('/')
    // }).finally(() => {
    //   loading.value = false;
    // })
  })
}

function onKeyUp(e) {
  if (e.key == "Enter") {
    onSubmit()
  }
}

onMounted(() => {
  //添加键盘监听 回车
  document.addEventListener("keyup", onKeyUp)
})
onBeforeUnmount(() => {
  //移除键盘监听 回车
  document.removeEventListener("keyup", onKeyUp)
})



</script>

<style scoped>
.login-container {
  @apply min-h-screen bg-indigo-500;
}

.login-container .left {
  @apply flex items-center justify-center;
}

.login-container .right {
  @apply bg-light-50 flex items-center justify-center flex-col;
}
</style>