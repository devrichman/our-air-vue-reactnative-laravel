import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  getBookings: ['userId', 'page'],
  bookingsSuccess: ['bookings'],
  bookingsError: ['errors'],
  bookingsReset: null,
  resetAll: null,
  resetCurrent: null,
  selectBooking: ['booking'],
  selectQuote: ['quote'],
  confirm: ['confirmation'],
  save: ['booking'],
  saveSuccess: null,
  saveError: ['error'],
  setValue: ['category', 'key', 'value'],
  addSegment: ['category', 'index'],
  removeSegment: ['category', 'index'],
  setSegmentValue: ['category', 'key', 'value', 'index'],
  addOption: ['category', 'option'],
  removeOption: ['category', 'option'],
  addCategory: ['category', 'item'],
  removeCategory: ['category', 'item'],
  addLastMessage: ['message'],
  sign: ['quoteId'],
  signSuccess: ['signature', 'signatureQuoteId'],
  signError: ['error'],
  payment: ['quoteId'],
  paymentSuccess: ['sessionId'],
  paymentError: ['error'],
})

export const BookingTypes = Types
export default Creators
