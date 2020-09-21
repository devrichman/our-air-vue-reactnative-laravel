import api from '@/services/api'

export const getList = async (
  { commit },
  { page, order, orderProp, filters, perPage }
) => {
  commit('listLoading')
  try {
    const response = await api.get('/users', {
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
    await api.delete('/users/' + id)
    commit('deleteSuccess', id)
  } catch (e) {
    commit('deleteError', e.message)
  }
}

export const getUser = async ({ commit }, { id }) => {
  commit('getUserLoading')
  try {
    const response = await api.get('/users/' + id)
    commit('getUserSuccess', response.data.data)
  } catch (e) {
    commit('getUserError', e.response.data)
  }
}

export const clearUser = async ({ commit }) => {
  commit('clearUser')
}

export const save = async (
  { commit },
  {
    id,
    firstname,
    lastname,
    email,
    phone,
    comments,
    locale_id,
    gender_id,
    password,
    password_confirmation
  }
) => {
  commit('saveLoading')
  try {
    const response = await api.post('/users' + (id ? '/' + id : ''), {
      id,
      firstname,
      lastname,
      email,
      phone,
      comments,
      locale_id,
      gender_id,
      password,
      password_confirmation,
      updatepassword: 0
    })
    commit('saveSuccess', response.data.data)
  } catch (e) {
    commit('saveError', e.response.data)
  }
}

export default {
  getList,
  destroy,
  getUser,
  clearUser,
  save
}
