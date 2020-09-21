import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { GenderTypes } from './Actions'

export const getGenders = (state) => ({
  ...state,
  getGendersLoading: true,
  getGendersError: null,
})

export const getGendersSuccess = (state, { genders }) => ({
  ...state,
  genders: genders,
  gendersText: genders.map((item) => {
    return `user.gender_${item.gender}`
  }),
  getGendersLoading: false,
  getGendersError: null,
})

export const getGendersError = (state, { error }) => ({
  ...state,
  genders: INITIAL_STATE.genders,
  getGendersLoading: false,
  getGendersError: error,
})

export const reducer = createReducer(INITIAL_STATE, {
  [GenderTypes.GET_GENDERS]: getGenders,
  [GenderTypes.GET_GENDERS_SUCCESS]: getGendersSuccess,
  [GenderTypes.GET_GENDERS_FAILURE]: getGendersError,
})
