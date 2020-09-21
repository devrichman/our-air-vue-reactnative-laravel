import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  newMessage: ['bookingId', 'content'],
  newMessageSuccess: ['payload'],
  newMessageFail: ['error'],
  appendMessage: ['message'],

  getMessages: ['bookingId'],
  getMessagesSuccess: ['messages'],
  getMessagesFail: ['error'],
})

export const ChatTypes = Types
export default Creators
