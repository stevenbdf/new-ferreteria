import mutations from './mutations'
import actions from './actions'
import getters from './getters'

const state = {
  suppliers: [],
  supplier: {}
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}