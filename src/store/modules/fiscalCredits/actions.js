import axios from '@/services/HttpService'
import * as types from '@/store/types'

const api = '/fiscalCredits'

export default {
  async fetch({ commit }) {
    try {
      let {data} = await axios.fetch(`${api}`)
      commit(types.FETCH_FISCALCREDITS, data)
    } catch (e) {
      commit(types.FETCH_FISCALCREDITS_ERR)
      throw e
    }
  },

  async index({ commit },credentials) {
    try {
      let {data} = await axios.fetch(`${api}/${credentials.id}`)
      commit(types.FETCH_FISCALCREDIT, data)
    } catch (e) {
      commit(types.FETCH_FISCALCREDIT_ERR)
      throw e
    }
  },

  async store({ commit }, credentials) {
    try {
      let {data} = await axios.store(`${api}`,credentials)
      commit(types.STORE_FISCALCREDITS, data)
      return data
    } catch (e) {
      throw e
    }
  },

  async update({ commit }, credentials) {
    try {
      await axios.update(`${api}/${credentials.id}`,credentials)
      commit(types.UPDATE_FISCALCREDITS, credentials)
    } catch (e) {
      throw e
    }
  },

  async destroy({ commit }, credentials) {
    try {
      await axios.delete(`${api}/${credentials.id}`)
      commit(types.DESTROY_FISCALCREDITS, credentials)
    } catch (e) {
      throw e
    }
  }
}