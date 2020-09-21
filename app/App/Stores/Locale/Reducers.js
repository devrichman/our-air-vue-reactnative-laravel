import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { LocaleTypes } from './Actions'

export const getLines = (state) => ({
  ...state,
})

export const getLinesSuccess = (state, { lines }) => ({
  ...state,
  lines: lines,
})

export const getLocales = (state) => ({
  ...state,
  locales: INITIAL_STATE.locales,
})
export const getLocalesSuccess = (state, { locales }) => ({
  ...state,
  locales: locales,
})

export const setLocale = (state, { locale }) => ({
  ...state,
  iso: locale,
})

export const reducer = createReducer(INITIAL_STATE, {
  [LocaleTypes.GET_LINES]: getLines,
  [LocaleTypes.GET_LINES_SUCCESS]: getLinesSuccess,
  [LocaleTypes.GET_LOCALES]: getLocales,
  [LocaleTypes.GET_LOCALES_SUCCESS]: getLocalesSuccess,
  [LocaleTypes.SET_LOCALE]: setLocale,
})
