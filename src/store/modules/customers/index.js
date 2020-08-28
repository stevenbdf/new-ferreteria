import mutations from './mutations'
import actions from './actions'
import getters from './getters'

const state = {
  customers: [],
  customer: {}
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}