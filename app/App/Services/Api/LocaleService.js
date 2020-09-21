import { ApiService } from 'App/Services/ApiService'

/**
 * Get locale lines
 */
function getLines(locale) {
  return ApiService.get('/locales/' + locale + '/lines')
}

function getLocales() {
  return ApiService.get('/locales')
}

export const LocaleService = {
  getLines,
  getLocales,
}
