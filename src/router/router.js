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
  },
  {
    path: '/clientes',
    name: 'clientes',
    meta: {
      layout: 'app'
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Clientes.vue')
  },
  {
    path: '/proveedores',
    name: 'proveedores',
    meta: {
      layout: 'app'
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Proveedores.vue')
  }
]
export default routes;