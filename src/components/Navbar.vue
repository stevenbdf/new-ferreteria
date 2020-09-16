<template>
  <b-navbar fixed-top type="is-info" class="py-2" style="background-color: #0A3D62;">
    <template slot="start">
      <b-navbar-item class="mr-10">SISTEMA DE INVENTARIO</b-navbar-item>
      <b-navbar-item tag="router-link" class="mr-10" :to="{ path: '/facturacion' }">
        <b-icon icon="file-document-outline" size="is-small" class="mr-2"></b-icon>Facturación
      </b-navbar-item>
      <b-navbar-item tag="router-link" class="mr-10" :to="{ path: '/transacciones' }">
        <b-icon icon="warehouse" size="is-small" class="mr-2"></b-icon>Inventario
      </b-navbar-item>
      <b-navbar-item tag="router-link" class="mr-10" :to="{ path: '/productos' }">
        <b-icon icon="cart" size="is-small" class="mr-2"></b-icon>Productos
      </b-navbar-item>
      <b-navbar-item tag="router-link" class="mr-10" :to="{ path: '/proveedores' }">
        <b-icon icon="car-pickup" size="is-small" class="mr-2"></b-icon>Proveedores
      </b-navbar-item>
      <b-navbar-item tag="router-link" class="mr-10" :to="{ path: '/departamentos' }">
        <b-icon icon="shape" size="is-small" class="mr-2"></b-icon>Departamentos
      </b-navbar-item>
      <b-navbar-item tag="router-link" class="mr-10" :to="{ path: '/clientes' }">
        <b-icon icon="card-account-details" size="is-small" class="mr-2"></b-icon>Clientes
      </b-navbar-item>
    </template>

    <template slot="end">
      <b-navbar-dropdown :label="profile.full_name">
        <b-navbar-item href="#">Perfil</b-navbar-item>
        <b-navbar-item href="#">Cerrar Sesión</b-navbar-item>
      </b-navbar-dropdown>
    </template>
  </b-navbar>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: mapGetters("auth", ["profile"]),
};
</script>