export const INITIAL_FLIGHT_SEGMENT = {
  from: 'LYS',
  to: 'QLS',
  date: null,
  pax: 1,
}

export const INITIAL_STATE = {
  bookings: [],
  confirmation: false,
  current: {
    flight: {
      segments: { 0: INITIAL_FLIGHT_SEGMENT },
      options: {},
      categories: {},
    },
    car: {},
    helicopter: {},
    yatch: {},
  },
  saveLoading: false,
  signatureLoading: false,
  signature: false,
  signatureQuoteId: null,
  paymentLoading: false,
  sessionId: null,
}
