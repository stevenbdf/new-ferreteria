import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router'
import token from '@/services/TokenService'

Vue.use(VueRouter)



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (token.getToken() == null) {
      next({
        path: '/',
        params: { nextUrl: to.fullPath }
      })
    } else {
      let user = JSON.parse(token.getData())
      if (to.matched.some(record => record.meta.type)) {
        if (user.type == 1) {
          next()
        }
        else {
          next({ name: 'facturacion' })
        }
      } else {
        next()
      }
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (token.getToken() == null) {
      next()
    }
    else {
      next({ name: 'facturacion' })
    }
  } else {
    next()
  }
})

export default router
