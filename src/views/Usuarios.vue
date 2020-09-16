<template>
  <div class="mb-2 mt-20 md:mx-16">
    <h2 class="title is-2">Usuarios</h2>
    <form @submit.prevent="user.id ? handleUpdate() : handleCreate()">
      <div class="flex flex-wrap my-2">
        <!-- Formulario -->
        <div class="w-full px-2 md:mb-2 md:w-4/12">
          <b-field label="Nombre completo">
            <b-input placeholder="Nombre completo" v-model="user.full_name" required></b-input>
          </b-field>
        </div>
        <div class="w-full px-2 md:mb-2 md:w-3/12">
          <b-field label="Usuario">
            <b-input placeholder="Usuario" v-model="user.username" required></b-input>
          </b-field>
        </div>
        <div class="w-full px-2 md:mb-2 md:w-2/12">
          <b-field label="Correo">
            <b-input placeholder="Correo" type="email" v-model="user.email" required></b-input>
          </b-field>
        </div>
        <div class="w-full px-2 md:mb-2 md:w-2/12">
          <b-field label="Tipo de usuario">
            <b-select v-model="user.type" expanded>
              <option value="0">Empleado</option>
              <option value="1">Administrador</option>
            </b-select>
          </b-field>
        </div>
        <div class="w-full px-2 md:mb-2 md:w-2/12">
          <b-field label="Teléfono">
            <b-input type="number" placeholder="Teléfono" v-model="user.phone" required></b-input>
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
          <b-field :label=" !user.id ? 'Contraseña': 'Nueva contraseña'">
            <b-input placeholder="********" type="password" v-model="user.password" :required="!user.id"></b-input>
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
            <b-button
              class="w-1/12 mr-5"
              :type="user.id ? 'is-warning' : 'is-success'"
              native-type="submit"
            >{{ user.id ? 'Actualizar' : 'Crear' }}</b-button>

            <b-button @click="clearUser()" class="w-1/12" type="is-info">Limpiar</b-button>
          </b-field>
        </div>
      </div>
    </form>
    <div class="px-2 mt-5">
      <b-table
        ref="instTable"
        :data="users"
        :loading="isLoading"
        :paginated="true"
        :per-page="5"
        :show-detail-icon="true"
        detail-key="id"
        hoverable
        bordered
        striped
      >
        <b-table-column
          field="type"
          label="Tipo de Usuario"
          sortable
          v-slot="props"
        >{{ props.row.type ? 'Administrador' : 'Empleado' }}</b-table-column>
        <b-table-column
          field="full_name"
          :searchable="true"
          label="Nombre Completo"
          v-slot="props"
        >{{ props.row.full_name }}</b-table-column>
        <b-table-column
          field="username"
          :searchable="true"
          label="Usuario"
          v-slot="props"
        >{{ props.row.username }}</b-table-column>
        <b-table-column
          field="email"
          :searchable="true"
          label="Correo"
          v-slot="props"
        >{{ props.row.email }}</b-table-column>
        <b-table-column
          field="phone"
          :searchable="true"
          label="Telefono"
          v-slot="props"
        >{{ props.row.phone }}</b-table-column>
        <b-table-column label="Acciónes" v-slot="props">
          <b-button @click="setUser(props.row)" type="is-warning" class="mr-3" icon-right="eye" />
          <b-button @click="handleDelete(props.row)" type="is-danger" icon-right="delete" />
        </b-table-column>
      </b-table>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from "vuex";
const today = new Date();
export default {
  data: () => ({
    user: {},
    isLoading: false,
  }),
  computed: {
    ...mapState("users", ["users"]),
    minDate() {
      return new Date(
        today.getFullYear() - 100,
        today.getMonth(),
        today.getDate()
      );
    },
    maxDate() {
      return new Date(
        today.getFullYear() - 18,
        today.getMonth(),
        today.getDate()
      );
    },
  },
  async created() {
    this.isLoading = true;
    await this.fetchUsers();
    this.user = {
      type: 0,
    };
    this.isLoading = false;
  },
  methods: {
    ...mapActions("users", {
      fetchUsers: "fetch",
      createUser: "store",
      updateUser: "update",
      destroyUser: "destroy",
    }),
    setUser(user) {
      this.user = { ...user };
      if (user.birthdate !== null) {
        const birthdate = new Date(Date.parse(user.birthdate));
        birthdate.setDate(birthdate.getDate() + 1);
        this.user.birthdate = birthdate;
      }
    },
    async handleCreate() {
      if (this.user.password === this.user.password_confirmation) {
        try {
          let data = await this.createUser(this.user);
          this.clearUser();
          this.$buefy.toast.open({
            message: "Usuario creado",
            type: "is-success",
          });
        } catch (e) {
          this.$buefy.toast.open({
            message: "Error al crear usuario",
            type: "is-danger",
          });
        }
      } else {
        this.$buefy.toast.open({
          message: "Las contraseñas no son iguales, intenta de nuevo",
          type: "is-danger",
        });
      }
    },
    async handleUpdate() {
      try {
        await this.updateUser(this.user);
        this.clearUser();
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
    handleDelete(user) {
      this.user = { ...user };

      this.$buefy.dialog.confirm({
        message: `¿Seguro que quieres eliminar a ${this.user.full_name}?`,
        confirmText: "Si, eliminar",
        type: "is-danger",
        hasIcon: true,
        cancelText: "Cancelar",
        onConfirm: async () => {
          try {
            await this.destroyUser(this.user);

            this.$buefy.toast.open({
              message: "Usuario eliminado",
              position: "is-bottom-left",
            });
          } catch (e) {
            console.error(e);
            this.$buefy.toast.open({
              message: "Error al eliminar usuario",
              position: "is-bottom-left",
              duration: 4600,
              type: "is-danger",
            });
          } finally {
            this.clearUser();
          }
        },
        onCancel: () => {
          this.clearUser();
        },
      });
    },
    clearUser() {
      this.user = {
        type: 0,
      };
    },
  },
};
</script>