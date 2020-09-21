import api from '@/services/api'
import moment from 'moment'

export const getList = async (
  { commit },
  { page, order, orderProp, filters, perPage }
) => {
  commit('listLoading')
  try {
    const response = await api.get('/bookings', {
      params: {
        page,
        order,
        orderProp,
        ...filters,
        perPage
      }
    })
    commit('listSuccess', response.data)
  } catch (e) {
    commit('listError', e.response.data)
  }
}

export const destroy = async ({ commit }, id) => {
  commit('deleteLoading')
  try {
    await api.delete('/bookings/' + id)
    commit('deleteSuccess', id)
  } catch (e) {
    commit('deleteError', e.message)
  }
}

export const get = async ({ commit }, { id }) => {
  commit('getLoading')
  try {
    const response = await api.get('/bookings/' + id)
    commit('getSuccess', response.data.data)
  } catch (e) {
    commit('getError', e.response.data)
  }
}

export const getQuoteStatuses = async ({ commit }) => {
  const response = await api.get('/quotes/statuses')
  commit('getQuoteStatusesSuccess', response.data)
}

export const saveQuote = async (
  { commit },
  { bookingId, quoteId, formdata }
) => {
  commit('saveQuoteLoading')
  try {
    const response = await api.post(
      '/bookings/' + bookingId + '/quotes' + (quoteId ? '/' + quoteId : ''),
      formdata,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    )
    commit('saveQuoteSuccess', response.data.data)
  } catch (e) {
    commit('saveQuoteError', e.response.data)
  }
}

export const saveQuoteSegment = async (
  { commit },
  { quoteId, segmentId, from, to, date }
) => {
  commit('saveQuoteSegmentLoading')
  try {
    const response = await api.post(
      '/quotes/' + quoteId + '/segments' + (segmentId ? '/' + segmentId : ''),
      {
        from,
        to,
        date: moment(date).format('YYYY-MM-DD HH:mm:ss')
      }
    )
    commit('saveQuoteSegmentSuccess', response.data.data)
  } catch (e) {
    commit('saveQuoteSegmentError', e.response.data)
  }
}

export const removeQuoteSegment = async (
  { commit },
  { quoteId, segmentId }
) => {
  commit('removeQuoteSegmentLoading')
  try {
    await api.delete('/quotes/' + quoteId + '/segments/' + segmentId)
    commit('removeQuoteSegmentSuccess', { quoteId, segmentId })
  } catch (e) {
    commit('removeQuoteSegmentError', e.response.data)
  }
}

export const saveQuoteOption = async (
  { commit },
  { quoteId, optionId, name, description }
) => {
  commit('saveQuoteOptionLoading')
  try {
    const response = await api.post(
      '/quotes/' + quoteId + '/options' + (optionId ? '/' + optionId : ''),
      {
        name,
        description
      }
    )
    commit('saveQuoteOptionSuccess', response.data.data)
  } catch (e) {
    commit('saveQuoteOptionError', e.response.data)
  }
}

export const removeQuoteOption = async ({ commit }, { quoteId, optionId }) => {
  commit('removeQuoteOptionLoading')
  try {
    await api.delete('/quotes/' + quoteId + '/options/' + optionId)
    commit('removeQuoteOptionSuccess', { quoteId, optionId })
  } catch (e) {
    commit('removeQuoteOptionError', e.response.data)
  }
}

export const removeQuote = async ({ commit }, { id }) => {
  commit('removeQuoteLoading')
  try {
    await api.delete('/quotes/' + id)
    commit('removeQuoteSuccess', id)
  } catch (e) {
    console.log(e)
    commit('removeQuoteError', e.response.data)
  }
}

export const saveQuoteAircraft = async (
  { commit },
  { quoteId, aircraftId }
) => {
  commit('saveQuoteAircraftLoading')
  try {
    const response = await api.post(
      '/quotes/' + quoteId + '/aircrafts' + '/' + aircraftId
    )
    commit('saveQuoteAircraftSuccess', response.data.data)
  } catch (e) {
    commit('saveQuoteAircraftError', e.response.data)
  }
}

export const removeQuoteAircraft = async (
  { commit },
  { quoteId, aircraftId }
) => {
  commit('removeQuoteAircraftLoading')
  try {
    await api.delete('/quotes/' + quoteId + '/aircrafts/' + aircraftId)
    commit('removeQuoteAircraftSuccess', { quoteId, aircraftId })
  } catch (e) {
    commit('removeQuoteAircraftError', e.response.data)
  }
}

export const getMessages = async ({ commit }, { bookingId }) => {
  commit('getMessagesLoading')
  try {
    const response = await api.get('/bookings/' + bookingId + '/messages')
    commit('getMessagesSuccess', response.data.data)
  } catch (e) {
    commit('getMessagesError', e.response.data)
  }
}
export const newMessage = async ({ commit }, { bookingId, content }) => {
  commit('newMessageLoading')
  try {
    await api.post('/bookings/' + bookingId + '/messages', {
      content: content
    })
    commit('newMessageSuccess')
  } catch (e) {
    commit('newMessageError', e.response.data)
  }
}
export const appendMessage = async ({ commit }, { message }) => {
  commit('appendMessage', message)
}

export default {
  getList,
  destroy,
  get,
  getMessages,
  newMessage,
  appendMessage,
  saveQuote,
  removeQuote,
  saveQuoteSegment,
  removeQuoteSegment,
  saveQuoteOption,
  removeQuoteOption,
  getQuoteStatuses,
  saveQuoteAircraft,
  removeQuoteAircraft
}
