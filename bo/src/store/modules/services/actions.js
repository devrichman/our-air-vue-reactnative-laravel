import api from '@/services/api'

export const fetchServices = async ({ commit }) => {
  commit('fetchLoading')
  try {
    const response = await api.get('/services')
    commit('fetchSuccess', response.data.data)
  } catch (e) {
    commit('fetchError', e.response.data)
  }
}

export default {
  fetchServices
}
