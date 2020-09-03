import Vue from 'vue'
import * as types from '@/store/types'

export default {
  [types.FETCH_DEPARTMENTS](state,data){
    state.departments = data
  },

  [types.FETCH_DEPARTMENTS_ERR](state){
    state.departments = []
  },

  [types.FETCH_DEPARTMENT](state,data){
    state.department = data
  },

  [types.FETCH_DEPARTMENT_ERR](state){
    state.department = []
  },

  [types.STORE_DEPARTMENTS](state,data){
    state.departments.push(data)
  },

  [types.UPDATE_DEPARTMENTS](state, data) {
    const current = state.departments.find((x) => x.id === data.id);
    const index = state.departments.indexOf(current);
    Vue.set(state.departments, index, data);
  },

  [types.DESTROY_DEPARTMENTS](state, data) {
    const current = state.departments.find((x) => x.id === data.id);
    const index = state.departments.indexOf(current);
    state.departments.splice(index, 1);
  },
}