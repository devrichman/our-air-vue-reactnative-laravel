import { ApiService } from 'App/Services/ApiService'

function getOptions(service) {
  //   return ApiService.get('/options/' + service)
  return ApiService.get('/options/')
}

export const OptionService = {
  getOptions,
}
