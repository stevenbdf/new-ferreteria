import axios from 'axios'
import token from '@/services/TokenService'
import * as types from '@/store/types'

export default {
  async login({ commit }, credentials) {
    try {
      let { data, status } = await axios.post('/login', credentials)
      commit(types.LOGIN_SUCCESS,data)
      token.setToken(data.token)
      return status
    } catch (e) {
      throw e
    }
  }
}