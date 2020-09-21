export default {
  listLoading(state) {
    state.listLoading = true
    state.listError = null
  },
  listSuccess(state, list) {
    state.list = list
    state.listLoading = false
    state.listError = null
  },
  listError(state, error) {
    state.listLoading = false
    state.listError = error
  },
  deleteLoading(state) {
    state.deleteLoading = true
    state.deleteError = null
  },
  deleteSuccess(state, id) {
    state.deleteLoading = false
    state.list.splice(state.list.findIndex(item => item.id === id), 1)
    state.deleteError = null
  },
  deleteError(state, error) {
    state.deleteLoading = false
    state.deleteError = error
  },
  getLoading(state) {
    state.getLoading = true
    state.getError = null
  },
  getSuccess(state, item) {
    state.item = item
    state.getLoading = false
    state.getError = null
  },
  getError(state, error) {
    state.getLoading = false
    state.getError = error
  },
  //chat messages loading
  getMessagesLoading(state) {
    state.getMessagesLoading = true
    state.getMessagesError = null
  },
  getMessagesSuccess(state, messages) {
    state.messages = messages.reverse()
    state.getMessagesLoading = false
    state.getMessagesError = null
  },
  getMessagesError(state, error) {
    state.getMessagesLoading = false
    state.getMessagesError = error
  },
  newMessageLoading(state) {
    state.newMessageLoading = true
    state.newMessageError = null
  },
  newMessageSuccess(state) {
    state.newMessageLoading = false
    state.newMessageError = null
  },
  newMessageError(state, error) {
    state.newMessageLoading = false
    state.newMessageError = error
  },
  appendMessage(state, message) {
    state.messages =
      state.messages.length > 0 ? state.messages.concat(message) : [message]
    state.item.last_message = message
  },
  //save quote loading
  saveQuoteLoading(state) {
    state.saveQuoteLoading = true
    state.saveQuoteError = null
  },
  saveQuoteSuccess(state, item) {
    if (state.item.quotes.findIndex(i => i.id === item.id) === -1) {
      state.item.quotes = [...state.item.quotes, item]
    } else {
      state.item.quotes = state.item.quotes.map(i => {
        if (i.id === item.id) {
          i = item
        }
        return i
      })
    }
    state.currentQuote = item
    state.saveQuoteLoading = false
    state.saveQuoteError = null
  },
  saveQuoteError(state, error) {
    state.saveQuoteLoading = false
    state.saveQuoteError = error
  },
  saveQuoteSegmentLoading(state) {
    state.saveQuoteSegmentLoading = true
    state.saveQuoteSegmentError = null
  },
  saveQuoteSegmentSuccess(state, data) {
    state.item.quotes = state.item.quotes.map(i => {
      if (i.id === data.id) {
        i = data
      }
      return i
    })
    state.saveQuoteSegmentLoading = false
    state.saveQuoteSegmentError = null
  },
  saveQuoteSegmentError(state, error) {
    state.saveQuoteSegmentLoading = false
    state.saveQuoteSegmentError = error
  },
  removeQuoteSegmentLoading(state) {
    state.removeQuoteSegmentLoading = true
    state.removeQuoteSegmentError = null
  },
  removeQuoteSegmentSuccess(state, { quoteId, segmentId }) {
    state.item.quotes.find(
      i => i.id === quoteId
    ).segments = state.item.quotes
      .find(i => i.id === quoteId)
      .segments.filter(i => i.id !== segmentId)
    state.removeQuoteSegmentLoading = false
    state.removeQuoteSegmentError = null
  },
  removeQuoteSegmentError(state, error) {
    state.removeQuoteSegmentLoading = false
    state.removeQuoteSegmentError = error
  },
  saveQuoteOptionLoading(state) {
    state.saveQuoteOptionLoading = true
    state.saveQuoteOptionError = null
  },
  saveQuoteOptionSuccess(state, data) {
    state.item.quotes = state.item.quotes.map(i => {
      if (i.id === data.id) {
        i = data
      }
      return i
    })
    state.saveQuoteOptionLoading = false
    state.saveQuoteOptionError = null
  },
  saveQuoteOptionError(state, error) {
    state.saveQuoteOptionLoading = false
    state.saveQuoteOptionError = error
  },
  removeQuoteOptionLoading(state) {
    state.removeQuoteOptionLoading = true
    state.removeQuoteOptionError = null
  },
  removeQuoteOptionSuccess(state, { quoteId, optionId }) {
    state.item.quotes.find(
      i => i.id === quoteId
    ).options = state.item.quotes
      .find(i => i.id === quoteId)
      .options.filter(i => i.id !== optionId)
    state.removeQuoteOptionLoading = false
    state.removeQuoteOptionError = null
  },
  removeQuoteOptionError(state, error) {
    state.removeQuoteOptionLoading = false
    state.removeQuoteOptionError = error
  },
  removeQuoteLoading(state) {
    state.removeQuoteLoading = true
    state.removeQuoteError = null
  },
  removeQuoteSuccess(state, id) {
    state.item.quotes = state.item.quotes.filter(i => i.id !== id)
    state.removeQuoteLoading = false
    state.removeQuoteError = null
  },
  removeQuoteError(state, error) {
    state.removeQuoteLoading = false
    state.removeQuoteError = error
  },
  getQuoteStatusesSuccess(state, statuses) {
    state.quoteStatuses = statuses
  },

  saveQuoteAircraftSuccess(state, data) {
    state.item.quotes = state.item.quotes.map(i => {
      if (i.id === data.id) {
        i = data
      }
      return i
    })
    state.saveQuoteAircraftLoading = false
    state.saveQuoteAircraftError = null
  },
  saveQuoteAircraftError(state, error) {
    state.saveQuoteAircraftLoading = false
    state.saveQuoteAircraftError = error
  },
  saveQuoteAircraftLoading(state) {
    state.saveQuoteAircraftLoading = false
  },
  removeQuoteAircraftLoading(state) {
    state.removeQuoteAircraftLoading = true
    state.removeQuoteAircraftError = null
  },
  removeQuoteAircraftSuccess(state, { quoteId, aircraftId }) {
    state.item.quotes.find(
      i => i.id === quoteId
    ).aircrafts = state.item.quotes
      .find(i => i.id === quoteId)
      .aircrafts.filter(i => i.id !== aircraftId)
    state.removeQuoteAircraftLoading = false
    state.removeQuoteAircraftError = null
  },
  removeQuoteAircraftError(state, error) {
    state.removeQuoteAircraftLoading = false
    state.removeQuoteAircraftError = error
  }
}
