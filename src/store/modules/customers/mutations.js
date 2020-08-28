import Vue from 'vue'
import * as types from '@/store/types'

export default {
  [types.FETCH_CUSTOMERS](state,data){
    state.customers = data
  },

  [types.FETCH_CUSTOMERS_ERR](state){
    state.customers = []
  },

  [types.FETCH_CUSTOMER](state,data){
    state.customer = data
  },

  [types.FETCH_CUSTOMER_ERR](state){
    state.customer = []
  },

  [types.STORE_CUSTOMERS](state,data){
    state.customers.push(data)
  },

  [types.UPDATE_CUSTOMERS](state, data) {
    const current = state.customers.find((x) => x.id === data.id);
    const index = state.customers.indexOf(current);
    Vue.set(state.customers, index, data);
  },

  [types.DESTROY_CUSTOMERS](state, data) {
    const current = state.customers.find((x) => x.id === data.id);
    const index = state.customers.indexOf(current);
    state.customers.splice(index, 1);
  },
}