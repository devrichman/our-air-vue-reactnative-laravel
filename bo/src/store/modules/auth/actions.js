import api from '@/services/api'
import router from '@/router'

export const login = async ({ commit }, { email, password, remember }) => {
  commit('loginLoading')
  try {
    const response = await api.post('/users/login', {
      email: email,
      password: password,
      remember: remember
    })
    commit('loginSuccess', response.data.data)

    return router.push({
      name: 'home'
    })
  } catch (e) {
    commit('loginError', e.response.data)
  }
}

export const logout = async ({ commit }) => {
  commit('logoutLoading')
  try {
    await api.post('/me/logout')
    commit('logoutSuccess')
    return router.push({ name: 'auth-login' })
  } catch (e) {
    commit('logoutError', e.response.data)
  }
}

export const me = async ({ commit }) => {
  commit('meLoading')
  try {
    const response = await api.get('/me')
    commit('meSuccess', response.data.data)
  } catch (e) {
    commit('meError', e.response.data)
  }
}

export default {
  login,
  logout,
  me
}
