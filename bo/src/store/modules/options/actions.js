import api from '@/services/api'

export const save = async (
  { commit },
  { id, label, description, services, icon }
) => {
  commit('saveLoading')
  try {
    const response = await api.post('/options' + (id ? '/' + id : ''), {
      label,
      description,
      services,
      icon
    })
    commit('saveSuccess', response.data.data)
  } catch (e) {
    commit('saveError', e.response.data)
  }
}

export const fetchOptions = async (
  { commit },
  { page, order, orderProp, filters, perPage, active }
) => {
  commit('fetchLoading')
  try {
    const response = await api.get('/options', {
      params: {
        page,
        order,
        orderProp,
        ...filters,
        perPage,
        active
      }
    })
    commit('fetchSuccess', response.data)
  } catch (e) {
    commit('fetchError', e.response.data)
  }
}

export const getOption = async ({ commit }, { id }) => {
  commit('getOptionLoading')
  try {
    const response = await api.get('/options/' + id)
    commit('getOptionSuccess', response.data.data)
  } catch (e) {
    commit('getOptionError', e.response.data)
  }
}

export const clearOption = async ({ commit }) => {
  commit('clearOption')
}

export const disable = async ({ commit }, id, type = 'disable') => {
  commit('disableLoading')
  try {
    const response = await api.post('/options/' + id, { type })
    commit('disableSuccess', response.data.data)
  } catch (e) {
    commit('disableError', e.response.data)
  }
}

export const destroy = async ({ commit }, id) => {
  commit('deleteLoading')
  try {
    await api.delete('/options/' + id)
    commit('deleteSuccess')
  } catch (e) {
    commit('deleteError', e.message)
  }
}

export default {
  save,
  fetchOptions,
  destroy,
  disable,
  getOption,
  clearOption
}
