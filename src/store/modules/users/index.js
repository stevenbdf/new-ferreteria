import mutations from './mutations'
import actions from './actions'
import getters from './getters'

const state = {
  users: [],
  user: {}
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}