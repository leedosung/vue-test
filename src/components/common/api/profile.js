import Vue from 'vue'
import base from './base'

export default {
  get () {
    base.setHeader(Vue.auth.token)
    return base.get('users/me')
  }
}
