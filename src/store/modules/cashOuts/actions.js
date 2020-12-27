import axios from '@/services/HttpService'
import * as types from '@/store/types'

const api = '/cashOut'

export default {
  async fetch({ commit }) {
    try {
      let {data} = await axios.fetch(`${api}`)
      commit(types.FETCH_CASHOUTS, data)
    } catch (e) {
      commit(types.FETCH_CASHOUTS_ERR)
      throw e
    }
  },

  async store({ commit }) {
    try {
      let {data} = await axios.store(`${api}`)
      commit(types.STORE_CASHOUTS, data)
      return data
    } catch (e) {
      throw e
    }
  },

  async fetchCurrent({ commit }) {
    try {
      let {data} = await axios.fetch(`${api}/current`)
      commit(types.FETCH_CURRENT_AMOUNT, data.total_sales)
    } catch (e) {
      console.error(e);
    }
  },
}