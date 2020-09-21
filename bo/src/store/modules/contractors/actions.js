import api from '@/services/api'

export const getList = async (
  { commit },
  { page, order, orderProp, filters, perPage }
) => {
  commit('listLoading')
  try {
    const response = await api.get('/contractors', {
      params: {
        page,
        order,
        orderProp,
        filters,
        perPage
      }
    })
    commit('listSuccess', response.data)
  } catch (e) {
    commit('listError', e.response.data)
  }
}

export const destroy = async ({ commit }, id) => {
  commit('deleteLoading')
  try {
    await api.delete('/contractors/' + id)
    commit('deleteSuccess', id)
  } catch (e) {
    commit('deleteError', e.message)
  }
}

export const getContractor = async ({ commit }, { id }) => {
  commit('getContractorLoading')
  try {
    const response = await api.get('/contractors/' + id)
    commit('getContractorSuccess', response.data.data)
  } catch (e) {
    commit('getContractorError', e.response.data)
  }
}

export const clearContractor = async ({ commit }) => {
  commit('clearContractor')
}

export const save = async ({ commit }, { id, name, description }) => {
  commit('saveLoading')
  try {
    const response = await api.post('/contractors' + (id ? '/' + id : ''), {
      name,
      description
    })
    commit('saveSuccess', response.data.data)
  } catch (e) {
    commit('saveError', e.response.data)
  }
}

export default {
  getList,
  destroy,
  getContractor,
  clearContractor,
  save
}
