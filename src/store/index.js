
import Vue from 'vue'
import Vuex from "vuex";
// Modulos
import authModule from "./modules/auth";
import customersModule from "./modules/customers"

const debug = process.env.NODE_ENV !== 'production'

Vue.use(Vuex)

const createStore = new Vuex.Store({
  modules: {
    auth: authModule,
    customers: customersModule
  },
  strict: debug,
});

export default createStore;