import Vue from 'vue'
import * as types from '@/store/types'

export default {
  [types.FETCH_TRANSACTIONS](state,data){
    state.transactions = data
  },

  [types.FETCH_TRANSACTIONS_ERR](state){
    state.transactions = []
  },

  [types.FETCH_TRANSACTION](state,data){
    state.transaction = data
  },

  [types.FETCH_TRANSACTION_ERR](state){
    state.transaction = []
  },

  [types.STORE_TRANSACTIONS](state,data){
    state.transactions.unshift(data)
  },

  [types.UPDATE_TRANSACTIONS](state, data) {
    const current = state.transactions.find((x) => x.id === data.id);
    const index = state.transactions.indexOf(current);
    Vue.set(state.transactions, index, data);
  },

  [types.DESTROY_TRANSACTIONS](state, data) {
    const current = state.transactions.find((x) => x.id === data.id);
    const index = state.transactions.indexOf(current);
    state.transactions.splice(index, 1);
  },
}