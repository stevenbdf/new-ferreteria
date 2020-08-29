import axios from '@/services/HttpService'
import token from '@/services/TokenService'

const api = ''

export default {
  async login({ commit }, credentials) {
    try {
      let { data, status } = await axios.store(`${api}/login`, credentials)
      token.setToken(data)
      return status
    } catch (e) {
      throw e
    }
  }
}