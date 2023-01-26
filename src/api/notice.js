import axios from '@/axios'

export function getNoticeList(page) {
  return axios.get(`/admin/notice/${page}`)
}

export function createNotice(data) {
  return axios.post("/admin/notice", data)
}

//公告修改api
export function updateNotice(id, data) {
  return axios.post("/admin/notice/" + id, data)
}
//公告删除api
export function deleteNotice(id) {
  return axios.post(`/admin/notice/${id}/delete`)
}