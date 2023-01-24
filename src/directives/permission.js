import store from '@/store'

function hasPermission(value, el = false) {
  if (!Array.isArray(value)) {
    throw new Error("需要配置权限，例如v-permission=['']")
  }
  const hasAuth = value.findIndex(v => store.state.ruleNames.includes(v)) != -1
  if (el && !hasAuth) {
    //没查到权限且存在这个节点，就要移除这个节点
    el.parentNode && el.parentNode.removeChild(el)
  }
  return hasAuth
}

export default {
  install(app) {
    app.directive("permission", {
      mounted(el, bingding) {
        //binding。value就是数组的值,拿到这个值就可以去rullNames去比对，有就显示，没有就不显示那个组件
        console.log(bingding);
        hasPermission(bingding.value)
      }
    })
  }
}