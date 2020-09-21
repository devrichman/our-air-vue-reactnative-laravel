export default {
  saveLoading(state) {
    state.saveLoading = true
    state.saveError = null
  },
  saveSuccess(state, option) {
    state.saveLoading = false
    state.list.data = [...state.list.data, option]
    state.createError = null
  },
  saveError(state, error) {
    state.saveLoading = false
    state.saveError = error
  },

  fetchLoading(state) {
    state.fetchLoading = true
    state.fetchError = null
  },
  fetchSuccess(state, list) {
    state.fetchLoading = false
    state.list = list
    state.fetchError = null
  },
  fetchError(state, error) {
    state.fetchLoading = false
    state.fetchError = error
  },

  getOptionLoading(state) {
    state.getOptionLoading = true
    state.getOptionError = null
  },
  getOptionSuccess(state, item) {
    state.getOptionLoading = false
    state.item = item
    state.getOptionError = null
  },
  getOptionError(state, error) {
    state.getOptionLoading = false
    state.getOptionError = error
  },
  clearOption(state) {
    state.getOptionLoading = false
    state.getOptionError = null
    state.item = {
      services: []
    }
    state.saveError = null
  },

  deleteLoading(state) {
    state.deleteLoading = true
    state.deleteError = null
  },
  deleteSuccess(state) {
    state.deleteLoading = false
    state.deleteError = null
  },
  deleteError(state, error) {
    state.deleteLoading = false
    state.deleteError = error
  },

  disableLoading(state) {
    state.disableLoading = true
    state.disableError = null
  },
  disableSuccess(state) {
    state.disableLoading = false
    state.disableError = null
  },
  disableError(state, error) {
    state.disableLoading = false
    state.disableError = error
  }
}
