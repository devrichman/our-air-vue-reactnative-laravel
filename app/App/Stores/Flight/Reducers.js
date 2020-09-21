import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { FlightTypes } from 'App/Stores/Flight/Actions'

export const searchAirports = (state) => ({
  ...state,
  listAirportsLoading: true,
  listAirportsError: null,
})

export const listAirportsSuccess = (state, { airports }) => ({
  ...state,
  airports: airports,
  listAirportsLoading: false,
  listAirportsError: null,
})

export const listAirportsError = (state, { error }) => ({
  ...state,
  airports: INITIAL_STATE.airports,
  listAirportsLoading: false,
  listAirportsError: error,
})

export const search = (state, { segments }) => ({
  ...state,
  searchLoading: true,
})

export const searchSuccess = (state, { categories }) => ({
  ...state,
  searchLoading: false,
  categories: categories,
})

export const selectCategory = (state, { category }) => ({
  ...state,
  booking: {
    ...state.booking,
    categories: { ...state.booking.categories, [category.id]: category },
  },
})

export const unselectCategory = (state, { category }) => {
  delete state.booking.categories[category.id]
  return {
    ...state,
    booking: { ...state.booking, categories: { ...state.booking.categories } },
  }
}

export const selectAirportTarget = (state, { airportTarget }) => ({
  ...state,
  airportTarget: airportTarget,
})

export const reducer = createReducer(INITIAL_STATE, {
  [FlightTypes.SEARCH_AIRPORTS]: searchAirports,
  [FlightTypes.LIST_AIRPORTS_SUCCESS]: listAirportsSuccess,
  [FlightTypes.LIST_AIRPORTS_FAILURE]: listAirportsError,

  [FlightTypes.SEARCH]: search,
  [FlightTypes.SEARCH_SUCCESS]: searchSuccess,

  [FlightTypes.SELECT_CATEGORY]: selectCategory,
  [FlightTypes.UNSELECT_CATEGORY]: unselectCategory,

  [FlightTypes.SELECT_AIRPORT_TARGET]: selectAirportTarget,
})
