<template>
  <div class="mb-2 mt-20 md:mx-16">
    <h2 class="title is-2">Proveedores</h2>
    <form @submit.prevent="supplier.id ? handleUpdate() : handleCreate()">
      <div class="flex flex-wrap my-2">
        <!-- Formulario -->
        <div class="w-full px-2 md:mb-2 md:w-6/12">
          <b-field label="Nombre completo">
            <b-input placeholder="Nombre completo" v-model="supplier.name" required></b-input>
          </b-field>
        </div>
        <div class="w-full px-2 md:mb-2 md:w-3/12">
          <b-field label="Telefono">
            <b-input min="8" max="8" placeholder="Telefono" v-model="supplier.phone"></b-input>
          </b-field>
        </div>
        <div class="w-full px-2 md:mb-2 md:w-3/12">
          <b-field label="Correo">
            <b-input type="email" placeholder="Correo" v-model="supplier.email"></b-input>
          </b-field>
        </div>
        <div class="w-full px-2 md:mb-2 md:w-6/12">
          <b-field label="Dirección">
            <b-input placeholder="Dirección" v-model="supplier.address"></b-input>
          </b-field>
        </div>
        <div class="w-full px-2 md:mb-2 md:w-3/12">
          <b-field label="NIT">
            <b-input placeholder="NIT" v-model="supplier.nit"></b-input>
          </b-field>
        </div>
        <div class="w-full px-2 md:mb-2 md:w-3/12">
          <b-field label="No.Registro">
            <b-input placeholder="No.Registro" v-model="supplier.registry_number"></b-input>
          </b-field>
        </div>
      </div>
      <div class="flex flex-wrap">
        <div class="p-2 w-full">
          <b-field>
            <b-button
              class="w-1/12 mr-5"
              :type="supplier.id ? 'is-warning' : 'is-success'"
              native-type="submit"
            >{{ supplier.id ? 'Actualizar' : 'Crear' }}</b-button>

            <b-button @click="clearSupplier()" class="w-1/12" type="is-info">Limpiar</b-button>
          </b-field>
        </div>
      </div>
    </form>
    <div class="px-2 mt-5">
      <b-table
        ref="instTable"
        :data="suppliers"
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
        <b-table-column
          field="nit"
          :searchable="true"
          label="NIT"
          v-slot="props"
        >{{ props.row.nit }}</b-table-column>
        <b-table-column label="Acciónes" v-slot="props">
          <b-button
            @click="setSupplier(props.row)"
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
    supplier: {},
    isLoading: false,
  }),
  computed: {
    ...mapState("suppliers", ["suppliers"]),
  },
  async created() {
    this.isLoading = true;
    await this.fetchSuppliers();
    this.isLoading = false;
  },
  methods: {
    ...mapActions("suppliers", {
      fetchSuppliers: "fetch",
      createSupplier: "store",
      updateSupplier: "update",
      destroySupplier: "destroy",
    }),
    setSupplier(supplier) {
      this.supplier = { ...supplier };
    },
    async handleCreate() {
      try {
        let data = await this.createSupplier(this.supplier);
        this.clearSupplier()
        this.$buefy.toast.open({
          message: "Proveedor creado",
          type: "is-success",
        });
      } catch (e) {
        this.$buefy.toast.open({
          message: "Error al crear proveedor",
          type: "is-danger",
        });
      }
    },
    async handleUpdate() {
      try {
        await this.updateSupplier(this.supplier);
        this.clearSupplier()
        this.$buefy.toast.open({
          message: "Proveedor actualizado",
          type: "is-success",
        });
      } catch (e) {
        this.$buefy.toast.open({
          message: "Error al actualizar proveedor",
          type: "is-danger",
        });
      }
    },
    handleDelete(supplier) {
      this.supplier = { ...supplier };

      this.$buefy.dialog.confirm({
        message: `¿Seguro que quieres eliminar a ${this.supplier.name}?`,
        confirmText: "Si, eliminar",
        type: "is-danger",
        hasIcon: true,
        cancelText: "Cancelar",
        onConfirm: async () => {
          try {
            await this.destroySupplier(this.supplier);

            this.$buefy.toast.open({
              message: "Proveedor eliminado",
              position: "is-bottom-left",
            });
          } catch (e) {
            console.error(e);
            this.$buefy.toast.open({
              message: "Error al eliminar proveedor",
              position: "is-bottom-left",
              duration: 4600,
              type: "is-danger",
            });
          } finally {
            this.clearSupplier()
          }
        },
        onCancel: () => {
          this.clearSupplier()
        },
      });
    },
    clearSupplier() {
      this.supplier = {}
    }
  },
};
</script>