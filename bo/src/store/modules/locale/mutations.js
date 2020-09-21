export default {
  saveLinesSuccess(state, lines) {
    state.lines = lines
    state.saveLinesLoading = false
    state.saveLinesError = null
  },
  saveLinesError(state, error) {
    state.saveLinesLoading = false
    state.saveLinesError = error
  },
  saveLinesLoading(state) {
    state.saveLinesLoading = true
    state.saveLinesError = null
  },
  getLinesSuccess(state, lines) {
    state.lines = lines
    state.getLinesLoading = false
    state.getLinesError = null
  },
  getLinesError(state, error) {
    state.lines = {}
    state.getLinesLoading = false
    state.getLinesError = error
  },
  getLinesLoading(state) {
    state.lines = {}
    state.getLinesLoading = true
    state.getLinesError = null
  },
  getAllSuccess(state, settings) {
    state.list = settings
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
