import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { CommonTypes } from './Actions'

export const runAlert = (state, { alertType, title, message }) => {
  return {
    ...state,
    alert: {
      ...state.alert,
      type: alertType,
      title: title,
      message: message,
    },
    showAlert: true,
  }
}

export const closeAlert = (state) => ({
  ...state,
  alert: INITIAL_STATE.alert,
  showAlert: false,
})

export const resetAll = () => ({
  ...INITIAL_STATE,
})

export const reducer = createReducer(INITIAL_STATE, {
  [CommonTypes.RUN_ALERT]: runAlert,
  [CommonTypes.CLOSE_ALERT]: closeAlert,
  [CommonTypes.RESET_ALL]: resetAll,
})
