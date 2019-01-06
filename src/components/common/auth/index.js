import auth0 from 'auth0-js'
import Vue from 'vue'
import {
  AUTH_DOMAIN,
  AUTH_CLIENTID,
  AUTH_REDIRECT_URL,
  AUTH_RESPONSE_TYPE,
  AUTH_SCOPE,
  AUTH_RETURNTO
} from '../config'

const webAuth = new auth0.WebAuth({
  domain: AUTH_DOMAIN,
  clientID: AUTH_CLIENTID,
  redirectUri: AUTH_REDIRECT_URL,
  responseType: AUTH_RESPONSE_TYPE,
  scope: AUTH_SCOPE
})

const auth = new Vue({
  computed: {
    token: {
      get: () => localStorage.getItem('mm:id_token'),
      set: idToken => localStorage.setItem('mm:id_token', idToken)
    },
    accessToken: {
      get: () => localStorage.getItem('mm:access_token'),
      set: accessToken => localStorage.setItem('mm:access_token', accessToken)
    },
    expiresAt: {
      get: () => localStorage.getItem('mm:expires_at'),
      set: expiresIn => {
        const expiresAt = JSON.stringify(expiresIn * 1000 + new Date().getTime())
        localStorage.setItem('mm:expires_at', expiresAt)
      }
    },
    user: {
      get: () => JSON.parse(localStorage.getItem('mm:user')),
      set: user => localStorage.setItem('mm:user', JSON.stringify(user))
    }
  },
  methods: {
    login () {
      webAuth.authorize()
    },
    logout () {
      return new Promise((resolve, reject) => {
        localStorage.removeItem('mm:access_token')
        localStorage.removeItem('mm:id_token')
        localStorage.removeItem('mm:expires_at')
        localStorage.removeItem('mm:user')
        webAuth.logout({
          returnTo: AUTH_RETURNTO,
          clientID: AUTH_CLIENTID
        })
      })
    },
    isAuthenticated () {
      return new Date().getTime() < this.expiresAt
    },
    handleAuthentication () {
      return new Promise((resolve, reject) => {
        webAuth.parseHash((err, authResult) => {
          if (authResult && authResult.accessToken && authResult.idToken) {
            this.expiresAt = authResult.expiresIn
            this.accessToken = authResult.accessToken
            this.token = authResult.idToken
            this.user = authResult.idTokenPayload
            resolve()
          } else if (err) {
            this.logout()
            reject(err)
          }
        })
      })
    }
  }
})

export default {
  install: Vue => {
    Vue.prototype.$auth = auth
    Vue.auth = auth
  }
}
