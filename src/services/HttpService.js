import axios from 'axios'
import token from '@/services/TokenService'

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL
axios.defaults.headers.common = {'Authorization': `bearer ${token.getToken()}`}

export default {
  fetch(url){
    return axios.get(url) 
  },
  store(url, data){
    return axios.post(url,data) 
  },
  update(url,data){
    return axios.put(url,data) 
  },
  delete(url,data){
    return axios.delete(url,data) 
  }
}