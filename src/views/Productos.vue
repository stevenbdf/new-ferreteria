<template>
  <div class="mb-2 mt-20 md:mx-16">
    <h2 class="title is-2">Productos</h2>
    <form @submit.prevent="product.new ? handleUpdate() : handleCreate()">
      <div class="flex flex-wrap justify-between my-2">
        <!-- Formulario -->
        <div class="flex flex-wrap w-full px-2 md:mb-2 md:w-1/2">
          <div class="w-full">
            <b-field label="Descripción">
              <b-input
                :disabled="profile.type != 1"
                v-model="product.description"
                required
              ></b-input>
            </b-field>
          </div>
          <div class="w-1/3 mt-4 pr-4">
            <b-field label="Proveedor">
              <b-select
                :disabled="profile.type != 1"
                v-model="product.supplier_id"
                placeholder="Selecciona un proveedor"
                expanded
              >
                <option
                  v-for="option in suppliers"
                  :value="option.id"
                  :key="option.id"
                >
                  {{ option.name }}
                </option>
              </b-select>
            </b-field>
          </div>
          <div class="w-1/3 mt-4 pr-4">
            <b-field label="Departamento">
              <b-select
                :disabled="profile.type != 1"
                v-model="product.department_id"
                placeholder="Selecciona un departamento"
                expanded
              >
                <option
                  v-for="option in departments"
                  :value="option.id"
                  :key="option.id"
                >
                  {{ option.name }}
                </option>
              </b-select>
            </b-field>
          </div>
          <div class="w-1/3 mt-4">
            <b-field label="Código">
              <b-input disabled v-model="product.id" required></b-input>
            </b-field>
          </div>
          <div class="w-1/4 pr-4 mt-4">
            <b-field label="Costo base">
              <b-input
                :disabled="profile.type != 1"
                type="number"
                min="0.01"
                step="0.01"
                v-model="product.base_cost"
                required
              ></b-input>
            </b-field>
          </div>
          <div class="w-1/4 pr-4 mt-4">
            <b-field label="% de ganancia">
              <b-input
                :disabled="profile.type != 1"
                type="number"
                step="0.01"
                v-model="product.profit"
                required
              ></b-input>
            </b-field>
          </div>
          <div class="w-1/4 pr-4 mt-4">
            <b-field label="Precio sugerido">
              <b-input
                :disabled="profile.type != 1"
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
              <b-input
                :disabled="profile.type != 1"
                type="number"
                min="0.01"
                step="0.01"
                v-model="product.price"
                required
              ></b-input>
            </b-field>
          </div>
          <div v-if="product.new" class="w-full mt-4 text-red-600">
            <p v-if="product.inventory_cost > 0">
              El costo base según inventario es de ${{
                product.inventory_cost.toFixed(2)
              }}
            </p>
            <p v-else>Sin registros en inventario</p>
          </div>
        </div>
        <div class="w-full flex flex-wrap px-2 md:mb-2 md:w-1/3">
          <div class="w-1/2 md:w-full xl:w-1/2 py-4 px-4">
            <img v-if="!url" src="@/assets/images/default.jpg" />
            <img v-else :src="url" />
          </div>
          <div class="w-1/2 md:w-full xl:w-1/2 py-4 px-4">
            <section>
              <b-field>
                <b-upload
                  :disabled="profile.type != 1"
                  v-model="file"
                  drag-drop
                  expanded
                >
                  <section class="section">
                    <div class="content has-text-centered">
                      <p>
                        <b-icon icon="upload" size="is-large"></b-icon>
                      </p>
                      <p>Arrastra tu imagen aquí o haz clic para subir</p>
                    </div>
                  </section>
                </b-upload>
              </b-field>
              <b-button
                :disabled="profile.type != 1"
                v-if="url"
                type="is-primary"
                expanded
                @click="url = undefined"
                >Limpiar</b-button
              >
            </section>
          </div>
        </div>
      </div>
      <div class="flex flex-wrap">
        <div class="p-2 w-full">
          <b-field>
            <b-button
              :disabled="profile.type != 1"
              class="w-1/12 mr-5"
              :type="product.new ? 'is-warning' : 'is-success'"
              native-type="submit"
              >{{ product.new ? "Actualizar" : "Crear" }}</b-button
            >

            <b-button
              @click="clearProduct()"
              class="w-1/12"
              type="is-info"
              >Limpiar</b-button
            >
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
        <b-table-column field="image_path" label="Imagen" v-slot="props">
          <img
            v-if="props.row.image_path"
            :src="props.row.image_path"
            width="100"
            height="100"
          />
          <img
            v-else
            src="@/assets/images/default.jpg"
            width="100"
            height="100"
          />
        </b-table-column>
        <b-table-column
          field="id"
          label="Código"
          :searchable="true"
          width="40"
          sortable
          v-slot="props"
          >{{ props.row.id }}</b-table-column
        >
        <b-table-column
          field="description"
          :searchable="true"
          label="Descripción"
          v-slot="props"
          >{{ props.row.description }}</b-table-column
        >
        <b-table-column
          field="department.name"
          :searchable="true"
          label="Departamento"
          v-slot="props"
          >{{ props.row.department.name }}</b-table-column
        >
        <b-table-column
          field="supplier.name"
          :searchable="true"
          label="Proveedor"
          v-slot="props"
          >{{ props.row.supplier.name }}</b-table-column
        >
        <b-table-column
          field="profit"
          :searchable="true"
          label="Costo Base Ingresado"
          v-slot="props"
          >${{ props.row.base_cost.toFixed(2) }}</b-table-column
        >
        <b-table-column
          field="profit"
          :searchable="true"
          label="% de ganancia"
          v-slot="props"
          >{{ props.row.profit }} %</b-table-column
        >
        <b-table-column
          field="profit"
          :searchable="true"
          label="Costo Según Inventario"
          v-slot="props"
          >${{ props.row.inventory_cost.toFixed(2) }}</b-table-column
        >
        <b-table-column
          field="price"
          :searchable="true"
          label="Precio de venta"
          v-slot="props"
        >
          <b-tag class="font-bold uppercase" type="is-success"
            >${{ props.row.price.toFixed(2) }}</b-tag
          >
        </b-table-column>
        <b-table-column
          field="stock"
          :searchable="true"
          label="Stock"
          v-slot="props"
          >{{ props.row.stock }}</b-table-column
        >
        <b-table-column label="Acciónes" v-slot="props">
          <b-button
            @click="setProduct(props.row)"
            type="is-warning"
            class="mb-3"
            icon-right="eye"
          />
          <b-button
            :disabled="profile.type != 1"
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
    product: {},
    file: {},
    url: undefined,
    isLoading: false,
  }),
  watch: {
    department_id() {
      this.calcNextId();
    },
    profitANDbase_cost() {
      this.calcPrice();
    },
    file() {
      if (this.file.name) {
        this.url = URL.createObjectURL(this.file);
      }
    },
  },
  computed: {
    ...mapGetters("auth", ["profile"]),
    ...mapState("products", ["products"]),
    ...mapState("departments", ["departments"]),
    ...mapState("suppliers", ["suppliers"]),
    department_id() {
      return this.product.department_id;
    },
    price() {
      return this.product.price;
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
      this.product = {
        ...product,
        base_cost: product.base_cost.toFixed(2),
        price: product.price.toFixed(2),
        new: true,
      };
      this.url = this.product.image_path;
    },
    async handleCreate() {
      try {
        let formData = new FormData();
        let {
          id,
          department_id,
          supplier_id,
          description,
          base_cost,
          profit,
          price,
        } = this.product;

        formData.append("id", id);
        formData.append("department_id", department_id);
        formData.append("supplier_id", supplier_id);
        formData.append("description", description);
        formData.append("base_cost", base_cost);
        formData.append("profit", profit);
        formData.append("price", price);

        if (this.file.name) {
          formData.append("image", this.file);
        }

        let data = await this.createProduct(formData);
        this.calcNextId();
        this.clearProduct();
        this.$buefy.toast.open({
          message: "Producto creado",
          type: "is-success",
        });
      } catch (e) {
        console.log(e);
        this.$buefy.toast.open({
          message: "Error al crear producto",
          type: "is-danger",
        });
      }
    },
    async handleUpdate() {
      try {
        let formData = new FormData();
        let {
          id,
          department_id,
          supplier_id,
          description,
          base_cost,
          profit,
          price,
        } = this.product;

        let profitCalculated = price / base_cost;

        profitCalculated = (profitCalculated - 1) * 100;

        formData.append("id", id);
        formData.append("department_id", department_id);
        formData.append("supplier_id", supplier_id);
        formData.append("description", description);
        formData.append("base_cost", base_cost);
        formData.append("profit", profitCalculated);
        formData.append("price", price);
        formData.append("_method", "PUT");

        if (this.file.name) {
          formData.append("image", this.file);
        }

        await this.updateProduct(formData);
        this.clearProduct();
        this.$buefy.toast.open({
          message: "Producto actualizado",
          type: "is-success",
        });
      } catch (e) {
        console.log(e);
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
      this.file = {};
      this.url = undefined;
      this.calcNextId();
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
      if (!this.isLoading && !this.product.new) {
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