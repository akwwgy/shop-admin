import axios from '@/axios.js'

export function getStatistics1() {
  return axios.get('/admin/statistics1');
}
export function getStatistics3(type) {
  return axios.get('/admin/statistics3?typer' + type);
}