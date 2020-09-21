export default {
  listLoading(state) {
    state.listLoading = true
    state.listError = null
  },
  listSuccess(state, list) {
    state.list = list
    state.listLoading = false
    state.listError = null
  },
  listError(state, error) {
    state.listLoading = false
    state.listError = error
  },
  deleteLoading(state) {
    state.deleteLoading = true
    state.deleteError = null
  },
  deleteSuccess(state, id) {
    state.deleteLoading = false
    state.list.splice(state.list.findIndex(item => item.id === id), 1)
    state.deleteError = null
  },
  deleteError(state, error) {
    state.deleteLoading = false
    state.deleteError = error
  },

  saveLoading(state) {
    state.saveLoading = true
    state.saveError = null
  },
  saveSuccess(state, contractor) {
    state.saveLoading = false
    state.list.data = [...state.list.data, contractor]
    state.createError = null
  },
  saveError(state, error) {
    state.saveLoading = false
    state.saveError = error
  },

  getContractorLoading(state) {
    state.getContractorLoading = true
    state.getContractorError = null
  },
  getContractorSuccess(state, item) {
    state.getContractorLoading = false
    state.item = item
    state.getContractorError = null
  },
  getContractorError(state, error) {
    state.getContractorLoading = false
    state.getContractorError = error
  },
  clearContractor(state) {
    state.getContractorLoading = false
    state.getContractorError = null
    state.item = {}
    state.saveError = null
  }
}
