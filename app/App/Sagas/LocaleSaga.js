import { put, call } from 'redux-saga/effects'
import LocaleActions from 'App/Stores/Locale/Actions'
import { LocaleService } from 'App/Services/Api'
/**
 * A saga can contain multiple functions.
 *
 * This example saga contains only one to fetch fake user informations.
 * Feel free to remove it.
 */
export function* getLines({ locale }) {
  const response = yield call(LocaleService.getLines, locale)

  if (response.ok === true) {
    yield put(LocaleActions.getLinesSuccess(response.data.data))
  }
}

export function* getLocales() {
  const response = yield call(LocaleService.getLocales)
  if (response.ok === true) {
    yield put(LocaleActions.getLocalesSuccess(response.data.data))
  }
}
