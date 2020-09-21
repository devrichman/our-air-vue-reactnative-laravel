import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { ChatTypes } from './Actions'

export const newMessage = (state) => ({
  ...state,
  newMessageLoading: true,
  newMessageError: null,
})

export const newMessageSuccess = (state) => ({
  ...state,
  newMessageLoading: false,
  newMessageError: null,
})

export const newMessageFail = (state, { error }) => ({
  ...state,
  newMessageLoading: false,
  newMessageError: error,
})

export const appendMessage = (state, { message }) => ({
  ...state,
  messages: state.messages.length > 0 ? [message].concat(state.messages) : [message],
})

export const getMessages = (state) => ({
  ...state,
  getMessagesLoading: true,
  getMessagesError: null,
})
export const getMessagesSuccess = (state, { messages }) => ({
  ...state,
  messages: messages,
  getMessagesLoading: false,
  getMessagesError: null,
})

export const getMessagesFail = (state, { error }) => ({
  ...state,
  getMessagesLoading: false,
  getMessagesError: error,
})

export const reducer = createReducer(INITIAL_STATE, {
  [ChatTypes.NEW_MESSAGE]: newMessage,
  [ChatTypes.NEW_MESSAGE_SUCCESS]: newMessageSuccess,
  [ChatTypes.NEW_MESSAGE_FAIL]: newMessageFail,
  [ChatTypes.APPEND_MESSAGE]: appendMessage,
  [ChatTypes.GET_MESSAGES]: getMessages,
  [ChatTypes.GET_MESSAGES_SUCCESS]: getMessagesSuccess,
  [ChatTypes.GET_MESSAGES_FAIL]: getMessagesFail,
})
