import Vue from 'vue'
import * as types from '@/store/types'

export default {
  [types.FETCH_SUPPLIERS](state,data){
    state.suppliers = data
  },

  [types.FETCH_SUPPLIERS_ERR](state){
    state.suppliers = []
  },

  [types.FETCH_SUPPLIER](state,data){
    state.supplier = data
  },

  [types.FETCH_SUPPLIER_ERR](state){
    state.supplier = []
  },

  [types.STORE_SUPPLIERS](state,data){
    state.suppliers.push(data)
  },

  [types.UPDATE_SUPPLIERS](state, data) {
    const current = state.suppliers.find((x) => x.id === data.id);
    const index = state.suppliers.indexOf(current);
    Vue.set(state.suppliers, index, data);
  },

  [types.DESTROY_SUPPLIERS](state, data) {
    const current = state.suppliers.find((x) => x.id === data.id);
    const index = state.suppliers.indexOf(current);
    state.suppliers.splice(index, 1);
  },
}