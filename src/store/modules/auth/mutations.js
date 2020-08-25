import * as types from '@/store/types'

export default {
  [types.LOGIN_SUCCESS](state,data){
    state.token = data.token
    state.profile = data
  }
}