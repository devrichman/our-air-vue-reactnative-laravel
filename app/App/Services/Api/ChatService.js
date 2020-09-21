import { ApiService } from 'App/Services/ApiService'

function getMessages(bookingId) {
  return ApiService.get('/bookings/' + bookingId + '/messages')
}

function newMessage(bookingId, content) {
  let request = { content: content }
  return ApiService.post('/bookings/' + bookingId + '/messages', request)
}

export const ChatService = {
  getMessages,
  newMessage,
}
