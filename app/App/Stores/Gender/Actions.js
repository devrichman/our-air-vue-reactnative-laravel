import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  getGenders: null,
  getGendersText: null,
  getGendersSuccess: ['genders'],
  getGendersFailure: ['error'],
})

export const GenderTypes = Types
export default Creators
