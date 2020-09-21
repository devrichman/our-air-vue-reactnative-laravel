import { put, call } from 'redux-saga/effects'
import SettingsActions from 'App/Stores/Settings/Actions'
import { SettingsService } from 'App/Services/Api'

export function* get() {
  const response = yield call(SettingsService.get)

  if (response.ok === true) {
    return yield put(SettingsActions.getSuccess(response.data.data))
  }

  // An error has occured
  yield put(SettingsActions.getFailure(response.data))
}
