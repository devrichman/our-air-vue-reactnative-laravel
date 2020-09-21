import { put, call, select } from 'redux-saga/effects'
import { getLines } from './LocaleSaga'
import UserActions from 'App/Stores/User/Actions'
import CommonActions from 'App/Stores/Common/Actions'
import LocaleActions from 'App/Stores/Locale/Actions'
import BookingsActions from 'App/Stores/Booking/Actions'
import { UserService } from 'App/Services/Api'
import { parseErrors } from 'App/Services/ApiService'
import NavigationService from 'App/Services/NavigationService'

/**
 * A saga can contain multiple functions.
 *
 * This example saga contains only one to fetch fake user informations.
 * Feel free to remove it.
 */
// Register Step One
export function* stepone({ user }) {
  const response = yield call(UserService.stepone, user)
  if (response.ok === true) {
    yield put(UserActions.steponeSuccess(response.data.data))
    NavigationService.navigate('StepTwo')
    return
  }

  // An error has occured
  yield put(UserActions.steponeFailure(response.data))
  yield put(CommonActions.runAlert(...Object.values(parseErrors(response))))
}
// Register Step Two
export function* steptwo({ user }) {
  const response = yield call(UserService.steptwo, user)
  const state = yield select()
  if (response.ok === true) {
    yield put(UserActions.steptwoSuccess(response.data.data))
    if (state.booking.confirmation) {
      return NavigationService.navigate('ConfirmationSummary')
    } else {
      return NavigationService.navigateAndReset('DrawerNavigator')
    }
  }

  // An error has occured
  yield put(UserActions.steptwoFailure(response.data))
  yield put(CommonActions.runAlert(...Object.values(parseErrors(response))))
}

export function* login({ user }) {
  const response = yield call(UserService.login, user)
  const state = yield select()

  if (response.ok === true) {
    if (response.data.data.status !== 'completed') {
      yield put(UserActions.loginPending(response.data.data))
      NavigationService.navigate('StepTwo')
      return
    } else {
      yield call(getLines, { locale: response.data.data.locale.iso })
      yield put(LocaleActions.setLocale(response.data.data.locale.iso))
      yield put(UserActions.loginSuccess(response.data.data))
    }
    if (state.booking.confirmation) {
      return NavigationService.navigate('ConfirmationSummary')
    } else {
      return NavigationService.navigateAndReset('DrawerNavigator')
    }
  }

  // An error has occured
  yield put(UserActions.loginFailure(response.data))
  yield put(CommonActions.runAlert(...Object.values(parseErrors(response))))
}

export function* logout() {
  const response = yield call(UserService.logout)

  if (response.ok === true) {
    yield put(UserActions.logoutSuccess())
    yield put(BookingsActions.resetAll())
    NavigationService.navigate('Services')
    return
  }

  yield put(UserActions.logoutFailure(response.data))
  yield put(CommonActions.runAlert(...Object.values(parseErrors(response))))
}

export function* me() {
  const response = yield call(UserService.me)
  if (response.ok === true) {
    if (response.data.data.status !== 'completed') {
      logout()
      return
    }
    return yield put(UserActions.meSuccess(response.data.data))
  }

  // An error has occured
  yield put(UserActions.meError(response.data))
}

export function* resetPassword({ payload }) {
  const response = yield call(UserService.resetPassword, { ...payload })

  if (response.ok === true) {
    return yield put(UserActions.resetPasswordSuccess(response.data))
  }

  // An error has occured
  yield put(UserActions.resetPasswordFailure(response.data))
  yield put(CommonActions.runAlert(...Object.values(parseErrors(response))))
}

export function* forgotPassword({ email }) {
  const response = yield call(UserService.forgotPasswordEmail, email)

  if (response.ok === true) {
    return yield put(UserActions.resetPasswordEmailSuccess(response.data))
  }

  // An error has occured
  yield put(UserActions.resetPasswordEmailFailure(response.data))
  yield put(CommonActions.runAlert(...Object.values(parseErrors(response))))
}

export function* updateUser(user) {
  const response = yield call(UserService.updateUser, user)

  if (response.ok === true) {
    yield put(UserActions.updateSuccess(response.data.data))
    return NavigationService.navigate('Services')
  }

  // An error has occured
  yield put(UserActions.updateFailure(response.data))
  yield put(CommonActions.runAlert(...Object.values(parseErrors(response))))
}

export function* updateLanguageUser(user) {
  const response = yield call(UserService.updateLanguageUser, user)

  if (response.ok === true) {
    return yield put(UserActions.updateLanguageSuccess(response.data.data))
  }

  // An error has occured
  yield put(UserActions.updateLanguageFailure(response.data))
  yield put(CommonActions.runAlert(...Object.values(parseErrors(response))))
}
