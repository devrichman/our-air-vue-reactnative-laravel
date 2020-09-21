/**
 * The initial values for the redux state.
 */
export const INITIAL_STATE = {
  user: {},
  steponeLoading: false,
  steponeError: null,

  steptwoLoading: false,
  steptwoError: null,

  loginLoading: false,
  loginError: null,

  updateLoading: false,
  updateError: null,

  updateLanguageLoading: false,
  updateLanguageError: null,

  logoutLoading: false,
  logoutError: null,

  meIsLoading: null,

  resetPasswordLoading: false,
  resetPasswordSuccess: '',
  resetPasswordError: null,

  resetPasswordEmail: '',
  resetPasswordEmailLoading: false,
  resetPasswordEmailSuccess: '',
  resetPasswordEmailError: null,
}
