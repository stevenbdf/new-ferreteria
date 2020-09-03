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
  },
  {
    path: '/departamentos',
    name: 'departamentos',
    meta: {
      layout: 'app'
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Departamentos.vue')
  }
]
export default routes;