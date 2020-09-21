import { put, call } from 'redux-saga/effects'
import { BookingService } from 'App/Services/Api/BookingService'
import NavigationService from 'App/Services/NavigationService'
import BookingActions from 'App/Stores/Booking/Actions'
import CommonActions from 'App/Stores/Common/Actions'
import { parseErrors } from 'App/Services/ApiService'

export function* getBookings({ userId, page }) {
  const response = yield call(BookingService.getBookings, userId, page)
  if (response.ok === true) {
    yield put(BookingActions.bookingsSuccess(response.data))
    return
  }

  // An error has occured
  yield put(BookingActions.bookingsError(response.data))
  yield put(CommonActions.runAlert(...Object.values(parseErrors(response))))
}

export function* save({ booking }) {
  const response = yield call(BookingService.save, booking)
  if (response.ok === true) {
    yield put(BookingActions.saveSuccess(response.data.data))
    yield put(BookingActions.resetCurrent())
    NavigationService.navigate('BookingCheck')
    return
  }

  // An error has occured
  yield put(BookingActions.saveError(response.data))
  yield put(CommonActions.runAlert(...Object.values(parseErrors(response))))
}

export function* sign({ quoteId }) {
  const response = yield call(BookingService.sign, quoteId)
  if (response.ok === true) {
    yield put(BookingActions.signSuccess(response.data.iframe_link, quoteId))
    NavigationService.navigate('BookingSign')
    return
  }

  // An error has occured
  yield put(BookingActions.signError(response.data))
  yield put(CommonActions.runAlert(...Object.values(parseErrors(response))))
}

export function* payment({ quoteId }) {
  const response = yield call(BookingService.payment, quoteId)
  if (response.ok === true) {
    yield put(BookingActions.paymentSuccess(response.data))
    NavigationService.navigate('BookingPay')
    return
  }

  // An error has occured
  yield put(BookingActions.paymentError(response.data))
  yield put(CommonActions.runAlert(...Object.values(parseErrors(response))))
}
