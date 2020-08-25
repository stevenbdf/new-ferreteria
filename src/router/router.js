const routes = [
  {
    path: '/',
    name: 'Login',
    meta: {
      layout: 'landing'
    },
    component: () => import("@/views/auth/Login")
  },
  {
    path: '/facturacion',
    name: 'facturacion',
    meta: {
      layout: 'app'
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Facturacion.vue')
  }
]
export default routes;