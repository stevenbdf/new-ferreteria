import axios from '@/services/HttpService'
import * as types from '@/store/types'

export default {
  async fetch({ commit }) {
    try {
      let {data} = await axios.fetch(`/products`)
      commit(types.FETCH_PRODUCTS, data)
    } catch (e) {
      commit(types.FETCH_PRODUCTS_ERR)
      throw e
    }
  },

  async index({ commit },credentials) {
    try {
      let {data} = await axios.fetch(`/products/${credentials.id}`)
      commit(types.FETCH_PRODUCT, data)
    } catch (e) {
      commit(types.FETCH_PRODUCT_ERR)
      throw e
    }
  },

  async store({ commit }, credentials) {
    try {
      let {data} = await axios.store(`/products`,credentials)
      commit(types.STORE_PRODUCTS, data)
      return data
    } catch (e) {
      throw e
    }
  },

  async update({ commit }, credentials) {
    try {
      await axios.update(`/products/${credentials.id}`,credentials)
      commit(types.UPDATE_PRODUCTS, credentials)
    } catch (e) {
      throw e
    }
  },

  async destroy({ commit }, credentials) {
    try {
      await axios.delete(`/products/${credentials.id}`)
      commit(types.DESTROY_PRODUCTS, credentials)
    } catch (e) {
      throw e
    }
  }
}