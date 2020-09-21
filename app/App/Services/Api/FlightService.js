import { ApiService } from 'App/Services/ApiService'

function searchAirports(text) {
  let search = { search: text }
  return ApiService.get('/airports', search)
}

function getCategories(segments) {
  let request = {
    from: segments[0].from.id || 0,
    to: segments[0].to.id || 0,
    from_back: segments[1] ? segments[1].from.id || 0 : 0,
    to_back: segments[1] ? segments[1].to.id || 0 : 0,
  }
  return ApiService.get('/flights/categories', request)
}

export const FlightService = {
  searchAirports,
  getCategories,
}
