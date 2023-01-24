import axios from '@/axios.js'

export function getImageList(id, page = 1) {
  return axios.get(`/admin/image_class/${id}/image/${page}`)
}

export function updateImage(id, name) {
  return axios.post(`/admin/image/${id}`, { name })
}

export function deleteImage(ids) {
  return axios.post(`/admin/image/delete_all`, { ids })
}
