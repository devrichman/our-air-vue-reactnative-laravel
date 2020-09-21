import { call, select, put } from 'redux-saga/effects'
import { getLines } from './LocaleSaga'
import { me } from './AuthSaga'
import { get } from './SettingsSaga'
import NavigationService from 'App/Services/NavigationService'
import LocaleActions from 'App/Stores/Locale/Actions'

export function* startup() {
  // Check if user is connected
  yield call(me)

  // Load application settings (mail, phone, ...)
  yield call(get)

  // Load translations
  const {
    locale,
    user: { user },
  } = yield select()
  const localeIso = user.id !== undefined ? user.locale.iso : locale.iso

  yield call(getLines, { locale: localeIso })
  yield put(LocaleActions.setLocale(localeIso))

  // Redirect to main page after 2.5s
  setTimeout(() => {
    NavigationService.navigateAndReset('DrawerNavigator')
  }, 2500)
}
