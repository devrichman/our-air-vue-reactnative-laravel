import axios from 'axios'
import { Message } from 'element-ui'
import router from '@/router'
import store from '@/store'

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 30000,
  withCredentials: true
})

instance.interceptors.response.use(
  function(response) {
    return response
  },
  function(error) {
    if (axios.isCancel(error)) {
      return Promise.reject(error)
    }
    const { response } = error
    const path = response.config.url.replace(response.config.baseURL, '')

    if (path !== '/me') {
      Message.error(
        response.data && response.data.message
          ? response.data.message
          : "Une erreur innatendue s'est produite"
      )
    }

    // Global redirection on 401
    if (response.status === 401) {
      store.commit('auth/logoutSuccess')

      if (path !== '/me') {
        router.push({ name: 'auth-login' })
      }
    }
    return Promise.reject(error)
  }
)

export function errorMessage(error, key) {
  return error !== null &&
    error.errors !== undefined &&
    error.errors.hasOwnProperty(key)
    ? error.errors[key].flat().join('\n')
    : null
}

export function extractErrorMessagesAsArray(error) {
  const errorsData =
    error.response && error.response.data && error.response.data.errors
  let errorMessages = []
  if (errorsData) {
    Object.values(errorsData).forEach(fieldError => {
      fieldError.forEach(errorMessage => {
        errorMessages.push(errorMessage)
      })
    })
  }

  return errorMessages
}

export default instance
