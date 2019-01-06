import { profile } from '@/components/common/api'
import { PROFILE_READ } from '../actions.type'
import { SET_PROFILE } from '../mutations.type'

const state = {
  error: {},
  profile: {}
}

const getters = {
  profile (state) {
    return state.profile
  }
}

const actions = {
  async [PROFILE_READ] ({ commit }) {
    try {
      const results = await profile.get()
      commit(SET_PROFILE, results.data[0])
    } catch (err) {
      console.log(err)
    }
  }
}

const mutations = {
  [SET_PROFILE] (state, profile) {
    state.profile = profile
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
