import api from '@/services/api'
import { Message } from 'element-ui'

export const get = async ({ commit }) => {
  commit('getLoading')
  try {
    const response = await api.get('/settings')
    commit('getSuccess', response.data.data)
  } catch (e) {
    commit('getError', e.response.data)
  }
}

export const save = async ({ commit }, { email, phone, general_terms }) => {
  commit('saveLoading')
  try {
    const response = await api.post('/settings', {
      email: email,
      phone: phone,
      general_terms: general_terms
    })
    commit('saveSuccess', response.data.data)

    Message.success('Paramètres enregistrés')
  } catch (e) {
    commit('saveError', e.response.data)
  }
}

export default {
  get,
  save
}
