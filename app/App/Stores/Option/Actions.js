import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  getOptions: ['category'],
  getOptionsSuccess: ['options'],
  getOptionsError: ['error'],
})

export const OptionTypes = Types
export default Creators
