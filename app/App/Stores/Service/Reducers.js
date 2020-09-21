import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { ServiceTypes } from './Actions'

export const list = (state) => ({
  ...state,
  listLoading: true,
  listError: null,
})

export const listSuccess = (state, { services }) => ({
  ...state,
  list: services,
  listLoading: false,
  listError: null,
})

export const listError = (state, { error }) => ({
  ...state,
  list: INITIAL_STATE.list,
  listLoading: false,
  listError: error,
})

export const reducer = createReducer(INITIAL_STATE, {
  [ServiceTypes.LIST]: list,
  [ServiceTypes.LIST_SUCCESS]: listSuccess,
  [ServiceTypes.LIST_FAILURE]: listError,
})
