import axios from '@/axios.js'


export function getImageClassList(page) {
  return axios.get("/admin/image_class/" + page)
}