import Vue from 'vue'
import * as types from '@/store/types'

export default {
  [types.FETCH_FISCALCREDITS](state,data){
    state.fiscalCredits = data
  },

  [types.FETCH_FISCALCREDITS_ERR](state){
    state.fiscalCredits = []
  },

  [types.FETCH_FISCALCREDIT](state,data){
    state.fiscalCredit = data
  },

  [types.FETCH_FISCALCREDIT_ERR](state){
    state.fiscalCredit = []
  },

  [types.STORE_FISCALCREDITS](state,data){
    state.fiscalCredits.push(data)
  },

  [types.UPDATE_FISCALCREDITS](state, data) {
    const current = state.fiscalCredits.find((x) => x.id === data.id);
    const index = state.fiscalCredits.indexOf(current);
    Vue.set(state.fiscalCredits, index, data);
  },

  [types.DESTROY_FISCALCREDITS](state, data) {
    const current = state.fiscalCredits.find((x) => x.id === data.id);
    const index = state.fiscalCredits.indexOf(current);
    state.fiscalCredits.splice(index, 1);
  },
}