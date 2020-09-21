import api from '@/services/api'
import { Message } from 'element-ui'

export const getAll = async ({ commit }) => {
  commit('getAllLoading')
  try {
    const response = await api.get('/locales')
    commit('getAllSuccess', response.data.data)
  } catch (e) {
    commit('getAllError', e.response.data)
  }
}

export const saveLines = async ({ commit }, { lines }) => {
  commit('saveLinesLoading')
  try {
    const response = await api.post('/locales/lines', { lines })
    commit('saveLinesSuccess', response.data.data)

    Message.success('Traductions enregistrées')
  } catch (e) {
    commit('saveLinesError', e.response.data)
  }
}

export const getLines = async ({ commit }) => {
  commit('getLinesLoading')
  try {
    const response = await api.get('/locales/lines', {})
    commit('getLinesSuccess', response.data.data)
  } catch (e) {
    commit('getLinesError', e.response.data)
  }
}

export default {
  getAll,
  saveLines,
  getLines
}
