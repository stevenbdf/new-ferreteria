
import Cookies from 'js-cookie'

const TOKEN_KEY = "token"

export default {
  getToken(){
    return Cookies.get(TOKEN_KEY)
  },
  setToken(token) {
    Cookies.set(TOKEN_KEY,token, { expires: null })
  },
  removeToken(){
    Cookies.remove(TOKEN_KEY)
  }
}