<template>
  <div class="mb-2 mt-20 md:mx-16">
    <h2 class="title is-2">Clientes</h2>
    <form @submit.prevent="customer.id ? handleUpdate() : handleCreate()">
      <div class="flex flex-wrap my-2">
        <!-- Formulario -->
        <div class="w-full px-2 md:mb-2 md:w-3/12">
          <b-field label="Nombre completo">
            <b-input placeholder="Nombre completo" v-model="customer.full_name" required></b-input>
          </b-field>
        </div>
        <div class="w-full px-2 md:mb-2 md:w-2/12">
          <b-field label="Nacimiento">
            <b-datepicker
              v-model="customer.birthdate"
              :date-parser="d => format(d, 'YYYY-MM-DD')"
              placeholder="Fecha de nacimiento"
              icon="calendar-today"
              :min-date="minDate"
              :max-date="maxDate"
              trap-focus
            ></b-datepicker>
          </b-field>
        </div>
        <div class="w-full px-2 md:mb-2 md:w-2/12">
          <b-field label="Telefono">
            <b-input min="8" max="8" placeholder="Telefono" v-model="customer.phone"></b-input>
          </b-field>
        </div>
        <div class="w-full px-2 md:mb-2 md:w-2/12">
          <b-field label="DUI">
            <b-input placeholder="DUI" v-model="customer.dui"></b-input>
          </b-field>
        </div>
        <div class="w-full px-2 md:mb-2 md:w-3/12">
          <b-field label="NIT">
            <b-input placeholder="NIT" v-model="customer.nit"></b-input>
          </b-field>
        </div>
        <div class="w-full px-2 md:mb-2 md:w-3/12">
          <b-field label="Correo">
            <b-input type="email" placeholder="Correo" v-model="customer.email"></b-input>
          </b-field>
        </div>
        <div class="w-full px-2 md:mb-2 md:w-4/12">
          <b-field label="Dirección">
            <b-input placeholder="Dirección" v-model="customer.address"></b-input>
          </b-field>
        </div>
        <div class="w-full px-2 md:mb-2 md:w-2/12">
          <b-field label="No.Registro">
            <b-input placeholder="No.Registro" v-model="customer.registry_number"></b-input>
          </b-field>
        </div>
        <div class="w-full px-2 md:mb-2 md:w-3/12">
          <b-field label="Rubro">
            <b-input placeholder="Rubro" v-model="customer.business_item"></b-input>
          </b-field>
        </div>
      </div>
      <div class="flex flex-wrap">
        <div class="p-2 w-full">
          <b-field>
            <b-button
              class="w-1/12 mr-5"
              :type="customer.id ? 'is-warning' : 'is-success'"
              native-type="submit"
            >{{ customer.id ? 'Actualizar' : 'Crear' }}</b-button>

            <b-button @click="clearCustomer()" class="w-1/12" type="is-info">Limpiar</b-button>
          </b-field>
        </div>
      </div>
    </form>
    <div class="px-2 mt-5">
      <b-table
        ref="instTable"
        :data="customers"
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
          field="full_name"
          :searchable="true"
          label="Nombre Completo"
          v-slot="props"
        >{{ props.row.full_name }}</b-table-column>
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
          <b-button
            @click="setCustomer(props.row)"
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
const today = new Date();
export default {
  data: () => ({
    customer: {},
    isLoading: false,
  }),
  computed: {
    ...mapState("customers", ["customers"]),
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
    }
  },
  async created() {
    this.isLoading = true;
    await this.fetchCustomers();
    this.isLoading = false;
  },
  methods: {
    ...mapActions("customers", {
      fetchCustomers: "fetch",
      createCustomer: "store",
      updateCustomer: "update",
      destroyCustomer: "destroy",
    }),
    setCustomer(customer) {
      this.customer = { ...customer };
      if (customer.birthdate !== null) {
        const birthdate = new Date(Date.parse(customer.birthdate));
        birthdate.setDate(birthdate.getDate() + 1);
        this.customer.birthdate = birthdate;
      }
    },
    async handleCreate() {
      let datos;
      if (this.customer.birthdate) {
        const birthdate = this.customer.birthdate;
        const day =
          new Date(birthdate).getDate() > 9
            ? new Date(birthdate).getDate().toString()
            : `0${new Date(birthdate).getDate().toString()}`;
        const month =
          new Date(birthdate).getMonth() + 1 > 9
            ? new Date(birthdate).getMonth() + 1
            : `0${new Date(birthdate).getMonth() + 1}`;
        const year = new Date().getFullYear();
        let date = `${year}-${month}-${day}`;
        datos = { ...this.customer, birthdate: date };
      } else {
        datos = this.customer;
      }
      try {
        let data = await this.createCustomer(datos);
        this.clearCustomer()
        this.$buefy.toast.open({
          message: "Cliente creado",
          type: "is-success",
        });
      } catch (e) {
        this.$buefy.toast.open({
          message: "Error al crear cliente",
          type: "is-danger",
        });
      }
    },
    async handleUpdate() {
      let datos;
      if (this.customer.birthdate) {
        const birthdate = this.customer.birthdate;
        const day =
          new Date(birthdate).getDate() > 9
            ? new Date(birthdate).getDate().toString()
            : `0${new Date(birthdate).getDate().toString()}`;
        const month =
          new Date(birthdate).getMonth() + 1 > 9
            ? new Date(birthdate).getMonth() + 1
            : `0${new Date(birthdate).getMonth() + 1}`;
        const year = new Date().getFullYear();
        let date = `${year}-${month}-${day}`;
        datos = { ...this.customer, birthdate: date };
      } else {
        datos = this.customer;
      }
      try {
        await this.updateCustomer(datos);
        this.clearCustomer()
        this.$buefy.toast.open({
          message: "Cliente actualizado",
          type: "is-success",
        });
      } catch (e) {
        this.$buefy.toast.open({
          message: "Error al actualizar cliente",
          type: "is-danger",
        });
      }
    },
    handleDelete(customer) {
      this.customer = { ...customer };

      this.$buefy.dialog.confirm({
        message: `¿Seguro que quieres eliminar a ${this.customer.full_name}?`,
        confirmText: "Si, eliminar",
        type: "is-danger",
        hasIcon: true,
        cancelText: "Cancelar",
        onConfirm: async () => {
          try {
            await this.destroyCustomer(this.customer);

            this.$buefy.toast.open({
              message: "Cliente eliminado",
              position: "is-bottom-left",
            });
          } catch (e) {
            console.error(e);
            this.$buefy.toast.open({
              message: "Error al eliminar cliente",
              position: "is-bottom-left",
              duration: 4600,
              type: "is-danger",
            });
          } finally {
            this.clearCustomer()
          }
        },
        onCancel: () => {
          this.clearCustomer()
        },
      });
    },
    clearCustomer() {
      this.customer = {}
    }
  },
};
</script>