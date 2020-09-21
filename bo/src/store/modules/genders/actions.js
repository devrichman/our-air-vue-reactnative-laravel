import api from '@/services/api'

export const getAll = async ({ commit }) => {
  commit('getAllLoading')
  try {
    const response = await api.get('/genders')
    commit('getAllSuccess', response.data.data)
  } catch (e) {
    commit('getAllError', e.response.data)
  }
}

export default {
  getAll
}
