export default {
  listCategoryLoading(state) {
    state.listCategoryLoading = true
    state.listCategoryError = null
  },
  listCategorySuccess(state, categorylist) {
    state.categorylist = categorylist
    state.listCategoryLoading = false
    state.listCategoryError = null
  },
  listCategoryError(state, error) {
    state.listCategoryLoading = false
    state.listCategoryError = error
  },
  deleteCategoryLoading(state) {
    state.deleteCategoryLoading = true
    state.deleteCategoryError = null
  },
  deleteCategorySuccess(state, id) {
    state.deleteCategoryLoading = false
    state.categorylist.splice(
      state.categorylist.findIndex(categoryitem => categoryitem.id === id),
      1
    )
    state.deleteCategoryError = null
  },
  deleteCategoryError(state, error) {
    state.deleteCategoryLoading = false
    state.deleteCategoryError = error
  },

  saveCategoryLoading(state) {
    state.saveCategoryLoading = true
    state.saveCategoryError = null
  },
  saveCategorySuccess(state, category) {
    state.saveCategoryLoading = false
    state.categorylist.data = [...state.categorylist.data, category]
    state.createCategoryError = null
    state.categoryitem = {}
  },
  saveCategoryError(state, error) {
    state.saveCategoryLoading = false
    state.saveCategoryError = error
  },

  getCategoryLoading(state) {
    state.getCategoryLoading = true
    state.getCategoryError = null
  },
  getCategorySuccess(state, categoryitem) {
    state.getCategoryLoading = false
    state.getCategoryError = null
    state.categoryitem = categoryitem
  },
  getCategoryError(state, error) {
    state.getCategoryLoading = false
    state.getCategoryError = error
  },
  clearCategory(state) {
    state.getCategoryLoading = false
    state.getCategoryError = null
    state.categoryitem = {}
    state.saveCategoryError = null
  }
}
