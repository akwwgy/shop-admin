import { ref, reactive } from 'vue'
import { logout, updatepassword } from '@/api/manager.js'
import { toast } from '@/composables/util.js'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router'
import { showModal } from '@/composables/util.js'


export function useRepassword() {

  const store = useStore();
  const router = useRouter()

  //修改密码部分
  const formDrawerRef = ref(null)
  const form = reactive({
    oldpassword: '',
    password: '',
    repassword: ''
  })

  const rules = {
    oldpassword: [
      {
        required: true,
        message: '旧密码不能为空',
        trigger: 'blur'
      },
    ],
    password: [
      {
        required: true,
        message: '新密码不能为空',
        trigger: 'blur'
      }
    ],
    repassword: [
      {
        required: true,
        message: '确认密码不能为空',
        trigger: 'blur'
      }
    ]
  };
  const fromRef = ref(null);
  const onSubmit = () => {
    fromRef.value.validate((vaild) => {
      if (!vaild) return false;
      formDrawerRef.value.showLoading();
      updatepassword(form).then(res => {
        toast("修改密码成功,请重新登录");
        store.dispatch("logout");
        router.push('/login')
      }).finally(() => {
        formDrawerRef.value.hideLoading();
      })
    })
  }
  return {
    formDrawerRef,
    form,
    rules,
    fromRef,
    onSubmit
  }
}

export function useLogout() {
  const store = useStore();
  const router = useRouter()

  function handleLogout() {
    showModal("是否要退出登录?").then(res => {
      logout().finally(() => {
        store.dispatch("logout");
        //跳转回登录页
        router.push('/login')
        //提示退出登陆成功
        toast("退出登录成功")
      })
    })
  }
  return {
    handleLogout
  }
}