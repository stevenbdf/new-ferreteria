<template>
    <b-navbar type="is-info">
        <template slot="start">
            <b-navbar-item href="#">
                SISTEMA DE INVENTARIO
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