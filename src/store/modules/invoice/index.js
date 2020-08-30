import mutations from './mutations'
import actions from './actions'
import getters from './getters'

const state = {
  invoices: [],
  invoice: {}
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}