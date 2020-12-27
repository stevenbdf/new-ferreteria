import mutations from './mutations'
import actions from './actions'
import getters from './getters'

const state = {
  cashouts: [],
  currentAmount: 0.00,
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}