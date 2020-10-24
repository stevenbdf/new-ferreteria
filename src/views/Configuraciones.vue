<template>
  <div class="mb-2 mt-20 md:mx-16">
    <h2 class="title is-2">Configuraciones</h2>

    <h3 class="subtitle is-3 px-2 pt-2">Mi Perfil</h3>
    <form @submit.prevent="user.id ? handleUpdate() : handleCreate()">
      <div class="flex flex-wrap my-2">
        <!-- Formulario -->
        <div class="w-full px-2 md:mb-2 md:w-4/12">
          <b-field label="Nombre completo">
            <b-input
              placeholder="Nombre completo"
              v-model="user.full_name"
              required
            ></b-input>
          </b-field>
        </div>
        <div class="w-full px-2 md:mb-2 md:w-3/12">
          <b-field label="Usuario">
            <b-input
              placeholder="Usuario"
              v-model="user.username"
              required
            ></b-input>
          </b-field>
        </div>
        <div class="w-full px-2 md:mb-2 md:w-4/12">
          <b-field label="Correo">
            <b-input
              placeholder="Correo"
              type="email"
              v-model="user.email"
              required
            ></b-input>
          </b-field>
        </div>
        <div class="w-full px-2 md:mb-2 md:w-2/12">
          <b-field label="Teléfono">
            <b-input
              type="number"
              placeholder="Teléfono"
              v-model="user.phone"
              required
            ></b-input>
          </b-field>
        </div>
        <div class="w-full px-2 md:mb-2 md:w-2/12">
          <b-field label="DUI">
            <b-input placeholder="DUI" v-model="user.dui" required></b-input>
          </b-field>
        </div>
        <div class="w-full px-2 md:mb-2 md:w-3/12">
          <b-field label="NIT">
            <b-input placeholder="NIT" v-model="user.nit" required></b-input>
          </b-field>
        </div>
        <div class="w-full px-2 md:mb-2 md:w-2/12">
          <b-field :label="!user.id ? 'Contraseña' : 'Nueva contraseña'">
            <b-input
              placeholder="********"
              type="password"
              v-model="user.password"
              :required="!user.id"
            ></b-input>
          </b-field>
        </div>
        <div class="w-full px-2 md:mb-2 md:w-2/12">
          <b-field label="Confirmar contraseña">
            <b-input
              placeholder="********"
              type="password"
              v-model="user.password_confirmation"
              :required="!user.id"
            ></b-input>
          </b-field>
        </div>
      </div>
      <div class="flex flex-wrap">
        <div class="p-2 w-full">
          <b-field>
            <b-button class="w-1/12 mr-5" type="is-warning" native-type="submit"
              >Actualizar</b-button
            >
          </b-field>
        </div>
      </div>
    </form>
    <h3 class="subtitle is-3 px-2 pt-8">Sistema</h3>
    <div class="w-full pl-4 md:mb-2 md:w-3/12">
      <b-field label="Sucursal actual">
        <b-select
          :disabled="profile.type != 1"
          v-model="currentOfficeId"
          placeholder="Selecciona una sucursal"
          expanded
        >
          <option v-for="option in offices" :value="option.id" :key="option.id">
            {{ option.name }}
          </option>
        </b-select>
      </b-field>
    </div>
    <b-field class="py-2 px-2">
      <b-button class="w-1/12 mr-5" type="is-warning" @click="handleUpdateOffice" 
        >Actualizar</b-button
      >
    </b-field>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from "vuex";
import token from '@/services/TokenService'
const today = new Date();
export default {
  data: () => ({
    user: {},
    currentOfficeId: 0,
    isLoading: false,
  }),
  computed: {
    ...mapGetters("auth", ["profile"]),
    ...mapState("offices", ["offices"]),
  },
  async created() {
    let user = await this.getUser(this.profile);
    this.user = {
      ...user,
    };
    await this.fetchOffices();
    let office = JSON.parse(token.getOfficeId());
    this.currentOfficeId = office.id;
  },
  methods: {
    ...mapActions("users", {
      getUser: "index",
      updateUser: "update",
    }),
    ...mapActions("offices", {
      fetchOffices: "fetch",
      setCurrentOfficeId: "setOfficeId"
    }),
    async handleUpdate() {
      try {
        await this.updateUser(this.user);

        this.$buefy.toast.open({
          message: "Usuario actualizado",
          type: "is-success",
        });
      } catch (e) {
        this.$buefy.toast.open({
          message: "Error al actualizar usuario",
          type: "is-danger",
        });
      }
    },
    handleUpdateOffice() {
      let currentIndex = 0
      this.offices.map((item, index) => {
        if (item.id == this.currentOfficeId) {
          currentIndex = index
        }
      })
      this.setCurrentOfficeId({
        id: this.currentOfficeId,
        index: currentIndex
      })
      this.$buefy.toast.open({
          message: "Sucursal actual actualizada",
          type: "is-success",
        });
    }
  },
};
</script>