import { createRouter, createWebHashHistory } from "vue-router";
import Index from '@/pages/index.vue'


//这是默认路由，所有用户共享
const routes = [
  {
    path: "/",
    name: "admin",
    component: () => import("@/layouts/admin.vue"),
    // //子路由
    // children: [
    //   {
    //     path: '/',
    //     component: Index,
    //     meta: {
    //       title: "后台首页"
    //     }
    //   },
    //   {
    //     path: '/goods/list',
    //     component: () => import("@/pages/goods/list.vue"),
    //     meta: {
    //       title: "商品列表"
    //     }
    //   },
    //   {
    //     path: '/category/list',
    //     component: () => import("@/pages/category/list.vue"),
    //     meta: {
    //       title: "分类列表"
    //     }
    //   },
    // ]
  },
  {
    path: "/about",
    component: () => import("@/pages/about.vue")
  },
  {
    path: "/:pathMatch(.*)*",
    name: 'NotFound',
    component: () => import("@/pages/404.vue"),
    meta: {
      title: "无法识别"
    }
  },
  {
    path: "/login",
    component: () => import("@/pages/login.vue"),
    meta: {
      title: "登录页"
    }
  }
]

//动态路由,用于匹配菜单动态添加路由
const asyncRoutes = [
  {
    path: '/',
    name: "/",
    component: Index,
    meta: {
      title: "后台首页"
    }
  },
  {
    path: '/goods/list',
    name: "/goods/list",
    component: () => import("@/pages/goods/list.vue"),
    meta: {
      title: "商品列表"
    }
  },
  {
    path: '/category/list',
    name: "/category/list",
    component: () => import("@/pages/category/list.vue"),
    meta: {
      title: "分类列表"
    }
  },
  {
    path: '/image/list',
    name: "/image/list",
    component: () => import("@/pages/image/list.vue"),
    meta: {
      title: "图库列表"
    }
  },
  {
    path: '/notice/list',
    name: "/notice/list",
    component: () => import("@/pages/notice/list.vue"),
    meta: {
      title: "公告管理"
    }
  },
  {
    path: '/manager/list',
    name: "/manager/list",
    component: () => import("@/pages/manager/list.vue"),
    meta: {
      title: "管理员管理"
    }
  },
  {
    path: "/access/list",
    name: "/access/list",
    component: () => import("@/pages/access/list.vue"),
    meta: {
      title: "菜单权限管理"
    }
  },
  {
    path: "/role/list",
    name: "/role/list",
    component: () => import("@/pages/role/list.vue"),
    meta: {
      title: "角色管理"
    }
  },
  {
    path: "/skus/list",
    name: "/skus/list",
    component: () => import("@/pages/skus/list.vue"),
    meta: {
      title: "规格管理"
    }
  },
  {
    path: "/coupon/list",
    name: "/coupon/list",
    component: () => import("@/pages/coupon/list.vue"),
    meta: {
      title: "优惠券管理"
    }
  },
  {
    path: "/level/list",
    name: "/level/list",
    component: () => import("@/pages/level/list.vue"),
    meta: {
      title: "会员等级"
    }
  },
  {
    path: "/user/list",
    name: "/user/list",
    component: () => import("@/pages/user/list.vue"),
    meta: {
      title: "用户管理"
    }
  },
  {
    path: "/comment/list",
    name: "/comment/list",
    component: () => import("@/pages/comment/list.vue"),
    meta: {
      title: "评论管理"
    }
  },
  {
    path: "/order/list",
    name: "/order/list",
    component: () => import("@/pages/order/list.vue"),
    meta: {
      title: "订单管理"
    }
  },
  {
    path: "/setting/base",
    name: "/setting/base",
    component: () => import("@/pages/setting/base.vue"),
    meta: {
      title: "基础设置"
    }
  },
  {
    path: "/setting/buy",
    name: "/setting/buy",
    component: () => import("@/pages/setting/buy.vue"),
    meta: {
      title: "交易设置"
    }
  },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})


//动态添加路由的方法(递归)
export function addRoutes(menus) {
  //是否有新的路由？
  let hasNewRoutes = false;
  const findAddRoutesByMenus = (arr) => {
    arr.forEach(e => {
      //判断是否有这个路由
      let item = asyncRoutes.find(o => o.path == e.frontpath)
      if (item && !router.hasRoute(item.path)) {
        router.addRoute("admin", item)
        hasNewRoutes = true;
      }
      if (e.child && e.child.length > 0) {
        findAddRoutesByMenus(e.child);
      }
    })
  }
  findAddRoutesByMenus(menus)
  console.log(router.getRoutes())
  return hasNewRoutes;
}