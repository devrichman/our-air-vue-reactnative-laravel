import { put, call } from 'redux-saga/effects'
import ChatActions from 'App/Stores/Chat/Actions'
import { ChatService } from 'App/Services/Api'
/**
 * A saga can contain multiple functions.
 *
 * This example saga contains only one to fetch fake user informations.
 * Feel free to remove it.
 */
export function* getMessages({ bookingId }) {
  const response = yield call(ChatService.getMessages, bookingId)
  if (response.ok === true) {
    yield put(ChatActions.getMessagesSuccess(response.data.data))
  } else {
    yield put(ChatActions.getMessagesFail(response.data.message))
  }
}

export function* newMessage({ bookingId, content }) {
  const response = yield call(ChatService.newMessage, bookingId, content)
  // alert(JSON.stringify(response.data))
  if (response.ok === true) {
    yield put(ChatActions.newMessageSuccess(response.data.data))
  } else {
    yield put(ChatActions.newMessageFail(response.data.message))
  }
}
