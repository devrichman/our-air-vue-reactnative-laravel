import { ApiService } from 'App/Services/ApiService'

/**
 * Get all genders
 */
function getGenders() {
  return ApiService.get('/genders')
}

export const GenderService = {
  getGenders,
}
