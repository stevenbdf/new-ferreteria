<template>
  <div>
    <h2 class="title is-2">Facturación</h2>
    <form @submit.prevent="customer.id ? handleUpdate() : handleCreate()" v-if="!process">
      <div class="columns">
        <!-- Buscador -->
        <div class="column">
          <b-field label="Buscar cliente">
              <b-autocomplete
                  v-model="search"
                  placeholder="ejem. Steven"
                  open-on-focus
                  :icon-right="search.trim() !== '' ? 'close' : 'magnify'"
                  :data="searchCustomers"
                  field="full_name"
                  :icon-right-clickable="search.trim() !== '' ? true : false"
                  @icon-right-click="search = ''"
                  @select="option => (customer = option !== null ? { ...option} : {})"
              >
              </b-autocomplete>
          </b-field>
        </div>
        <!-- Formulario -->
        <div class="column">
          <b-field label="Nombre completo">
            <b-input 
              placeholder="Nombre completo"
              v-model="customer.full_name"
              required></b-input>
          </b-field>
        </div>
        <div class="column">
          <b-field label="Nacimiento">
            <b-datepicker
                v-model="customer.birthdate"
                placeholder="Fecha de nacimiento"
                icon="calendar-today"
                :min-date="minDate"
                :max-date="maxDate"
                trap-focus>
            </b-datepicker>
          </b-field>
        </div>
        <div class="column">
          <b-field label="DUI">
            <b-input 
              placeholder="DUI"
              v-model="customer.dui"></b-input>
          </b-field>
        </div>
        <div class="column">
          <b-field label="NIT">
            <b-input
              placeholder="NIT"
              v-model="customer.nit"></b-input>
          </b-field>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <b-field label="Correo">
            <b-input 
              type="email"
              placeholder="Correo"
              v-model="customer.email"
            >
            </b-input>
          </b-field>
        </div>
        <div class="column">
          <b-field label="Dirección">
            <b-input
              placeholder="Dirección"
              v-model="customer.address"></b-input>
          </b-field>
        </div>
        <div class="column">
          <b-field label="No.Registro">
            <b-input
              placeholder="No.Registro"
              v-model="customer.registry_number"></b-input>
          </b-field>
        </div>
        <div class="column">
          <b-field label="Rubro">
            <b-input
              placeholder="Rubro"
              v-model="customer.business_item"></b-input>
          </b-field>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <b-field grouped>
            <b-field>
              <b-button type="is-info"
              @click="handleContinue()"
              :disabled="customer.full_name === undefined ? true : customer.full_name.trim() === '' ? true : false">
                Continuar
              </b-button>
            </b-field>
            <b-field>
              <b-button 
              :type="customer.id ? 'is-warning' : 'is-success'"
              native-type="submit"
              >
                {{ customer.id ? 'Actualizar' : 'Crear' }}
              </b-button>
            </b-field>
          </b-field>
        </div>
      </div>
    </form>
    <div v-else>
      <div class="columns">
        <div class="column">
          <b-button @click="handleBack()">Volver</b-button>
        </div>
        <div class="column is-four-fifths">
          <b-field grouped>
            <b-field>
              <b-radio v-model="fact_type"
                  @input="noFact = fact_invoice,handleChange()"
                  native-value="0">
                  Resivo
              </b-radio>
              <b-radio v-model="fact_type"
                  @input="noFact = fact_credential,handleChange()"
                  native-value="1">
                  Credito Fiscal
              </b-radio>
              <b-radio v-model="fact_type"
                  @input="noFact = '',handleChange()"
                  native-value="2">
                  Cotización
              </b-radio>
            </b-field>
          </b-field>
        </div>
      </div>
      <div class="columns mt-3">
        <div class="column is-one-fifth">
          <b-field label="Buscar producto">
              <b-autocomplete
                  v-model="search_product"
                  placeholder="ejem. Martillo"
                  open-on-focus
                  :icon-right="search_product.trim() !== '' ? 'close' : 'magnify'"
                  :data="searchProducts"
                  field="description"
                  :icon-right-clickable="search_product.trim() !== '' ? true : false"
                  @icon-right-click="search_product = ''"
                  @select="option => (product = option !== null ? { ...option} : {})"
              >
              </b-autocomplete>
          </b-field>
        </div>
      </div>
      <div class="columns">
        <div class="column is-four-fifths">
          <form @submit.prevent="handleAdd" class="my-2">
            <b-field grouped>
              <b-field label="Disponible">
                <b-input disabled v-model="product.profit" required></b-input>
              </b-field>
              <b-field label="Precio">
                <b-input v-model="product.price" required></b-input>
              </b-field>
              <b-field label="Cantidad">
              <b-input placeholder="Number"
                  v-model="product.quantity"
                  type="number"
                  min="1"
                  :max="product.profit -1"
                  required>
              </b-input>
              </b-field>
              <div class="field-bottom">
                <b-button 
                icon-left="plus"
                type="is-success"
                native-type="submit"
                :disabled="product.id && product.quantity ? false : true"
                />
              </div>
            </b-field>
          </form>
          <b-table
            :data="sale_products"
            bordered
            striped
            hoverable
            mobile-cards>
            <b-table-column field="id" label="N°" width="40" numeric v-slot="props">
              {{ props.row.id }}
            </b-table-column>
            <b-table-column field="description" label="Descripción" width="40" numeric v-slot="props">
              {{ props.row.description }}
            </b-table-column>
            <b-table-column field="sale_price" label="Precio" width="40" numeric v-slot="props">
              {{ fact_type == 1 ? (props.row.sale_price * 0.87).toFixed(2)  : props.row.sale_price }}
            </b-table-column>
            <b-table-column v-show="fact_type == 1" field="sale_price" label="IVA" width="40" numeric v-slot="props">
              {{ fact_type == 1 ? (props.row.sale_price * 0.13).toFixed(2)  : 0 }}
            </b-table-column>
            <b-table-column field="quantity" label="Cantidad" width="40" numeric v-slot="props">
              {{ props.row.quantity }}
            </b-table-column>
            <b-table-column label="Sob Total" width="40" numeric v-slot="props">
              {{ props.row.sale_price * props.row.quantity }}
            </b-table-column>
          </b-table>
        </div>
        <div class="column">
          <b-field label="Metodo de pago">
              <b-select placeholder="Selecciona metodo">
              </b-select>
          </b-field>
          <b-field label="No.Factura">
              <b-input 
              :disabled="fact_type == 2 ? true : false"
              v-model="noFact"></b-input>
          </b-field>
          <b-field label="Sub Total">
              <b-input disabled :value="sub_total.toFixed(2)"></b-input>
          </b-field>
          <b-field label="IVA (13%)">
              <b-input disabled :value="iva.toFixed(2)"></b-input>
          </b-field>
          <b-field label="Total">
              <b-input disabled :value="total.toFixed(2)"></b-input>
          </b-field>
        </div>
      </div>
      <div>
        <b-button 
          type="is-success"
          @click="handleFinally()">
          Facturar
        </b-button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex'
const today = new Date()
export default {
  data: () =>({
    // Proceso 1
    customer: {},
    search: '',
    process: false,
    // Proceso 2
    product: {},
    search_product: '',
    fact_type: 0,
    // Proceso 3
    sale_products: [],
    isLoading: false,
    // Proceso 4
    iva: 0,
    total: 0,
    sub_total: 0,
    noFact: '',
  }),
  computed: {
    ...mapGetters('auth',['profile']),
    ...mapState('customers',['customers']),
    ...mapState('products',['products']),
    ...mapGetters('offices',['office_id','fact_invoice','fact_credential']),

    minDate(){
      return new Date(today.getFullYear() - 30, today.getMonth(), today.getDate())
    },
    maxDate() {
      return new Date(today.getFullYear() - 19, today.getMonth(), today.getDate())
    },
    searchCustomers() {
      return this.customers.filter(customer => {
        return customer.full_name.toLowerCase().includes(this.search.toLowerCase())
      })
    },
    searchProducts() {
      return this.products.filter(product => {
        return product.description.toLowerCase().includes(this.search_product.toLowerCase())
      })
    },
  },
  async created(){
    this.isLoading = true
    await this.fetchCustomers()
    this.isLoading = false
  },
  methods: {
    ...mapActions('customers',{
      fetchCustomers: 'fetch',
      createCustomer: 'store',
      updateCustomer: 'update',
    }),
    ...mapActions('products',{
      fetchProducts: 'fetch',
    }),
    ...mapActions('offices',{
      fetchOffices: 'fetch',
    }),
    ...mapActions('invoices',{
      storeInvoice: 'store',
    }),
    ...mapActions('fiscalCredits',{
      storeFiscalCredit: 'store',
    }),
    ...mapActions('quotes',{
      storeQuote: 'store',
    }),
    async handleCreate() {
      try {
        let data = await this.createCustomer(this.customer)
        this.search = data.full_name
        this.customer = data
        this.$buefy.toast.open({
            message: 'Cliente creado',
            type: 'is-success'
        })
      } catch (e) {
        this.$buefy.toast.open({
            message: 'Error al crear cliente',
            type: 'is-danger'
        })
      }
    },
    async handleUpdate() {
      try {
      await this.updateCustomer(this.customer)
        this.$buefy.toast.open({
            message: 'Cliente actualizado',
            type: 'is-success'
        })
      } catch (e) {
        this.$buefy.toast.open({
            message: 'Error al actualizar cliente',
            type: 'is-danger'
        })
      }
    },
    async handleContinue(){
      this.isLoading = true
      this.process = true
      await this.fetchProducts()
      await this.fetchOffices()
      this.noFact = this.fact_invoice
      this.isLoading = false
    },
    handleBack(){
      this.process= false
      this.search = ''
      this.product = {}
      this.sale_products = []
      this.customer = {}
      this.iva = 0;
      this.total = 0;
      this.sub_total = 0;
      this.search_product = ''
      this.fact_type = 0
    },
    handleAdd(){
      let val = false
      this.sale_products.forEach(ele => {
        if (ele.id === this.product.id) {
          val = true;
        }
      })
      if (!val){
        this.sale_products.push({
          product_id: this.product.id,
          sale_price: this.product.price,
          ...this.product
        });
        if(this.fact_type == 1){
          this.sub_total += this.product.price * this.product.quantity
          this.iva += (this.product.price*0.13) * this.product.quantity
          this.total += (this.product.price*0.87) * this.product.quantity
        } else {
          this.sub_total += this.product.price * this.product.quantity;
          this.iva = 0;
          this.total = this.sub_total;
        }
      } else {
        this.$buefy.toast.open({
            message: 'Producto ya existente!',
            type: 'is-warning'
        })
      }
      this.product = {}
      this.search_product = ''
    },
    handleChange(){
      this.sub_total= 0;
      this.iva = 0
      this.total = 0
        this.sale_products.forEach(ele => {
          if(this.fact_type == 1){
              this.sub_total += ele.price * ele.quantity
              this.iva += (ele.price*0.13) * ele.quantity
              this.total += (ele.price*0.87) * ele.quantity
          } else {
              this.sub_total += ele.price * ele.quantity
              this.iva = 0
              this.total = this.sub_total
          }
        })

    },
    async handleFinally(){
      if (this.sale_products.length > 0){
        try {
          switch(Number(this.fact_type)){
            case 0:
              await this.storeInvoice({
                id: this.noFact,
                office_id: this.office_id,
                customer_id: this.customer.id,
                user_id: this.profile.id,
                details: this.sale_products
              })
              break;
            case 1:
              await this.storeFiscalCredit({
                id: this.noFact,
                office_id: this.office_id,
                customer_id: this.customer.id,
                user_id: this.profile.id,
                details: this.sale_products
              })
              break;
            case 2:
              await this.storeQuote({
                office_id: this.office_id,
                customer_id: this.customer.id,
                user_id: this.profile.id,
                details: this.sale_products
              })
              break;
          }
          this.$buefy.toast.open({
              message: 'Gracias por su compra',
              type: 'is-success'
          })
          await this.fetchProducts()
          await this.fetchOffices()
          await this.fetchCustomers()
          this.handleBack()
        } catch (error) {
          this.$buefy.toast.open({
              message: 'Algo salio mal, intentelo nuevamente',
              type: 'is-danger'
          })
        }
      } else {
        this.$buefy.toast.open({
            message: 'No hay productos',
            type: 'is-warning'
        })
      }
    }    
  }
}
</script>
