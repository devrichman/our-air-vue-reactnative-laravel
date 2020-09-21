export default {
  saveSuccess(state, settings) {
    state.settings = settings
    state.saveLoading = false
    state.saveError = null
  },
  saveError(state, error) {
    state.settings = {}
    state.saveLoading = false
    state.saveError = error
  },
  saveLoading(state) {
    state.settings = {}
    state.saveError = null
    state.saveLoading = true
  },
  getSuccess(state, settings) {
    state.settings = settings
    state.getLoading = false
    state.getError = null
  },
  getError(state, error) {
    state.settings = {}
    state.getLoading = false
    state.getError = error
  },
  getLoading(state) {
    state.settings = {}
    state.getError = null
    state.getLoading = true
  }
}
