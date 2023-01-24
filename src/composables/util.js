import { ElNotification } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
import nProgress from 'nprogress'
//成功提示
export function toast(message, type = "success", dangerouslyUseHTMLString = false) {
  ElNotification({
    message: message,
    type: type,
    dangerouslyUseHTMLString,
    duration: 1000
  })
}


export function showModal(content = "提示内容", type = "warning", title = "") {
  //一定要return回去
  return ElMessageBox.confirm(
    content,
    title,
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: type,
    }
  )
}

// 弹出输入框
export function showPrompt(tip, value = "") {
  return ElMessageBox.prompt(tip, '', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    inputValue: value
  })
}




//显示全屏loading
export function showFullLoading() {
  nProgress.start();
}

//隐藏全屏loading
export function hideFullLoading() {
  nProgress.done();
}