import * as types from '@/store/types'

export default {
  [types.FETCH_CASHOUTS](state,data){
    state.cashouts = data
  },

  [types.FETCH_CASHOUTS_ERR](state){
    state.cashouts = []
  },

  [types.STORE_CASHOUTS](state,data){
    state.cashouts.unshift(data)
  },

  [types.FETCH_CURRENT_AMOUNT](state,data){
    state.cashouts.currentAmount = data
  }
}