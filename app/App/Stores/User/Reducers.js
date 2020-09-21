import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { UserTypes } from './Actions'
// Register Step One
export const stepone = (state) => ({
  ...state,
  steponeLoading: true,
  steponeError: null,
})

export const steponeSuccess = (state, { user }) => ({
  ...state,
  pending_user: user,
  steponeLoading: false,
  steponeError: null,
})

export const steponeError = (state, { errors }) => ({
  ...state,
  user: INITIAL_STATE.user,
  steponeLoading: false,
  steponeError: errors,
})
// Register Step Two
export const steptwo = (state) => ({
  ...state,
  steptwoLoading: true,
  steptwoError: null,
})

export const steptwoSuccess = (state, { user }) => ({
  ...state,
  user: user,
  steptwoLoading: false,
  steptwoError: null,
})

export const steptwoError = (state, { errors }) => ({
  ...state,
  user: INITIAL_STATE.user,
  steptwoLoading: false,
  steptwoError: errors,
})

export const login = (state) => ({
  ...state,
  loginLoading: true,
  loginError: null,
})

export const loginSuccess = (state, { user }) => ({
  ...state,
  user: user,
  loginLoading: false,
  loginError: null,
})

export const loginPending = (state, { user }) => ({
  ...state,
  pending_user: user,
  loginLoading: false,
  loginError: null,
})

export const loginError = (state, { errors }) => ({
  ...state,
  user: INITIAL_STATE.user,
  loginLoading: false,
  loginError: errors,
})

export const logout = (state) => ({
  ...state,
  user: INITIAL_STATE.user,
  logoutLoading: true,
  logoutError: null,
})

export const logoutSuccess = (state) => ({
  ...state,
  user: INITIAL_STATE.user,
  logoutLoading: false,
  logoutError: null,
})

export const logoutError = (state, { errors }) => ({
  ...state,
  logoutLoading: false,
  logoutError: errors,
})
export const me = (state) => ({
  ...state,
  meIsLoading: true,
  user: INITIAL_STATE.user,
})

export const meSuccess = (state, { user }) => ({
  ...state,
  meIsLoading: false,
  user: user,
})

export const meError = (state) => ({
  ...state,
  meIsLoading: false,
  user: INITIAL_STATE.user,
})

export const resetPassword = (state) => ({
  ...state,
  resetPasswordLoading: true,
  resetPasswordSuccess: INITIAL_STATE.resetPasswordSuccess,
  resetPasswordError: null,
})

export const resetPasswordSuccess = (state, { confirmation }) => ({
  ...state,
  resetPasswordLoading: INITIAL_STATE.resetPasswordLoading,
  resetPasswordSuccess: confirmation,
  resetPasswordError: null,
})

export const resetPasswordError = (state, { errors }) => ({
  ...state,
  resetPasswordLoading: INITIAL_STATE.resetPasswordLoading,
  resetPasswordSuccess: INITIAL_STATE.resetPasswordSuccess,
  resetPasswordError: errors,
})

export const resetPasswordEmail = (state, { email }) => ({
  ...state,
  resetPasswordEmail: email,
  resetPasswordEmailLoading: true,
  resetPasswordEmailSuccess: INITIAL_STATE.resetPasswordEmailSuccess,
  resetPasswordEmailError: null,
})

export const resetPasswordEmailSuccess = (state, { confirmation }) => ({
  ...state,
  resetPasswordEmailLoading: INITIAL_STATE.resetPasswordEmailLoading,
  resetPasswordEmailSuccess: confirmation,
  resetPasswordEmailError: null,
})

export const resetPasswordEmailFailure = (state, { errors }) => ({
  ...state,
  resetPasswordEmail: INITIAL_STATE.resetPasswordEmail,
  resetPasswordEmailSuccess: INITIAL_STATE.resetPasswordEmailSuccess,
  resetPasswordEmailLoading: INITIAL_STATE.resetPasswordEmailLoading,
  resetPasswordEmailError: errors,
})

export const update = (state) => ({
  ...state,
  updateLoading: true,
  updateError: null,
})

export const updateSuccess = (state, { user }) => ({
  ...state,
  user: user,
  updateLoading: false,
  updateError: null,
})

export const updateError = (state, { errors }) => {
  return {
    ...state,
    updateLoading: false,
    updateError: errors,
  }
}

export const updateLanguage = (state) => ({
  ...state,
  updateLanguageLoading: true,
  updateLanguageError: null,
})

export const updateLanguageSuccess = (state, { user }) => ({
  ...state,
  user: user,
  updateLanguageLoading: false,
  updateLanguageError: null,
})

export const updateLanguageError = (state, { errors }) => {
  return {
    ...state,
    updateLanguageLoading: false,
    updateLanguageError: errors,
  }
}

export const reducer = createReducer(INITIAL_STATE, {
  [UserTypes.STEPONE]: stepone,
  [UserTypes.STEPONE_SUCCESS]: steponeSuccess,
  [UserTypes.STEPONE_FAILURE]: steponeError,

  [UserTypes.STEPTWO]: steptwo,
  [UserTypes.STEPTWO_SUCCESS]: steptwoSuccess,
  [UserTypes.STEPTWO_FAILURE]: steptwoError,

  [UserTypes.LOGIN]: login,
  [UserTypes.LOGIN_SUCCESS]: loginSuccess,
  [UserTypes.LOGIN_PENDING]: loginPending,
  [UserTypes.LOGIN_FAILURE]: loginError,

  [UserTypes.LOGOUT]: logout,
  [UserTypes.LOGOUT_SUCCESS]: logoutSuccess,
  [UserTypes.LOGOUT_FAILURE]: logoutError,

  [UserTypes.ME]: me,
  [UserTypes.ME_SUCCESS]: meSuccess,
  [UserTypes.ME_ERROR]: meError,

  [UserTypes.RESET_PASSWORD]: resetPassword,
  [UserTypes.RESET_PASSWORD_SUCCESS]: resetPasswordSuccess,
  [UserTypes.RESET_PASSWORD_FAILURE]: resetPasswordError,

  [UserTypes.RESET_PASSWORD_EMAIL]: resetPasswordEmail,
  [UserTypes.RESET_PASSWORD_EMAIL_SUCCESS]: resetPasswordEmailSuccess,
  [UserTypes.RESET_PASSWORD_EMAIL_FAILURE]: resetPasswordEmailFailure,

  [UserTypes.UPDATE]: update,
  [UserTypes.UPDATE_SUCCESS]: updateSuccess,
  [UserTypes.UPDATE_FAILURE]: updateError,

  [UserTypes.UPDATE_LANGUAGE]: updateLanguage,
  [UserTypes.UPDATE_LANGUAGE_SUCCESS]: updateLanguageSuccess,
  [UserTypes.UPDATE_LANGUAGE_FAILURE]: updateLanguageError,
})
