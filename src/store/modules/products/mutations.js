import Vue from 'vue'
import * as types from '@/store/types'

export default {
  [types.FETCH_PRODUCTS](state,data){
    state.products = data
  },

  [types.FETCH_PRODUCTS_ERR](state){
    state.products = []
  },

  [types.FETCH_PRODUCT](state,data){
    state.product = data
  },

  [types.FETCH_PRODUCT_ERR](state){
    state.PRODUCT = []
  },

  [types.STORE_PRODUCTS](state,data){
    state.products.push(data)
  },

  [types.UPDATE_PRODUCTS](state, data) {
    const current = state.products.find((x) => x.id === data.id);
    const index = state.products.indexOf(current);
    Vue.set(state.products, index, data);
  },

  [types.DESTROY_PRODUCTS](state, data) {
    const current = state.products.find((x) => x.id === data.id);
    const index = state.products.indexOf(current);
    state.products.splice(index, 1);
  },
}