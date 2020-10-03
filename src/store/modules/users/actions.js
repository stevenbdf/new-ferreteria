import axios from '@/services/HttpService'
import * as types from '@/store/types'

const api = '/users'

export default {
  async fetch({ commit }) {
    try {
      let {data} = await axios.fetch(`${api}`)
      commit(types.FETCH_USERS, data)
    } catch (e) {
      commit(types.FETCH_USERS_ERR)
      throw e
    }
  },

  async index({ commit },credentials) {
    try {
      let {data} = await axios.fetch(`${api}/${credentials.id}`)
      commit(types.FETCH_USER, data)
      return data
    } catch (e) {
      commit(types.FETCH_USER_ERR)
      throw e
    }
  },

  async store({ commit }, credentials) {
    try {
      let {data} = await axios.store(`${api}`,credentials)
      commit(types.STORE_USERS, data)
      return data
    } catch (e) {
      throw e
    }
  },

  async update({ commit }, credentials) {
    try {
      await axios.update(`${api}/${credentials.id}`,credentials)
      commit(types.UPDATE_USERS, credentials)
    } catch (e) {
      throw e
    }
  },

  async destroy({ commit }, credentials) {
    try {
      await axios.delete(`${api}/${credentials.id}`)
      commit(types.DESTROY_USERS, credentials)
    } catch (e) {
      throw e
    }
  }
}