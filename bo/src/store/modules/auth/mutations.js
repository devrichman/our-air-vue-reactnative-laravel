export default {
  loginSuccess(state, user) {
    state.loginLoading = false
    state.user = user
    state.loginError = null
  },
  loginError(state, error) {
    state.loginLoading = false
    state.user = null
    state.loginError = error
  },
  loginLoading(state) {
    state.user = null
    state.loginError = null
    state.loginLoading = true
  },
  logoutSuccess(state) {
    state.logoutLoading = false
    state.logoutError = null
    state.user = null
  },
  logoutError(state, error) {
    state.logoutLoading = false
    state.logoutError = error
  },
  logoutLoading(state) {
    state.logoutLoading = true
    state.logoutError = null
  },
  meSuccess(state, user) {
    state.meLoading = false
    state.meError = null
    state.user = user
  },
  meError(state, error) {
    state.meLoading = false
    state.meError = error
    state.user = null
  },
  meLoading(state) {
    state.meLoading = true
    state.meError = null
    state.user = null
  }
}
