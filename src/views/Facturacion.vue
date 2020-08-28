<template>
  <div>
    <h2 class="title is-2">Facturación</h2>
    <form @submit.prevent="customer.id ? handleUpdate() : handleCreate()">
      <div class="columns">
        <!-- Buscador -->
        <div class="column">
          <b-field label="Find a name">
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
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
const today = new Date()
export default {
  data: () =>({
    customer: {},
    search: '',
  }),
  computed: {
    ...mapState('customers',['customers']),

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
    }
  },
  async created(){
    await this.fetchCustomers()
  },
  methods: {
    ...mapActions('customers',{
      fetchCustomers: 'fetch',
      createCustomer: 'store',
      updateCustomer: 'update'
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
    handleContinue(){
      alert("continue")
    }
  }
}
</script>
