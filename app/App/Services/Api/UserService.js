import { ApiService } from 'App/Services/ApiService'

/**
 * Get user planning
 */

// Register Step One
function stepone(user) {
  return ApiService.post('/users', user)
}
// Register Step Two
function steptwo(user) {
  return ApiService.put('/me', user)
}

function login(user) {
  return ApiService.post('/users/login', user)
}

function logout() {
  return ApiService.post('/me/logout')
}

function me() {
  return ApiService.get('/me')
}

function resetPassword(password) {
  return ApiService.post('/users/password/reset', password)
}

function forgotPasswordEmail(email) {
  return ApiService.post('/users/password', { email })
}

function updateUser(user) {
  return ApiService.post('/me/users/' + user.user.id, user.user)
}

function updateLanguageUser(user) {
  return ApiService.post('/me/users/' + user.user.id, user.user)
}

export const UserService = {
  stepone,
  steptwo,
  login,
  logout,
  me,
  resetPassword,
  forgotPasswordEmail,
  updateUser,
  updateLanguageUser,
}
