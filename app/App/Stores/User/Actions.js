import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  // Register Step One
  stepone: ['user'],
  steponeSuccess: ['user'],
  steponeFailure: ['errors'],

  // Register Step Two
  steptwo: ['user'],
  steptwoSuccess: ['user'],
  steptwoFailure: ['errors'],

  login: ['user'],
  loginSuccess: ['user'],
  loginPending: ['user'],
  loginFailure: ['errors'],

  update: ['user'],
  updateSuccess: ['user'],
  updateFailure: ['errors'],

  updateLanguage: ['user'],
  updateLanguageSuccess: ['user'],
  updateLanguageFailure: ['errors'],

  logout: null,
  logoutSuccess: null,
  logoutFailure: ['errors'],

  me: null,
  meSuccess: ['user'],
  meError: null,

  resetPassword: ['payload'],
  resetPasswordSuccess: ['confirmation'],
  resetPasswordFailure: ['errors'],

  resetPasswordEmail: ['email'],
  resetPasswordEmailSuccess: ['confirmation'],
  resetPasswordEmailFailure: ['errors'],
})

export const UserTypes = Types
export default Creators
