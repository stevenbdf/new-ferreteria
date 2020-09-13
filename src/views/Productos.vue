<template>
  <div class="mb-2 md:mx-16">
    <h2 class="title is-2">Productos</h2>
    <form @submit.prevent="product.new ? handleUpdate() : handleCreate()">
      <div class="flex flex-wrap justify-between my-2">
        <!-- Formulario -->
        <div class="flex flex-wrap w-full px-2 md:mb-2 md:w-1/2">
          <div class="w-full">
            <b-field label="Descripción">
              <b-input v-model="product.description" required></b-input>
            </b-field>
          </div>
          <div class="w-1/3 mt-4 pr-4">
            <b-field label="Proveedor">
              <b-select
                v-model="product.supplier_id"
                placeholder="Selecciona un proveedor"
                expanded
              >
                <option
                  v-for="option in suppliers"
                  :value="option.id"
                  :key="option.id"
                >{{ option.name }}</option>
              </b-select>
            </b-field>
          </div>
          <div class="w-1/3 mt-4 pr-4">
            <b-field label="Departamento">
              <b-select
                v-model="product.department_id"
                placeholder="Selecciona un departamento"
                expanded
              >
                <option
                  v-for="option in departments"
                  :value="option.id"
                  :key="option.id"
                >{{ option.name }}</option>
              </b-select>
            </b-field>
          </div>
          <div class="w-1/3 mt-4">
            <b-field label="Código">
              <b-input v-model="product.id" required></b-input>
            </b-field>
          </div>
          <div class="w-1/4 pr-4 mt-4">
            <b-field label="Costo base">
              <b-input type="number" min="0.01" step="0.01" v-model="product.base_cost" required></b-input>
            </b-field>
          </div>
          <div class="w-1/4 pr-4 mt-4">
            <b-field label="% de ganancia">
              <b-input
                type="number"
                min="0"
                max="100"
                step="1"
                v-model="product.profit"
                oninput="javascript: if (this.value > 100) this.value = 100;"
                required
              ></b-input>
            </b-field>
          </div>
          <div class="w-1/4 pr-4 mt-4">
            <b-field label="Precio sugerido">
              <b-input
                type="number"
                min="0.01"
                step="0.01"
                v-model="product.suggested_price"
                disabled
                required
              ></b-input>
            </b-field>
          </div>
          <div class="w-1/4 mt-4">
            <b-field label="Precio de venta">
              <b-input type="number" min="0.01" step="0.01" v-model="product.price" required></b-input>
            </b-field>
          </div>
        </div>
        <div class="w-full px-2 md:mb-2 md:w-1/3"></div>
      </div>
      <div class="flex flex-wrap">
        <div class="p-2 w-full">
          <b-field>
            <b-button
              class="w-1/12 mr-5"
              :type="product.new ? 'is-warning' : 'is-success'"
              native-type="submit"
            >{{ product.new ? 'Actualizar' : 'Crear' }}</b-button>

            <b-button @click="clearProduct()" class="w-1/12" type="is-info">Limpiar</b-button>
          </b-field>
        </div>
      </div>
    </form>
    <div class="px-2 mt-5">
      <b-table
        ref="instTable"
        :data="products"
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
          <b-button @click="setProduct(props.row)" type="is-warning" class="mr-3" icon-right="eye" />
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
    product: {},
    isLoading: false,
  }),
  watch: {
    department_id() {
      this.calcNextId();
    },
    profitANDbase_cost() {
      this.calcPrice();
    },
  },
  computed: {
    ...mapState("products", ["products"]),
    ...mapState("departments", ["departments"]),
    ...mapState("suppliers", ["suppliers"]),
    department_id() {
      return this.product.department_id;
    },
    base_cost() {
      return this.product.base_cost;
    },
    profit() {
      return this.product.profit;
    },
    profitANDbase_cost() {
      return `${this.product.profit}|${this.product.base_cost}`;
    },
  },
  async created() {
    this.isLoading = true;
    await this.fetchDepartments();
    await this.fetchSuppliers();
    await this.fetchProducts();
    this.clearProduct();
    this.isLoading = false;
  },
  methods: {
    ...mapActions("products", {
      fetchProducts: "fetch",
      createProduct: "store",
      updateProduct: "update",
      destroyProduct: "destroy",
      getNextId: "getNextId",
    }),
    ...mapActions("departments", {
      fetchDepartments: "fetch",
    }),
    ...mapActions("suppliers", {
      fetchSuppliers: "fetch",
    }),
    setProduct(product) {
      this.product = { ...product };
    },
    async handleCreate() {
      try {
        let formData = new FormData();
        let {
          id,
          department_id,
          supplier_id,
          description,
          profit,
          price,
        } = this.product;

        formData.append("id", id);
        formData.append("department_id", department_id);
        formData.append("supplier_id", supplier_id);
        formData.append("description", description);
        formData.append("profit", profit);
        formData.append("price", price);

        let data = await this.createProduct(formData);
        this.calcNextId();
        this.clearProduct();
        this.$buefy.toast.open({
          message: "Producto creado",
          type: "is-success",
        });
      } catch (e) {
        this.$buefy.toast.open({
          message: "Error al crear producto",
          type: "is-danger",
        });
      }
    },
    async handleUpdate() {
      try {
        await this.updateProduct(this.product);
        this.clearProduct();
        this.$buefy.toast.open({
          message: "Producto actualizado",
          type: "is-success",
        });
      } catch (e) {
        this.$buefy.toast.open({
          message: "Error al actualizar producto",
          type: "is-danger",
        });
      }
    },
    handleDelete(product) {
      this.$buefy.dialog.confirm({
        message: `¿Seguro que quieres eliminar a ${product.name}?`,
        confirmText: "Si, eliminar",
        type: "is-danger",
        hasIcon: true,
        cancelText: "Cancelar",
        onConfirm: async () => {
          try {
            await this.destroyProduct(product);

            this.$buefy.toast.open({
              message: "Producto eliminado",
              position: "is-bottom-left",
            });
          } catch (e) {
            console.error(e);
            this.$buefy.toast.open({
              message: "Error al eliminar producto",
              position: "is-bottom-left",
              duration: 4600,
              type: "is-danger",
            });
          } finally {
            this.clearProduct();
          }
        },
        onCancel: () => {
          this.clearProduct();
        },
      });
    },
    clearProduct() {
      this.product = {
        id: this.product.id,
        department_id: this.departments[0].id,
        supplier_id: this.suppliers[0].id,
        profit: 0,
        base_cost: 0,
      };
    },
    calcPrice() {
      let price =
        this.product.base_cost *
        (this.product.profit ? 1 + this.product.profit / 100 : 1);

      this.product = {
        ...this.product,
        suggested_price: price.toFixed(2),
        price: price.toFixed(2),
      };
    },
    async calcNextId() {
      if (!this.isLoading) {
        let { id } = await this.getNextId({ ...this.product });
        this.product = {
          ...this.product,
          id,
        };
      }
    },
  },
};
</script>