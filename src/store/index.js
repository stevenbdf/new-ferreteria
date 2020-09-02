
import Vue from 'vue'
import Vuex from "vuex";
// Modulos
import authModule from "./modules/auth";
import customersModule from "./modules/customers"
import productsModule from "./modules/products"
import officesModule from "./modules/offices"
import fiscalCreditsModule from "./modules/fiscalCredits"
import invoicesModule from "./modules/invoice"
import quotesModule from "./modules/quotes"
import suppliersModule from './modules/suppliers'

const debug = process.env.NODE_ENV !== 'production'

Vue.use(Vuex)

const createStore = new Vuex.Store({
  modules: {
    auth: authModule,
    customers: customersModule,
    products: productsModule,
    offices: officesModule,
    fiscalCredits: fiscalCreditsModule,
    invoices: invoicesModule,
    quotes: quotesModule,
    suppliers: suppliersModule
  },
  strict: debug,
});

export default createStore;