import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  runAlert: ['alertType', 'title', 'message'],
  closeAlert: null,
  resetAll: null,
})

export const CommonTypes = Types
export default Creators
