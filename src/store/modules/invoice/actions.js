import axios from '@/services/HttpService'
import * as types from '@/store/types'

const api = '/invoices'

export default {
  async fetch({ commit }) {
    try {
      let {data} = await axios.fetch(`${api}`)
      commit(types.FETCH_INVOICES, data)
    } catch (e) {
      commit(types.FETCH_INVOICES_ERR)
      throw e
    }
  },

  async index({ commit },credentials) {
    try {
      let {data} = await axios.fetch(`${api}/${credentials.id}`)
      commit(types.FETCH_INVOICE, data)
    } catch (e) {
      commit(types.FETCH_INVOICE_ERR)
      throw e
    }
  },

  async store({ commit }, credentials) {
    try {
      let {data} = await axios.store(`${api}`,credentials)
      commit(types.STORE_INVOICES, data)
      return data
    } catch (e) {
      throw e
    }
  },

  async update({ commit }, credentials) {
    try {
      await axios.update(`${api}/${credentials.id}`,credentials)
      commit(types.UPDATE_INVOICES, credentials)
    } catch (e) {
      throw e
    }
  },

  async destroy({ commit }, credentials) {
    try {
      await axios.delete(`${api}/${credentials.id}`)
      commit(types.DESTROY_INVOICES, credentials)
    } catch (e) {
      throw e
    }
  }
}