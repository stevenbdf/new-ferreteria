import mutations from './mutations'
import actions from './actions'
import getters from './getters'

const state = {
  offices: [],
  office: {},
  currentOfficeId: 0
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}