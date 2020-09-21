import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  list: null,
  listSuccess: ['services'],
  listFailure: ['errors'],
})

export const ServiceTypes = Types
export default Creators
