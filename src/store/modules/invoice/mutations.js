import Vue from 'vue'
import * as types from '@/store/types'

export default {
  [types.FETCH_INVOICES](state,data){
    state.invoices = data
  },

  [types.FETCH_INVOICES_ERR](state){
    state.invoices = []
  },

  [types.FETCH_INVOICE](state,data){
    state.invoice = data
  },

  [types.FETCH_INVOICE_ERR](state){
    state.invoice = []
  },

  [types.STORE_INVOICES](state,data){
    state.invoices.push(data)
  },

  [types.UPDATE_INVOICES](state, data) {
    const current = state.invoices.find((x) => x.id === data.id);
    const index = state.invoices.indexOf(current);
    Vue.set(state.invoices, index, data);
  },

  [types.DESTROY_INVOICES](state, data) {
    const current = state.invoices.find((x) => x.id === data.id);
    const index = state.invoices.indexOf(current);
    state.invoices.splice(index, 1);
  },
}