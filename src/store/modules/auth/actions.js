import axios from '@/services/HttpService'
import token from '@/services/TokenService'

const api = ''

export default {
  async login({ commit }, credentials) {
    try {
      let { data, status } = await axios.store(`${api}/login`, credentials)
      token.setToken(data)
      if (credentials.rememberMe) {
        token.setRememberMe(JSON.stringify({ rememberMe: true, username: credentials.username }));
      } else {
        token.setRememberMe(JSON.stringify({ rememberMe: false, username: null }));
      }
      return status
    } catch (e) {
      throw e
    }
  },
  logout({ commit }) {
    token.removeToken();
  }
}