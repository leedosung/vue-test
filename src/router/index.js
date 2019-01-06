import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Callback from '../views/Callback.vue'
import Profile from '../components/Profile.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '',
          name: 'profile',
          component: Profile
        }
      ]
    },
    {
      path: '/callback',
      name: 'callback',
      component: Callback
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.name === 'callback') {
    return next()
  }
  if (router.app.$auth.isAuthenticated()) {
    next()
  } else {
    router.app.$auth.login()
  }
})

export default router
