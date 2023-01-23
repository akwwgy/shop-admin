import { ref, onMounted } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { useCookies } from '@vueuse/integrations/useCookies'
import { router } from '@/router';

export function useTabList() {
  const route = useRoute();
  const cookie = useCookies();

  const activeTab = ref(route.path)

  const tabList = ref([
    {
      title: '后台首页',
      path: "/"
    },
    {
      title: '商品管理',
      path: "/goods/list"
    },
  ])

  //初始化标签导航列表
  const initTabList = () => {
    let tab = cookie.get("tabList");
    if (tab) {
      tabList.value = tab;
    }
  }
  initTabList()
  //添加标签导航
  function addTab(tab) {
    //如果findIndex等于-1 就相当于没有找到
    let noTab = tabList.value.findIndex(t => t.path == tab.path) == -1
    if (noTab) {
      tabList.value.push(tab)
    }
    cookie.set("tabList", tabList.value)
  }

  //
  onBeforeRouteUpdate((to, from) => {
    //如何添加之后，处于激活状态呢？
    activeTab.value = to.path
    addTab({ title: to.meta.title, path: to.path })
  })
  const changeTab = (t) => {
    router.push(t)
    activeTab.value = t
  }

  const removeTab = (t) => {
    console.log(t);
    let tabs = tabList.value;
    let a = activeTab.value;
    if (a == t) {
      tabs.forEach((tab, index) => {
        if (tab.path == t) {
          const nextTab = tabs[index + 1] || tabs[index - 1];
          if (nextTab) {
            a = nextTab.path;
          }
        }
      })
    }
    //因为UI组件默认有change事件，所以这个改变了就会触发那个事件
    activeTab.value = a;
    //数组过滤函数，只有不等于当前关闭这个才能被留下来
    tabList.value = tabList.value.filter(tab => tab.path != t);
    cookie.set("tabList", tabList.value);
  }
  const handleClose = (c) => {
    switch (c) {
      case "clearAll":
        activeTab.value = '/';
        tabList.value = [{ title: '后台首页', path: '/' }]
        break;
      case "clearOther":
        //过滤只剩下首页和当前页
        tabList.value = tabList.value.filter(tab => tab.path == '/' || tab.path == activeTab.value)
        break;
    }
    cookie.set("tabList", tabList.value)
  }
  return {
    activeTab,
    tabList,
    changeTab,
    removeTab,
    handleClose,
  }
}