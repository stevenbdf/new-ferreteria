import Vue from 'vue'
import * as types from '@/store/types'

export default {
  [types.FETCH_USERS](state,data){
    state.users = data
  },

  [types.FETCH_USERS_ERR](state){
    state.users = []
  },

  [types.FETCH_USER](state,data){
    state.user = data
  },

  [types.FETCH_USER_ERR](state){
    state.user = []
  },

  [types.STORE_USERS](state,data){
    state.users.push(data)
  },

  [types.UPDATE_USERS](state, data) {
    const current = state.users.find((x) => x.id === data.id);
    const index = state.users.indexOf(current);
    Vue.set(state.users, index, data);
  },

  [types.DESTROY_USERS](state, data) {
    const current = state.users.find((x) => x.id === data.id);
    const index = state.users.indexOf(current);
    state.users.splice(index, 1);
  },
}