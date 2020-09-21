import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  getLines: ['locale'],
  getLinesSuccess: ['lines'],
  getLocales: null,
  getLocalesSuccess: ['locales'],
  setLocale: ['locale'],
})

export const LocaleTypes = Types
export default Creators
