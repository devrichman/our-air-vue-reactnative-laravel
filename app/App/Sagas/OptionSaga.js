import { put, call } from 'redux-saga/effects'
import OptionActions from 'App/Stores/Option/Actions'
import { OptionService } from 'App/Services/Api'

export function* getOptions({ category }) {
  // @todo use category to get only options from given cateogry (flight, car, etc.)
  const response = yield call(OptionService.getOptions)

  if (response.ok === true) {
    return yield put(OptionActions.getOptionsSuccess(response.data.data))
  }

  yield put(OptionActions.getOptionsError(response.data))
}

export function* addSelectedOption({ option }) {
  yield put(OptionActions.addSelectedOption(option))
}
