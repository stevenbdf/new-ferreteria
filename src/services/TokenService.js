import axios from 'axios'
import Cookies from 'js-cookie'

const DATA_KEY = "data"
const TOKEN_KEY = "token"
const REMEMBER_ME = "remember"
const OFFICE_ID = "office_id"

export default {
  getToken() {
    return Cookies.get(TOKEN_KEY)
  },
  getData() {
    return Cookies.get(DATA_KEY)
  },
  getRememberMe() {
    return Cookies.get(REMEMBER_ME)
  },
  getOfficeId() {
    return Cookies.get(OFFICE_ID)
  },
  setToken(token) {
    Cookies.set(DATA_KEY, token, { expires: 365 })
    Cookies.set(TOKEN_KEY, token.token, { expires: 365 })
    axios.defaults.headers.common = { 'Authorization': `bearer ${token.token}` }
  },
  removeToken() {
    Cookies.remove(DATA_KEY)
    Cookies.remove(TOKEN_KEY)
  },
  setRememberMe(data) {
    Cookies.set(REMEMBER_ME, data, { expires: 365 })
  },
  removeRememberMe() {
    Cookies.remove(REMEMBER_ME)
  },
  setOfficeId(id) {
    Cookies.set(OFFICE_ID, id, { expires: 365 })
  }
}