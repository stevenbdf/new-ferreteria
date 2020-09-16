<template>
  <div class="mb-2 mt-20 md:mx-16">
    <h2 class="title is-2">Departamentos</h2>
    <form @submit.prevent="department.id ? handleUpdate() : handleCreate()">
      <div class="flex flex-wrap my-2">
        <!-- Formulario -->
        <div class="w-full px-2 md:mb-2 md:w-6/12">
          <b-field label="Nombre">
            <b-input placeholder="Nombre" v-model="department.name" required></b-input>
          </b-field>
        </div>
        <div class="w-full px-2 md:mb-2 md:w-6/12">
          <b-field label="Descripción">
            <b-input min="8" max="8" placeholder="Descripción" v-model="department.description"></b-input>
          </b-field>
        </div>
      </div>
      <div class="flex flex-wrap">
        <div class="p-2 w-full">
          <b-field>
            <b-button
              class="w-1/12 mr-5"
              :type="department.id ? 'is-warning' : 'is-success'"
              native-type="submit"
            >{{ department.id ? 'Actualizar' : 'Crear' }}</b-button>

            <b-button @click="clearDepartment()" class="w-1/12" type="is-info">Limpiar</b-button>
          </b-field>
        </div>
      </div>
    </form>
    <div class="px-2 mt-5">
      <b-table
        ref="instTable"
        :data="departments"
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
          field="id"
          label="Código"
          :searchable="true"
          width="40"
          numeric
          sortable
          v-slot="props"
        >{{ props.row.id }}</b-table-column>
        <b-table-column
          field="name"
          :searchable="true"
          label="Nombre"
          v-slot="props"
        >{{ props.row.name }}</b-table-column>
        <b-table-column
          field="description"
          :searchable="true"
          label="Descripción"
          v-slot="props"
        >{{ props.row.description }}</b-table-column>
        <b-table-column label="Acciónes" v-slot="props">
          <b-button
            @click="setDepartment(props.row)"
            type="is-warning"
            class="mr-3"
            icon-right="eye"
          />
          <b-button @click="handleDelete(props.row)" type="is-danger" icon-right="delete" />
        </b-table-column>
      </b-table>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  data: () => ({
    department: {},
    isLoading: false,
  }),
  computed: {
    ...mapState("departments", ["departments"]),
  },
  async created() {
    this.isLoading = true;
    await this.fetchDepartments();
    this.isLoading = false;
  },
  methods: {
    ...mapActions("departments", {
      fetchDepartments: "fetch",
      createDepartment: "store",
      updateDepartment: "update",
      destroyDepartment: "destroy",
    }),
    setDepartment(department) {
      this.department = { ...department };
    },
    async handleCreate() {
      try {
        let data = await this.createDepartment(this.department);
        this.clearDepartment();
        this.$buefy.toast.open({
          message: "Departamento creado",
          type: "is-success",
        });
      } catch (e) {
        this.$buefy.toast.open({
          message: "Error al crear departamento",
          type: "is-danger",
        });
      }
    },
    async handleUpdate() {
      try {
        await this.updateDepartment(this.department);
        this.clearDepartment();
        this.$buefy.toast.open({
          message: "Departamento actualizado",
          type: "is-success",
        });
      } catch (e) {
        this.$buefy.toast.open({
          message: "Error al actualizar departamento",
          type: "is-danger",
        });
      }
    },
    handleDelete(department) {
      this.department = { ...department };

      this.$buefy.dialog.confirm({
        message: `¿Seguro que quieres eliminar a ${this.department.name}?`,
        confirmText: "Si, eliminar",
        type: "is-danger",
        hasIcon: true,
        cancelText: "Cancelar",
        onConfirm: async () => {
          try {
            await this.destroyDepartment(this.department);

            this.$buefy.toast.open({
              message: "Departamento eliminado",
              position: "is-bottom-left",
            });
          } catch (e) {
            console.error(e);
            this.$buefy.toast.open({
              message: "Error al eliminar departamento",
              position: "is-bottom-left",
              duration: 4600,
              type: "is-danger",
            });
          } finally {
            this.clearDepartment();
          }
        },
        onCancel: () => {
          this.clearDepartment();
        },
      });
    },
    clearDepartment() {
      this.department = {};
    },
  },
};
</script>