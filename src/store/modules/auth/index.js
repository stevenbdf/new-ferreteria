import mutations from './mutations'
import actions from './actions'
import getters from './getters'

const state = {
  token: null,
  profile: {}
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}