import { put, call } from 'redux-saga/effects'
import GenderActions from 'App/Stores/Gender/Actions'
import CommonActions from 'App/Stores/Common/Actions'
import { GenderService } from 'App/Services/Api'
import { parseErrors } from 'App/Services/ApiService'
/**
 * A saga can contain multiple functions.
 *
 * This example saga contains only one to fetch fake user informations.
 * Feel free to remove it.
 */
export function* getGenders() {
  const response = yield call(GenderService.getGenders)

  if (response.ok === true) {
    yield put(GenderActions.getGendersSuccess(response.data.data))
    return
  }

  // An error has occured
  yield put(GenderActions.getGendersFailure(response.data))
  yield put(CommonActions.runAlert(...Object.values(parseErrors(response))))
}
