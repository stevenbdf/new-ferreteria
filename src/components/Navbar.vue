<template>
    <b-navbar type="is-info" class="py-2" style="background-color: #0A3D62;">
        <template slot="start">
            <b-navbar-item class="mr-10">
                SISTEMA DE INVENTARIO
            </b-navbar-item>
            <b-navbar-item tag="router-link" class="mr-10" :to="{ path: '/facturacion' }">
            Facturación
            </b-navbar-item>
            <b-navbar-item tag="router-link" class="mr-10" :to="{ path: '/transacciones' }">
            Transacciones
            </b-navbar-item>
            <b-navbar-item tag="router-link" class="mr-10" :to="{ path: '/proveedores' }">
            Proveedores
            </b-navbar-item>
            <b-navbar-item tag="router-link" class="mr-10" :to="{ path: '/departamentos' }">
            Departamentos
            </b-navbar-item>
            <b-navbar-item tag="router-link" class="mr-10" :to="{ path: '/clientes' }">
            Clientes
            </b-navbar-item>
        </template>

        <template slot="end">
            <b-navbar-dropdown :label="profile.full_name">
                <b-navbar-item href="#">
                    Perfil
                </b-navbar-item>
                <b-navbar-item href="#">
                    Cerrar Sesión
                </b-navbar-item>
            </b-navbar-dropdown>
        </template>
    </b-navbar>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    computed: mapGetters("auth",["profile"]),
}
</script>