import axios from '@/services/HttpService'
import * as types from '@/store/types'

export default {
  async fetch({ commit }) {
    try {
      let {data} = await axios.fetch(`/customers`)
      commit(types.FETCH_CUSTOMERS, data)
    } catch (e) {
      commit(types.FETCH_CUSTOMERS_ERR)
      throw e
    }
  },

  async index({ commit },credentials) {
    try {
      let {data} = await axios.fetch(`/customers/${credentials.id}`)
      commit(types.FETCH_CUSTOMER, data)
    } catch (e) {
      commit(types.FETCH_CUSTOMER_ERR)
      throw e
    }
  },

  async store({ commit }, credentials) {
    try {
      let {data} = await axios.store(`/customers`,credentials)
      commit(types.STORE_CUSTOMERS, data)
      return data
    } catch (e) {
      throw e
    }
  },

  async update({ commit }, credentials) {
    try {
      await axios.update(`/customers/${credentials.id}`,credentials)
      commit(types.UPDATE_CUSTOMERS, credentials)
    } catch (e) {
      throw e
    }
  },

  async destroy({ commit }, credentials) {
    try {
      await axios.delete(`/customers/${credentials.id}`)
      commit(types.DESTROY_CUSTOMERS, credentials)
    } catch (e) {
      throw e
    }
  }
}