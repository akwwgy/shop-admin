import axios from '@/axios.js'

export function login(username, password) {
  return axios.post('/admin/login', {
    username,
    password
  })
}

export function getinfo() {
  return axios.post('/admin/getinfo');
}

export function logout() {
  return axios.post('/admin/logout');
}

export function updatepassword(data) {
  return axios.post('/admin/updatepassword', data);
}
export function getManagerList(page, query = {}) {
  let q = []
  for (const key in query) {
    if (query[key]) {
      //防止参数丢失，使用encodeURIComponent
      q.push(`${key}=${encodeURIComponent(query[key])}`)
    }
  }
  let r = q.join("&");
  r = r ? ("?" + r) : ""

  return axios.get(`/admin/manager/${page}${r} `)
}

export function updateManagerStatus(id, status) {
  return axios.post(`/admin/manager/${id}/update_status`, { status })
}

export function createManager(data) {
  return axios.post(`/admin/manager`, data)
}

export function updateManager(id, data) {
  return axios.post(`/admin/manager/${id}`, data)
}

export function deleteManager(id) {
  return axios.post(`/admin/manager/${id}/delete`,)
}