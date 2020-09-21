export default {
  listAircraftLoading(state) {
    state.listAircraftLoading = true
    state.listAircraftError = null
  },
  listAircraftSuccess(state, aircraftlist) {
    state.aircraftlist = aircraftlist
    state.listAircraftLoading = false
    state.listAircraftError = null
  },
  listAircraftError(state, error) {
    state.listAircraftLoading = false
    state.listAircraftError = error
  },
  deleteAircraftLoading(state) {
    state.deleteAircraftLoading = true
    state.deleteAircraftError = null
  },
  deleteAircraftSuccess(state, id) {
    state.deleteAircraftLoading = false
    state.aircraftlist.splice(
      state.aircraftlist.findIndex(aircraftitem => aircraftitem.id === id),
      1
    )
    state.deleteAircraftError = null
  },
  deleteAircraftError(state, error) {
    state.deleteAircraftLoading = false
    state.deleteAircraftError = error
  },

  saveAircraftLoading(state) {
    state.saveAircraftLoading = true
    state.saveAircraftError = null
  },
  saveAircraftSuccess(state, aircraft) {
    state.saveAircraftLoading = false
    state.aircraftlist.data = [...state.aircraftlist.data, aircraft]
    state.createAircraftError = null
    state.aircraftitem = {}
  },
  saveAircraftError(state, error) {
    state.saveAircraftLoading = false
    state.saveAircraftError = error
  },

  getAircraftLoading(state) {
    state.getAircraftLoading = true
    state.getAircraftError = null
  },
  getAircraftSuccess(state, aircraftitem) {
    state.getAircraftLoading = false
    state.getAircraftError = null
    state.aircraftitem = aircraftitem
  },
  getAircraftError(state, error) {
    state.getAircraftLoading = false
    state.getAircraftError = error
  },
  clearAircraft(state) {
    state.getAircraftLoading = false
    state.getAircraftError = null
    state.aircraftitem = {}
    state.saveAircraftError = null
  }
}
