export const connectedUser = (state) => state.user.user
export const isConnected = (state) => Object.getOwnPropertyNames(state.user.user).length > 0
