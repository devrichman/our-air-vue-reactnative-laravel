import { ApiService } from 'App/Services/ApiService'

function get() {
  return ApiService.get('/settings')
}

export const SettingsService = {
  get,
}
