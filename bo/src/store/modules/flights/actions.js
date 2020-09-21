import api from '@/services/api'

export const getCategoryList = async (
  { commit },
  { page, order, orderProp, filters, perPage }
) => {
  commit('listCategoryLoading')
  try {
    const response = await api.get('/flights/categories', {
      params: {
        page,
        order,
        orderProp,
        filters,
        perPage
      }
    })
    commit('listCategorySuccess', response.data)
  } catch (e) {
    commit('listCategoryError', e.response.data)
  }
}

export const destroy = async ({ commit }, id) => {
  commit('deleteCategoryLoading')
  try {
    await api.delete('/flights/categories/' + id)
    commit('deleteCategorySuccess', id)
  } catch (e) {
    commit('deleteCategoryError', e.message)
  }
}

export const getCategory = async ({ commit }, { id }) => {
  commit('getCategoryLoading')
  try {
    const response = await api.get('/flights/categories/' + id)
    commit('getCategorySuccess', response.data.data)
  } catch (e) {
    commit('getCategoryError', e.response.data)
  }
}

export const clearCategory = async ({ commit }) => {
  commit('clearCategory')
}

export const save = async ({ commit }, { id, formdata }) => {
  commit('saveCategoryLoading')
  try {
    const response = await api.post(
      '/flights/categories' + (id ? '/' + id : ''),
      formdata,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    )
    commit('saveCategorySuccess', response.data.data)
  } catch (e) {
    commit('saveCategoryError', e.response.data)
  }
}

export default {
  getCategoryList,
  destroy,
  getCategory,
  clearCategory,
  save
}
