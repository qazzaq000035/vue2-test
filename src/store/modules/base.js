// state
export const state = () => ({
  store: null,
})

// getters
export const getters = {
  getStore: state => state.store,
}

// mutations
export const mutations = {
  setStore (state,  v) {
    state.store = v
  },
}

export const actions = {}

export default {
    state,
    getters,
    actions,
    mutations
};