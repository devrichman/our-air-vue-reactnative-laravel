import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  searchAirports: ['text'],
  listAirportsSuccess: ['airports'],
  listAirportsFailure: ['errors'],

  search: ['segments'],
  searchSuccess: ['categories'],

  selectCategory: ['category'],
  unselectCategory: ['category'],
  selectAirportTarget: ['airportTarget'],
})

export const FlightTypes = Types
export default Creators
