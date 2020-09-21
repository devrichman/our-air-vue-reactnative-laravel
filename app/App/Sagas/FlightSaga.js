import { put, call } from 'redux-saga/effects'
import { FlightService } from 'App/Services/Api/FlightService'
import NavigationService from 'App/Services/NavigationService'
import FlightActions from 'App/Stores/Flight/Actions'
import CommonActions from 'App/Stores/Common/Actions'
import { parseErrors } from 'App/Services/ApiService'
import SettingsActions from 'App/Stores/Settings/Actions'

export function* searchAirports({ text }) {
  const response = yield call(FlightService.searchAirports, text)

  if (response.ok === true) {
    yield put(FlightActions.listAirportsSuccess(response.data.data))
    return
  }

  // An error has occured
  yield put(FlightActions.listAirportsFailures(response.data))
  yield put(CommonActions.runAlert(...Object.values(parseErrors(response))))
}

export function* search({ segments = null }) {
  const response = yield call(FlightService.getCategories, segments)
  if (response.ok === true) {
    yield put(FlightActions.searchSuccess(response.data.data))
    yield put(SettingsActions.setPreviousPage('FlightCategories'))
    NavigationService.navigate('FlightCategories')
    return
  }

  // An error has occured
  yield put(FlightActions.listAirportsFailures(response.data))
  yield put(CommonActions.runAlert(...Object.values(parseErrors(response))))
}
