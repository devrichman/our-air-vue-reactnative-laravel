export default {
  connectedUser: state => state.user,
  isLoggedIn: state => state.user !== null
}
