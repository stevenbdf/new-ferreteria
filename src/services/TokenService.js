import axios from 'axios'
import Cookies from 'js-cookie'

const DATA_KEY = "data"
const TOKEN_KEY = "token"

export default {
  getToken(){
    return Cookies.get(TOKEN_KEY)
  },
  getData(){
    return Cookies.get(DATA_KEY)
  },
  setToken(token) {
    Cookies.set(DATA_KEY,token, { expires: null })
    Cookies.set(TOKEN_KEY,token.token, { expires: null })
    axios.defaults.headers.common = {'Authorization': `bearer ${token.token}`}
  },
  removeToken(){
    Cookies.remove(DATA_KEY)
    Cookies.remove(TOKEN_KEY)
  }
}