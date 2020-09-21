import { create } from 'apisauce'
import { Config } from 'App/Config'

export const ApiService = create({
  baseURL: Config.API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 30000,
})

export function parseErrors(response) {
  let errors = null
  if (response.data !== null && response.data.errors !== undefined) {
    errors = Object.values(response.data.errors)
  }

  return {
    type: 'error',
    title:
      response.data !== undefined && response.data !== null && response.data.message
        ? response.data.message
        : 'Erreur générale',
    message:
      errors !== null
        ? [].concat(...errors).join('\n')
        : 'Si le problème persiste, veuillez nous contacter.',
  }
}
