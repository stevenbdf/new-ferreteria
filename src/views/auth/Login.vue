<template>
  <div class="columns is-centered">
    <div class="card mt-5 px-6 w-1/3" style="height: 85vh">
      <form @submit.prevent="handleLogin">
        <div class="columns is-centered">
          <img src="@/assets/logo.png" alt />
        </div>
        <b-field label="Nombre de usuario:">
          <b-input placeholder="Usuario" v-model="data.username" type="text" required></b-input>
        </b-field>
        <b-field label="Contraseña:">
          <b-input
            placeholder="Contraseña"
            v-model="data.password"
            type="password"
            password-reveal
            required
          ></b-input>
        </b-field>
        <div class="field mt-8">
          <b-checkbox
            v-model="rememberMe"
            @click="remeberMe = !remeberMe"
          >Recordar nombre de usuario</b-checkbox>
        </div>
        <div class="has-text-centered">
          <div class="my-2">
            <b-button type="is-success" native-type="submit">Ingresar</b-button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    data: {},
    rememberMe: false,
  }),
  created() {
    if (this.rememberMeData) {
      if (this.rememberMeData.rememberMe) {
        this.data.username = this.rememberMeData.username;
        this.rememberMe = true;
      }
    }
  },
  computed: {
    ...mapGetters("auth", ["rememberMeData"]),
  },
  methods: {
    ...mapActions("auth", ["login"]),
    async handleLogin() {
      try {
        let status = await this.login({
          ...this.data,
          rememberMe: this.rememberMe,
        });
        this.$router.push({
          name: "facturacion",
        });
      } catch (e) {
        console.log(e);
        this.$buefy.toast.open({
          message: "Usuario y/o contraseña incorrecta",
          type: "is-danger",
        });
      }
    },
  },
};
</script>