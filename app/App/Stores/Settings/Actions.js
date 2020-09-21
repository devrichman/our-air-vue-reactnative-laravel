import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  getSuccess: ['settings'],
  getFailure: ['errors'],
  setPreviousPage: ['previousPage'],
})

export const SettingsTypes = Types
export default Creators
