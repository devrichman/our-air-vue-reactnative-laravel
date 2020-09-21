export const setGlobalLoading = ({ commit }, loading) => {
  commit('setGlobalLoading', loading)
}

export const setBooting = ({ commit }, booting) => {
  commit('setBooting', booting)
}

export default {
  setGlobalLoading,
  setBooting
}
