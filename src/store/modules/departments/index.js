import mutations from './mutations'
import actions from './actions'
import getters from './getters'

const state = {
  departments: [],
  department: {}
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}