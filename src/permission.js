//导航守卫 权限相关
import { router, addRoutes } from '@/router/index'
import { getToken } from '@/composables/auth'
import { toast, showFullLoading, hideFullLoading } from '@/composables/util'
import store from './store';


let hasGetInfo = false;

//全局前置守卫
router.beforeEach(async (to, from, next) => {

  //显示loading
  showFullLoading();
  //to代表即将要去什么路径 from代表从哪里来
  //利用前置守卫会保护，我们可以在这个函数里进行一些逻辑判断或者token验证
  const token = getToken();
  //没有登陆强制跳转回去
  if (!token && to.path != "/login") {
    toast("请先登录", "error")
    return next({ path: '/login' })
  }
  //防止重复登陆
  if (token && to.path == '/login') {
    toast("请勿重复登录")
    return next({ path: from.path ? from.path : '/' })

  }
  let hasNewRoutes = false;
  if (token && !hasGetInfo) {
    //在这调用了actions中的getinfo
    let { menus } = await store.dispatch("getinfo");

    //加载完之后，就让hasGetInfo变回去   速度原因就是因为每次点击都发了两次geiinfo请求
    hasGetInfo = true;

    //在这里动态添加路由
    hasNewRoutes = addRoutes(menus)
  }

  //设置页面标题
  let title = (to.meta.title ? to.meta.title : "") + "-wgy"

  document.title = title;
  if (hasNewRoutes) {
    next(to.fullPath)
  }
  next()

  // hasNewRoutes ? next(to.fullPath) : next()
})

//全局后置守卫（后置钩子）
router.afterEach((to, from) => {
  hideFullLoading();
})


