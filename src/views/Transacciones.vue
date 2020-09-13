<template>
  <div class="mb-2 md:mx-16">
    <h2 class="title is-2">Inventario</h2>
    <form @submit.prevent="transaction.id ? handleUpdate() : handleCreate()">
      <div class="flex flex-wrap my-2 w-full">
        <!-- Formulario -->
        <div class="w-full px-2 md:mb-2 md:w-6/12">
          <b-field label="Buscar producto">
            <b-autocomplete
              v-model="search_product"
              placeholder="ejem. Martillo, FONT0005"
              open-on-focus
              :icon-right="search_product.trim() !== '' ? 'close' : 'magnify'"
              :data="searchProducts"
              field="description"
              :icon-right-clickable="search_product.trim() !== '' ? true : false"
              @icon-right-click="search_product = ''"
              @select="option => (product = option !== null ? { ...option} : {})"
              required
            ></b-autocomplete>
          </b-field>
        </div>
        <div class="w-full pl-4 md:mb-2 md:w-3/12">
          <b-field label="Sucursal">
            <b-select
              v-model="transaction.office_id"
              placeholder="Selecciona una sucursal"
              expanded
            >
              <option
                v-for="option in offices"
                :value="option.id"
                :key="option.id"
              >{{ option.name }}</option>
            </b-select>
          </b-field>
        </div>
        <div class="w-full px-2 md:mb-2 md:w-3/12 flex justify-center">
          <b-field label="Entrada Salida">
            <b-switch
              size="is-medium"
              class="pr-12pt-1"
              v-model="transaction.type"
              type="is-success"
              passive-type="is-danger"
              true-value="Entrada"
              false-value="Salida"
            >{{ transaction.type }}</b-switch>
          </b-field>
        </div>
        <div class="w-full px-2 md:mb-2 md:w-6/12">
          <b-field label="Descripción">
            <b-input
              placeholder="Ej. Compra a proveedor, Producto dañado"
              v-model="transaction.description"
              required
            ></b-input>
          </b-field>
        </div>
        <div class="w-full pl-4 md:mb-2 md:w-3/12">
          <b-field label="Cantidad">
            <b-input v-model="transaction.quantity" type="number" step="0.01" min="0.01" required></b-input>
          </b-field>
        </div>
        <div class="w-full px-2 md:mb-2 md:w-3/12 flex justify-center">
          <b-field label="Monto USD">
            <b-input v-model="transaction.amount" type="number" step="0.01" min="0.00" required></b-input>
          </b-field>
        </div>
      </div>
      <div class="flex flex-wrap">
        <div class="p-2 w-full">
          <b-field>
            <b-button
              class="w-1/12 mr-5"
              :type="transaction.id ? 'is-warning' : 'is-success'"
              native-type="submit"
            >{{ transaction.id ? 'Actualizar' : 'Crear' }}</b-button>

            <b-button @click="clearTransaction()" class="w-1/12" type="is-info">Limpiar</b-button>
          </b-field>
        </div>
      </div>
    </form>
    <div class="px-2 mt-5">
      <b-table
        ref="instTable"
        :data="transactions"
        :loading="isLoading"
        :paginated="true"
        :per-page="10"
        :show-detail-icon="true"
        detail-key="id"
        hoverable
        bordered
        striped
        narrowed
      >
        <b-table-column
          field="date"
          label="Fecha"
          :searchable="true"
          sortable
          v-slot="props"
        >{{ props.row.date }}</b-table-column>
        <b-table-column
          field="product_id"
          label="Código"
          :searchable="true"
          sortable
          v-slot="props"
        >{{ props.row.product_id }}</b-table-column>
        <b-table-column
          field="product.description"
          label="Producto"
          :searchable="true"
          sortable
          v-slot="props"
        >{{ props.row.product.description }}</b-table-column>
        <b-table-column
          field="user.full_name"
          label="Usuario"
          :searchable="true"
          sortable
          v-slot="props"
        >{{ props.row.user.full_name }}</b-table-column>
        <b-table-column field="type" label="Transacción" sortable v-slot="props">
          <b-tag
            class="w-full font-bold uppercase py-3"
            :type="props.row.type ? 'is-success' : 'is-danger'"
          >{{ props.row.type ? 'Entrada' : 'Salida' }}</b-tag>
        </b-table-column>
        <b-table-column
          field="description"
          label="Descripción"
          sortable
          v-slot="props"
        >{{ props.row.description }}</b-table-column>
        <b-table-column
          field="quantity"
          label="Cantidad"
          sortable
          v-slot="props"
        >{{ props.row.quantity }}</b-table-column>
        <b-table-column
          field="amount"
          label="Monto USD"
          sortable
          v-slot="props"
        >${{ props.row.amount }}</b-table-column>
        <b-table-column field="stock" label="Stock" sortable v-slot="props">
          <b-tag
            class="w-full"
            :type="props.row.stock ? 'is-info' : 'is-danger'"
          >{{ props.row.stock }}</b-tag>
        </b-table-column>
        <b-table-column field="cost" label="Promedio" sortable v-slot="props">${{ props.row.cost }}</b-table-column>
        <b-table-column label="Acciónes" centered v-slot="props">
          <b-button
            :disabled="!props.row.delete"
            @click="handleDelete(props.row)"
            type="is-danger"
            icon-right="delete"
          />
        </b-table-column>
      </b-table>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  data: () => ({
    //Transaction
    transaction: {},
    isLoading: false,

    //Product
    product: {},
    search_product: "",
  }),
  computed: {
    ...mapGetters("auth", ["profile"]),
    ...mapState("transactions", ["transactions"]),
    ...mapState("products", ["products"]),
    ...mapState("offices", ["offices"]),
    searchProducts() {
      return this.products.filter((product) => {
        return (
          product.description
            .toLowerCase()
            .includes(this.search_product.toLowerCase()) ||
          product.id.toLowerCase().includes(this.search_product.toLowerCase())
        );
      });
    },
  },
  async created() {
    this.isLoading = true;
    await this.fetchProducts();
    await this.fetchOffices();
    await this.fetchTransactions();
    this.validateDeleteTransaction();
    this.isLoading = false;
  },
  methods: {
    ...mapActions("transactions", {
      fetchTransactions: "fetch",
      createTransaction: "store",
      updateTransaction: "update",
      destroyTransaction: "destroy",
    }),
    ...mapActions("products", {
      fetchProducts: "fetch",
    }),
    ...mapActions("offices", {
      fetchOffices: "fetch",
    }),
    setTransaction(transaction) {
      this.transaction = { ...transaction };
    },
    async handleCreate() {
      try {
        let data = await this.createTransaction({
          ...this.transaction,
          product_id: this.product.id,
          type: this.transaction.type == "Entrada" ? 1 : 0,
          user_id: this.profile.id,
        });
        this.clearTransaction();
        this.validateDeleteTransaction();
        this.$buefy.toast.open({
          message: "Transacción creado",
          type: "is-success",
        });
      } catch (e) {
        this.$buefy.toast.open({
          message: "Error al crear transacción",
          type: "is-danger",
        });
      }
    },
    handleDelete(transaction) {
      this.transaction = { ...transaction };

      this.$buefy.dialog.confirm({
        message: `¿Seguro que quieres eliminar la ultima transacción del producto ${this.transaction.product_id}?`,
        confirmText: "Si, eliminar",
        type: "is-danger",
        hasIcon: true,
        cancelText: "Cancelar",
        onConfirm: async () => {
          try {
            if (this.transaction.delete) {
              await this.destroyTransaction(this.transaction);
              this.validateDeleteTransaction();
              this.$buefy.toast.open({
                message: "Transacción eliminada",
                position: "is-bottom-left",
              });
            } else {
              this.$buefy.toast.open({
                message:
                  "No es la ultima transacción, recarga la página e intenta de nuevo",
                position: "is-bottom-left",
                duration: 4600,
                type: "is-danger",
              });
            }
          } catch (e) {
            console.error(e);
            this.$buefy.toast.open({
              message: "Error al eliminar transacción",
              position: "is-bottom-left",
              duration: 4600,
              type: "is-danger",
            });
          } finally {
            this.clearTransaction();
          }
        },
        onCancel: () => {
          this.clearTransaction();
        },
      });
    },
    clearTransaction() {
      this.transaction = {
        office_id: this.transaction.office_id,
        type: this.transaction.type,
      };
    },
    validateDeleteTransaction() {
      this.transaction = {
        ...this.transaction,
        office_id: this.offices[0].id,
        type: "Entrada",
      };

      let checkedProducts = [];
      this.transactions.map((item, index) => {
        item.delete = false;
        if (!checkedProducts.find((itemP) => itemP == item.product_id)) {
          item.delete = true;
        }
        checkedProducts.push(item.product_id);
      });
    },
  },
};
</script>