const routes = [
  {
    path: '/',
    name: 'Login',
    meta: {
      layout: 'landing',
      guest: true
    },
    component: () => import("@/views/auth/Login")
  },
  {
    path: '/facturacion',
    name: 'facturacion',
    meta: {
      layout: 'app',
      requiresAuth: true
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Facturacion.vue')
  },
  {
    path: '/clientes',
    name: 'clientes',
    meta: {
      layout: 'app',
      requiresAuth: true
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Clientes.vue')
  },
  {
    path: '/proveedores',
    name: 'proveedores',
    meta: {
      layout: 'app',
      requiresAuth: true,
      type: true
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Proveedores.vue')
  },
  {
    path: '/departamentos',
    name: 'departamentos',
    meta: {
      layout: 'app',
      requiresAuth: true,
      type: true
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Departamentos.vue')
  },
  {
    path: '/transacciones',
    name: 'transacciones',
    meta: {
      layout: 'app',
      requiresAuth: true,
      type: true
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Transacciones.vue')
  },
  {
    path: '/productos',
    name: 'productos',
    meta: {
      layout: 'app',
      requiresAuth: true,
      type: true
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Productos.vue')
  },
  {
    path: '/usuarios',
    name: 'usuarios',
    meta: {
      layout: 'app',
      requiresAuth: true,
      type: true
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Usuarios.vue')
  },
  {
    path: '/sucursales',
    name: 'sucursales',
    meta: {
      layout: 'app',
      requiresAuth: true,
      type: true
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Sucursales.vue')
  }
]
export default routes;