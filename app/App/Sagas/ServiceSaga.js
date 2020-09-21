import { put, call } from 'redux-saga/effects'
import ServiceActions from 'App/Stores/Service/Actions'
import CommonActions from 'App/Stores/Common/Actions'
import { ServiceService } from 'App/Services/Api'
import { parseErrors } from 'App/Services/ApiService'
/**
 * A saga can contain multiple functions.
 *
 * This example saga contains only one to fetch fake user informations.
 * Feel free to remove it.
 */
export function* listService() {
  const response = yield call(ServiceService.list)

  if (response.ok === true) {
    yield put(ServiceActions.listSuccess(response.data.data))
    return
  }

  // An error has occured
  yield put(ServiceActions.listFailure(response.data))
  yield put(CommonActions.runAlert(...Object.values(parseErrors(response))))
}
