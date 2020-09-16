<template>
  <div class="mb-2 mt-20 md:mx-16">
    <h2 class="title is-2">Sucursales</h2>
    <form @submit.prevent="office.id ? handleUpdate() : handleCreate()">
      <div class="flex flex-wrap my-2">
        <!-- Formulario -->
        <div class="w-full px-2 md:mb-2 md:w-6/12">
          <b-field label="Nombre">
            <b-input placeholder="Nombre" v-model="office.name" required></b-input>
          </b-field>
        </div>
        <div class="w-full px-2 md:mb-2 md:w-3/12">
          <b-field label="Telefono">
            <b-input min="8" max="8" placeholder="Telefono" v-model="office.phone"></b-input>
          </b-field>
        </div>
        <div class="w-full px-2 md:mb-2 md:w-3/12">
          <b-field label="NIT">
            <b-input placeholder="NIT" v-model="office.nit"></b-input>
          </b-field>
        </div>
        <div class="w-full px-2 md:mb-2 md:w-6/12">
          <b-field label="Dirección">
            <b-input placeholder="Dirección" v-model="office.address"></b-input>
          </b-field>
        </div>
        <div class="w-full px-2 md:mb-2 md:w-2/12">
          <b-field label="No.Registro">
            <b-input placeholder="No.Registro" v-model="office.registry_number"></b-input>
          </b-field>
        </div>
        <div class="w-full px-2 md:mb-2 md:w-2/12">
          <b-field label="Correlativo Factura">
            <b-input placeholder="Correlativo Factura" v-model="office.invoice_correlative"></b-input>
          </b-field>
        </div>
        <div class="w-full px-2 md:mb-2 md:w-2/12">
          <b-field label="Correlativo Credito Fiscal">
            <b-input
              placeholder="Correlativo Credito Fiscal"
              v-model="office.fiscal_credit_correlative"
            ></b-input>
          </b-field>
        </div>
      </div>
      <div class="flex flex-wrap">
        <div class="p-2 w-full">
          <b-field>
            <b-button
              class="w-1/12 mr-5"
              :type="office.id ? 'is-warning' : 'is-success'"
              native-type="submit"
            >{{ office.id ? 'Actualizar' : 'Crear' }}</b-button>

            <b-button @click="clearOffice()" class="w-1/12" type="is-info">Limpiar</b-button>
          </b-field>
        </div>
      </div>
    </form>
    <div class="px-2 mt-5">
      <b-table
        ref="instTable"
        :data="offices"
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
          field="phone"
          :searchable="true"
          label="Telefono"
          v-slot="props"
        >{{ props.row.phone }}</b-table-column>
        <b-table-column
          field="address"
          :searchable="true"
          label="Dirección"
          v-slot="props"
        >{{ props.row.address }}</b-table-column>
        <b-table-column
          field="invoice_correlative"
          :searchable="true"
          label="Correlativo Factura"
          v-slot="props"
        >{{ props.row.invoice_correlative }}</b-table-column>
        <b-table-column
          field="fiscal_credit_correlative"
          :searchable="true"
          label="Correlativo Credito Fiscal"
          v-slot="props"
        >{{ props.row.fiscal_credit_correlative }}</b-table-column>
        <b-table-column label="Acciónes" v-slot="props">
          <b-button @click="setOffice(props.row)" type="is-warning" class="mr-3" icon-right="eye" />
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
    office: {},
    isLoading: false,
  }),
  computed: {
    ...mapState("offices", ["offices"]),
  },
  async created() {
    this.isLoading = true;
    await this.fetchOffices();
    this.isLoading = false;
  },
  methods: {
    ...mapActions("offices", {
      fetchOffices: "fetch",
      createOffice: "store",
      updateOffice: "update",
      destroyOffice: "destroy",
    }),
    setOffice(office) {
      this.office = { ...office };
    },
    async handleCreate() {
      try {
        let data = await this.createOffice(this.office);
        this.clearOffice();
        this.$buefy.toast.open({
          message: "Sucursal creada",
          type: "is-success",
        });
      } catch (e) {
        this.$buefy.toast.open({
          message: "Error al crear sucursal",
          type: "is-danger",
        });
      }
    },
    async handleUpdate() {
      try {
        await this.updateOffice(this.office);
        this.clearOffice();
        this.$buefy.toast.open({
          message: "Sucursal actualizada",
          type: "is-success",
        });
      } catch (e) {
        this.$buefy.toast.open({
          message: "Error al actualizar sucursal",
          type: "is-danger",
        });
      }
    },
    handleDelete(office) {
      this.office = { ...office };

      this.$buefy.dialog.confirm({
        message: `¿Seguro que quieres eliminar a ${this.office.name}?`,
        confirmText: "Si, eliminar",
        type: "is-danger",
        hasIcon: true,
        cancelText: "Cancelar",
        onConfirm: async () => {
          try {
            await this.destroyOffice(this.office);

            this.$buefy.toast.open({
              message: "Sucursal eliminada",
              position: "is-bottom-left",
            });
          } catch (e) {
            console.error(e);
            this.$buefy.toast.open({
              message: "Error al eliminar sucursal",
              position: "is-bottom-left",
              duration: 4600,
              type: "is-danger",
            });
          } finally {
            this.clearOffice();
          }
        },
        onCancel: () => {
          this.clearOffice();
        },
      });
    },
    clearOffice() {
      this.office = {};
    },
  },
};
</script>