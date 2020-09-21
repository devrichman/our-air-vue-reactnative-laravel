export default {
  getAllSuccess(state, genders) {
    state.list = genders
    state.getAllLoading = false
    state.getAllError = null
  },
  getAllError(state, error) {
    state.list = {}
    state.getAllLoading = false
    state.getAllError = error
  },
  getAllLoading(state) {
    state.list = {}
    state.getAllLoading = true
    state.getAllError = null
  }
}
