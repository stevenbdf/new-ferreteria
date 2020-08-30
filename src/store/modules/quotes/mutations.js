import Vue from 'vue'
import * as types from '@/store/types'

export default {
  [types.FETCH_QUOTES](state,data){
    state.quotes = data
  },

  [types.FETCH_QUOTES_ERR](state){
    state.quotes = []
  },

  [types.FETCH_QUOTE](state,data){
    state.quote = data
  },

  [types.FETCH_QUOTE_ERR](state){
    state.quote = []
  },

  [types.STORE_QUOTES](state,data){
    state.quotes.push(data)
  },

  [types.UPDATE_QUOTES](state, data) {
    const current = state.quotes.find((x) => x.id === data.id);
    const index = state.quotes.indexOf(current);
    Vue.set(state.quotes, index, data);
  },

  [types.DESTROY_QUOTES](state, data) {
    const current = state.quotes.find((x) => x.id === data.id);
    const index = state.quotes.indexOf(current);
    state.quotes.splice(index, 1);
  },
}