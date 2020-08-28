import axios from '@/services/HttpService'
import token from '@/services/TokenService'
import * as types from '@/store/types'

export default {
  async login({ commit }, credentials) {
    try {
      let { data, status } = await axios.store('/login', credentials)
      token.setToken(data)
      return status
    } catch (e) {
      throw e
    }
  }
}