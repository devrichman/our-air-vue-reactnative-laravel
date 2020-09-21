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
  saveSuccess(state, user) {
    state.saveLoading = false
    state.list.data = [...state.list.data, user]
    state.createError = null
  },
  saveError(state, error) {
    state.saveLoading = false
    state.saveError = error
  },

  getUserLoading(state) {
    state.getUserLoading = true
    state.getUserError = null
  },
  getUserSuccess(state, item) {
    state.getUserLoading = false
    state.item = item
    state.getUserError = null
  },
  getUserError(state, error) {
    state.getUserLoading = false
    state.getUserError = error
  },
  clearUser(state) {
    state.getUserLoading = false
    state.getUserError = null
    state.item = {
      services: []
    }
    state.saveError = null
  }
}
