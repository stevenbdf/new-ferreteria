<template>
<div class="columns is-centered">

<div class="card mt-5 px-6 column is-half" style="height: 85vh">
  <form @submit.prevent="handleLogin">
    <div class="columns is-centered">
      <img src="@/assets/logo.png" alt="">
    </div>
    <b-field label="Nombre de usuario:">
      <b-input placeholder="usuario" v-model="data.username" type="text" required ></b-input>
    </b-field>
    <b-field label="Contraseña:">
      <b-input placeholder="Contraseña" v-model="data.password"  type="password"
                password-reveal required></b-input>
    </b-field>
    <div class="has-text-centered">
      <div class="my-2">
        <b-button type="is-success" native-type="submit">
          Ingresar
        </b-button>
      </div>
      <router-link to="/">¿Olvidaste tú contraseña?</router-link>
    </div>
  </form>
</div>
</div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data:() => ({
    data: {}
  }),
  methods: {
    ...mapActions("auth",["login"]),
    async handleLogin(){
      let status = await this.login(this.data)
      this.$router.push({
        name: "facturacion"
      })
    }
  }
}
</script>