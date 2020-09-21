export default {
  searchLoading(state) {
    state.searchLoading = true
    state.searchError = null
  },
  searchSuccess(state, airports) {
    state.list = airports
    state.searchLoading = false
    state.searchError = null
  },
  searchError(state, error) {
    state.searchLoading = false
    state.searchError = error
  }
}
