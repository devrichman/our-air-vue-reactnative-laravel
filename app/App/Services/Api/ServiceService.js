import { ApiService } from 'App/Services/ApiService'

/**
 * Get user planning
 */
function list() {
  return ApiService.get('/services')
}

export const ServiceService = {
  list,
}
