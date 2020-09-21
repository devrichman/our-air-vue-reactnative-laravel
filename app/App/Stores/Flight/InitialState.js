/**
 * The initial values for the redux state.
 */
export const INITIAL_STATE = {
  airports: [],
  listAirportsLoading: false,
  listAirportsError: null,
  airportTarget: {},
  segmentIndex: 0,
  booking: {
    oneWay: {
      departureAirport: '',
      arrivalAirport: '',
      arrivalDate: '',
      arrivalHour: '',
      travelerNumber: null,
    },
    returnTrip: {
      departureAirport: '',
      arrivalAirport: '',
      arrivalDate: '',
      arrivalHour: '',
      travelerNumber: null,
    },
    options: {},
  },

  categories: [],
}
