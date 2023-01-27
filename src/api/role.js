import axios from '@/axios'

export function getRoleList(page) {
  return axios.get(`/admin/role/${page}`)
}

export function createRole(data) {
  return axios.post("/admin/role", data)
}

//角色修改api
export function updateRole(id, data) {
  return axios.post("/admin/role/" + id, data)
}
//角色删除api
export function deleteRole(id) {
  return axios.post(`/admin/role/${id}/delete`)
}

export function updateRoleStatus(id, status) {
  return axios.post(`/admin/role/${id}/update_status`, { status })
}