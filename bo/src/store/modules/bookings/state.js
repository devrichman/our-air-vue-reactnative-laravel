export default {
  list: {
    data: [],
    meta: {}
  },
  listLoading: false,
  listError: null,
  deleteLoading: false,
  deleteSuccess: null,
  deleteError: null,
  item: {
    client: {},
    status: {},
    service: {},
    request: {
      categories: [],
      segments: [],
      options: []
    },
    quotes: []
  },

  messages: [],
  getMessagesLoading: false,
  getMessagesError: null,
  newMessageLoading: false,
  newMessageError: null,

  currentQuote: {},
  quoteStatuses: [],
  getLoading: false,
  getError: null,
  saveQuoteLoading: false,
  saveQuoteError: null,
  removeQuoteLoading: false,
  removeQuoteError: null,
  saveQuoteSegmentLoading: false,
  saveQuoteSegmentError: null,
  removeQuoteSegmentLoading: false,
  removeQuoteSegmentError: null,
  saveQuoteOptionLoading: false,
  saveQuoteOptionError: null,
  removeQuoteOptionLoading: false,
  removeQuoteOptionError: null,
  saveQuoteAircraftLoading: false,
  saveQuoteAircraftError: null,
  removeQuoteAircraftLoading: false,
  removeQuoteAircraftError: null
}
