import Vue from 'vue'
import * as types from '@/store/types'

export default {
  [types.FETCH_OFFICES](state,data){
    state.offices = data
  },

  [types.FETCH_OFFICES_ERR](state){
    state.offices = []
  },

  [types.FETCH_OFFICE](state,data){
    state.office = data
  },

  [types.FETCH_OFFICE_ERR](state){
    state.office = []
  },

  [types.STORE_OFFICES](state,data){
    state.offices.push(data)
  },

  [types.UPDATE_OFFICES](state, data) {
    const current = state.offices.find((x) => x.id === data.id);
    const index = state.offices.indexOf(current);
    Vue.set(state.offices, index, data);
  },

  [types.DESTROY_OFFICES](state, data) {
    const current = state.offices.find((x) => x.id === data.id);
    const index = state.offices.indexOf(current);
    state.offices.splice(index, 1);
  },
}