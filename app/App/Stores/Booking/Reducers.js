import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { BookingTypes } from 'App/Stores/Booking/Actions'

export const getBookings = (state) => ({
  ...state,
  bookingsIsLoading: true,
  bookingsErrors: null,
})

export const bookingsSuccess = (state, { bookings }) => ({
  ...state,
  bookings: state.bookings.length <= 0 ? bookings.data : state.bookings.concat(bookings.data),
  bookingsMeta: bookings.meta,
  bookingsIsLoading: false,
  bookingsErrors: null,
})

export const bookingsError = (state, errors) => ({
  ...state,
  bookingsIsLoading: false,
  bookingsErrors: errors,
  bookings: INITIAL_STATE.bookings,
})

export const bookingsReset = (state) => ({
  ...state,
  bookings: INITIAL_STATE.bookings,
})

export const selectBooking = (state, { booking }) => ({
  ...state,
  booking: booking,
})

export const selectQuote = (state, { quote }) => ({
  ...state,
  quote: quote,
})

export const resetAll = () => ({
  ...INITIAL_STATE,
})

export const resetCurrent = () => ({
  current: INITIAL_STATE.current,
})

export const setValue = (state, { category, key, value }) => ({
  ...state,
  current: {
    [category]: {
      ...state.current[category],
      [key]: value,
    },
  },
})

export const setSegmentValue = (state, { category, key, value, index }) => ({
  ...state,
  current: {
    [category]: {
      ...state.current[category],
      segments: {
        ...state.current[category].segments,
        [index]: {
          ...state.current[category].segments[index],
          [key]: value,
        },
      },
    },
  },
})

export const addSegment = (state, { category, index }) => ({
  ...state,
  current: {
    [category]: {
      ...state.current[category],
      segments: {
        ...state.current[category].segments,
        [index]: {
          from: state.current[category].segments[0].to,
          to: state.current[category].segments[0].from,
          date: null,
          pax: 1,
        },
      },
    },
  },
})

export const removeSegment = (state, { category, index }) => {
  delete state.current[category].segments[index]
  return { ...state }
}

export const addOption = (state, { category, option }) => ({
  ...state,
  current: {
    [category]: {
      ...state.current[category],
      options: {
        ...state.current[category].options,
        [option.id]: option,
      },
    },
  },
})

export const removeOption = (state, { category, option }) => {
  delete state.current[category].options[option.id]
  return { ...state }
}

export const addCategory = (state, { category, item }) => ({
  ...state,
  current: {
    [category]: {
      ...state.current[category],
      categories: {
        ...state.current[category].categories,
        [item.id]: item,
      },
    },
  },
})

export const removeCategory = (state, { category, item }) => {
  delete state.current[category].categories[item.id]
  return { ...state }
}
export const confirm = (state, { confirmation }) => ({
  ...state,
  confirmation: confirmation,
})

export const save = (state) => ({
  ...state,
  saveLoading: true,
  saveError: null,
})

export const saveSuccess = (state) => ({
  ...state,
  saveLoading: false,
  saveError: null,
})

export const saveError = (state, { error }) => ({
  ...state,
  saveLoading: false,
  saveError: error,
})

export const addLastMessage = (state, { message }) => ({
  ...state,
  booking: {
    ...state.booking,
    last_message: message,
  },
})

export const sign = (state) => ({
  ...state,
  signatureLoading: true,
  signatureError: null,
})

export const signSuccess = (state, { signature, signatureQuoteId }) => ({
  ...state,
  signature: signature,
  signatureQuoteId: signatureQuoteId,
  signatureLoading: false,
  signatureError: null,
})

export const signError = (state, { error }) => ({
  ...state,
  signatureLoading: false,
  signatureError: error,
})

export const payment = (state) => ({
  ...state,
  paymentLoading: true,
  paymentError: null,
})

export const paymentSuccess = (state, { sessionId }) => ({
  ...state,
  sessionId: sessionId,
  paymentLoading: false,
  paymentError: null,
})

export const paymentError = (state, { error }) => ({
  ...state,
  paymentLoading: false,
  paymentError: error,
})

export const reducer = createReducer(INITIAL_STATE, {
  [BookingTypes.GET_BOOKINGS]: getBookings,
  [BookingTypes.BOOKINGS_SUCCESS]: bookingsSuccess,
  [BookingTypes.BOOKINGS_ERROR]: bookingsError,
  [BookingTypes.BOOKINGS_RESET]: bookingsReset,
  [BookingTypes.RESET_ALL]: resetAll,
  [BookingTypes.RESET_CURRENT]: resetCurrent,
  [BookingTypes.SELECT_BOOKING]: selectBooking,
  [BookingTypes.SELECT_QUOTE]: selectQuote,

  [BookingTypes.SET_VALUE]: setValue,
  [BookingTypes.SET_SEGMENT_VALUE]: setSegmentValue,
  [BookingTypes.ADD_SEGMENT]: addSegment,
  [BookingTypes.REMOVE_SEGMENT]: removeSegment,
  [BookingTypes.ADD_OPTION]: addOption,
  [BookingTypes.REMOVE_OPTION]: removeOption,
  [BookingTypes.ADD_CATEGORY]: addCategory,
  [BookingTypes.REMOVE_CATEGORY]: removeCategory,
  [BookingTypes.CONFIRM]: confirm,
  [BookingTypes.SAVE]: save,
  [BookingTypes.SAVE_SUCCESS]: saveSuccess,
  [BookingTypes.SAVE_ERROR]: saveError,
  [BookingTypes.ADD_LAST_MESSAGE]: addLastMessage,

  [BookingTypes.SIGN]: sign,
  [BookingTypes.SIGN_SUCCESS]: signSuccess,
  [BookingTypes.SIGN_ERROR]: signError,

  [BookingTypes.PAYMENT]: payment,
  [BookingTypes.PAYMENT_SUCCESS]: paymentSuccess,
  [BookingTypes.PAYMENT_ERROR]: paymentError,
})
