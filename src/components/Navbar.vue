<template>
  <b-navbar
    fixed-top
    type="is-info"
    class="py-2"
    style="background-color: #0a3d62"
  >
    <template slot="brand">
      <b-navbar-item class="mr-10">SISTEMA DE INVENTARIO</b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item
        tag="router-link"
        class="mr-5"
        :to="{ path: '/facturacion' }"
      >
        <b-icon
          icon="file-document-outline"
          size="is-small"
          class="mr-2"
        ></b-icon
        >Facturación
      </b-navbar-item>
      <b-navbar-item
        tag="router-link"
        class="mr-5"
        :to="{ path: '/transacciones' }"
      >
        <b-icon icon="warehouse" size="is-small" class="mr-2"></b-icon
        >Inventario
      </b-navbar-item>
      <b-navbar-item
        tag="router-link"
        class="mr-5"
        :to="{ path: '/productos' }"
      >
        <b-icon icon="cart" size="is-small" class="mr-2"></b-icon>Productos
      </b-navbar-item>
      <b-navbar-item tag="router-link" class="mr-5" :to="{ path: '/clientes' }">
        <b-icon
          icon="card-account-details"
          size="is-small"
          class="mr-2"
        ></b-icon
        >Clientes
      </b-navbar-item>
      <b-navbar-dropdown label="Más" v-if="profile.type">
        <b-navbar-item
          tag="router-link"
          class="mr-5"
          :to="{ path: '/cortes' }"
        >
          <b-icon icon="currency-usd" size="is-small" class="mr-2"></b-icon
          >Cortes de caja
        </b-navbar-item>
        <b-navbar-item
          tag="router-link"
          class="mr-5"
          :to="{ path: '/proveedores' }"
        >
          <b-icon icon="car-pickup" size="is-small" class="mr-2"></b-icon
          >Proveedores
        </b-navbar-item>
        <b-navbar-item
          tag="router-link"
          class="mr-5"
          :to="{ path: '/departamentos' }"
        >
          <b-icon icon="shape" size="is-small" class="mr-2"></b-icon
          >Departamentos
        </b-navbar-item>
        <b-navbar-item
          tag="router-link"
          class="mr-5"
          :to="{ path: '/usuarios' }"
        >
          <b-icon icon="account" size="is-small" class="mr-2"></b-icon>Usuarios
        </b-navbar-item>
        <b-navbar-item
          tag="router-link"
          class="mr-5"
          :to="{ path: '/sucursales' }"
        >
          <b-icon icon="home" size="is-small" class="mr-2"></b-icon>Sucursales
        </b-navbar-item>
      </b-navbar-dropdown>
    </template>

    <template slot="end">
      <b-icon
        icon="account-circle"
        size="is-small"
        class="mr-2 my-auto"
      ></b-icon>
      <b-navbar-dropdown :label="profile.full_name" class="mr-20">
        <b-navbar-item tag="router-link" :to="{ path: '/configuraciones' }">
          <b-icon icon="cog" size="is-small" class="mr-2"></b-icon
          >Configuraciónes
        </b-navbar-item>
        <b-navbar-item @click="handleLogoutClick">
          <b-icon icon="logout" size="is-small" class="mr-2"></b-icon>Cerrar
          Sesión
        </b-navbar-item>
      </b-navbar-dropdown>
    </template>
  </b-navbar>
</template>
<script>
import { mapActions, mapGetters, mapState } from "vuex";
import token from "@/services/TokenService";
export default {
  computed: {
    ...mapGetters("auth", ["profile"]),
  },
  methods: {
    ...mapActions("auth", ["logout"]),

    handleLogoutClick() {
      this.logout();
      this.$router.push({
        name: "login",
      });
      location.reload();
    },
  },
};
</script>