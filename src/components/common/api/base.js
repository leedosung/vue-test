import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import qs from 'qs'
import { API_URL } from '../config'

Vue.use(VueAxios, axios)
Vue.axios.defaults.baseURL = API_URL

export default {
  setHeader (token) {
    Vue.axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  },
  get (resource, params) {
    let query = ''
    if (params) {
      query = '?' + qs.stringify(params)
    }
    return Vue.axios.get(`${resource}${query}`)
  },
  post (resource, params) {
    return Vue.axios.post(`${resource}`, params)
  },
  put (resource, params) {
    return Vue.axios.put(`${resource}`, params)
  },
  delete (resource) {
    return Vue.axios.delete(resource)
  }
}
