import { ApiService } from 'App/Services/ApiService'

function getBookings(userId, page = 1) {
  return ApiService.get('/me/bookings', {
    user_id: userId,
    page: page,
    perPage: 5,
  })
}

function save(booking) {
  return ApiService.post('/me/bookings', booking)
}

function sign(quoteId) {
  return ApiService.post('/quotes/' + quoteId)
}

function payment(quoteId) {
  return ApiService.post('/quotes/' + quoteId + '/payment')
}

export const BookingService = {
  getBookings,
  save,
  sign,
  payment,
}
