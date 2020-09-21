import api from '@/services/api'

export const search = async ({ commit }, { search }) => {
  commit('searchLoading')
  try {
    const response = await api.get('/airports', {
      params: {
        search
      }
    })
    commit('searchSuccess', response.data.data)
  } catch (e) {
    commit('searchError', e.response.data)
  }
}

export default {
  search
}
