import axios from '@/services/HttpService'
import * as types from '@/store/types'

const api = '/suppliers'

export default {
  async fetch({ commit }) {
    try {
      let {data} = await axios.fetch(`${api}`)
      commit(types.FETCH_SUPPLIERS, data)
    } catch (e) {
      commit(types.FETCH_SUPPLIERS_ERR)
      throw e
    }
  },

  async index({ commit },credentials) {
    try {
      let {data} = await axios.fetch(`${api}/${credentials.id}`)
      commit(types.FETCH_SUPPLIER, data)
    } catch (e) {
      commit(types.FETCH_SUPPLIER_ERR)
      throw e
    }
  },

  async store({ commit }, credentials) {
    try {
      let {data} = await axios.store(`${api}`,credentials)
      commit(types.STORE_SUPPLIERS, data)
      return data
    } catch (e) {
      throw e
    }
  },

  async update({ commit }, credentials) {
    try {
      await axios.update(`${api}/${credentials.id}`,credentials)
      commit(types.UPDATE_SUPPLIERS, credentials)
    } catch (e) {
      throw e
    }
  },

  async destroy({ commit }, credentials) {
    try {
      await axios.delete(`${api}/${credentials.id}`)
      commit(types.DESTROY_SUPPLIERS, credentials)
    } catch (e) {
      throw e
    }
  }
}