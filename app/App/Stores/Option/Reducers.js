import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { OptionTypes } from './Actions'

export const getOptions = (state) => ({
  ...state,
  getOptionsLoading: true,
  getOptionsError: null,
  options: INITIAL_STATE.options,
})

export const getOptionsSuccess = (state, { options }) => ({
  ...state,
  getOptionsLoading: false,
  getOptionsError: null,
  options: options,
})

export const getOptionsError = (state, { error }) => ({
  ...state,
  getOptionsLoading: false,
  getOptionsError: error,
  options: INITIAL_STATE.options,
})

export const reducer = createReducer(INITIAL_STATE, {
  [OptionTypes.GET_OPTIONS]: getOptions,
  [OptionTypes.GET_OPTIONS_SUCCESS]: getOptionsSuccess,
  [OptionTypes.GET_OPTIONS_ERROR]: getOptionsError,
})
