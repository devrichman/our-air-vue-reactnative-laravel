export default {
  fetchLoading(state) {
    state.fetchLoading = true
    state.fetchError = null
  },
  fetchSuccess(state, list) {
    state.fetchLoading = false
    state.listServices = list
    state.fetchError = null
  },
  fetchError(state, error) {
    state.fetchLoading = false
    state.fetchError = error
  }
}
