import api from '@/services/api'

export const getAircraftList = async (
  { commit },
  { page, order, orderProp, filters, perPage }
) => {
  commit('listAircraftLoading')
  try {
    const response = await api.get('/aircrafts', {
      params: {
        page,
        order,
        orderProp,
        filters,
        perPage
      }
    })
    commit('listAircraftSuccess', response.data)
  } catch (e) {
    commit('listAircraftError', e.response.data)
  }
}

export const destroy = async ({ commit }, id) => {
  commit('deleteAircraftLoading')
  try {
    await api.delete('/aircrafts/' + id)
    commit('deleteAircraftSuccess', id)
  } catch (e) {
    commit('deleteAircraftError', e.message)
  }
}

export const getAircraft = async ({ commit }, { id }) => {
  commit('getAircraftLoading')
  try {
    const response = await api.get('/aircrafts/' + id)
    commit('getAircraftSuccess', response.data.data)
  } catch (e) {
    commit('getAircraftError', e.response.data)
  }
}

export const clearAircraft = async ({ commit }) => {
  commit('clearAircraft')
}

export const save = async ({ commit }, { id, formdata }) => {
  commit('saveAircraftLoading')
  try {
    const response = await api.post(
      '/aircrafts' + (id ? '/' + id : ''),
      formdata,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    )
    commit('saveAircraftSuccess', response.data.data)
  } catch (e) {
    commit('saveAircraftError', e.response.data)
  }
}

export default {
  getAircraftList,
  destroy,
  getAircraft,
  clearAircraft,
  save
}
