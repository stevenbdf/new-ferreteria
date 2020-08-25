
import Vue from 'vue'
import Vuex from "vuex";
// Modulos
import authModule from "./modules/auth";

const debug = process.env.NODE_ENV !== 'production'

Vue.use(Vuex)

const createStore = new Vuex.Store({
  modules: {
    auth: authModule,
  },
  strict: debug,
});

export default createStore;