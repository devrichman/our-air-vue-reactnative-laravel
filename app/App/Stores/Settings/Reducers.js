import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { SettingsTypes } from './Actions'

export const getSuccess = (state, { settings }) => ({
  ...state,
  email: settings.email,
  phone: settings.phone,
  general_terms: settings.general_terms,
})

export const getError = (state, { errors }) => ({
  ...state,
  email: INITIAL_STATE.email,
  phone: INITIAL_STATE.phone,
  general_terms: INITIAL_STATE.general_terms,
  loading: false,
  error: errors,
})

export const setPreviousPage = (state, { previousPage }) => ({
  ...state,
  previousPage: previousPage,
})

export const reducer = createReducer(INITIAL_STATE, {
  [SettingsTypes.GET_SUCCESS]: getSuccess,
  [SettingsTypes.GET_FAILURE]: getError,
  [SettingsTypes.SET_PREVIOUS_PAGE]: setPreviousPage,
})
