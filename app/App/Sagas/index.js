import { takeLatest, all } from 'redux-saga/effects'
import { ServiceTypes } from 'App/Stores/Service/Actions'
import { StartupTypes } from 'App/Stores/Startup/Actions'
import { LocaleTypes } from 'App/Stores/Locale/Actions'
import { UserTypes } from 'App/Stores/User/Actions'
import { OptionTypes } from 'App/Stores/Option/Actions'
import { FlightTypes } from 'App/Stores/Flight/Actions'
import { BookingTypes } from 'App/Stores/Booking/Actions'
import { ChatTypes } from 'App/Stores/Chat/Actions'
import { GenderTypes } from 'App/Stores/Gender/Actions'

import { listService } from './ServiceSaga'
import { startup } from './StartupSaga'
import {
  stepone,
  steptwo,
  login,
  logout,
  resetPassword,
  forgotPassword,
  updateUser,
  updateLanguageUser,
} from './AuthSaga'
import { searchAirports, search } from './FlightSaga'
import { getLines, getLocales } from './LocaleSaga'
import { getOptions } from './OptionSaga'
import { getBookings, save, sign, payment } from './BookingSaga'
import { newMessage, getMessages } from './ChatSaga'
import { getGenders } from './GenderSaga'

export default function* root() {
  yield all([
    takeLatest(StartupTypes.STARTUP, startup),

    takeLatest(ServiceTypes.LIST, listService),

    takeLatest(UserTypes.STEPONE, stepone),
    takeLatest(UserTypes.STEPTWO, steptwo),
    takeLatest(UserTypes.LOGIN, login),
    takeLatest(UserTypes.LOGOUT, logout),
    takeLatest(UserTypes.RESET_PASSWORD, resetPassword),
    takeLatest(UserTypes.RESET_PASSWORD_EMAIL, forgotPassword),
    takeLatest(UserTypes.UPDATE, updateUser),
    takeLatest(UserTypes.UPDATE_LANGUAGE, updateLanguageUser),

    takeLatest(OptionTypes.GET_OPTIONS, getOptions),

    takeLatest(FlightTypes.SEARCH_AIRPORTS, searchAirports),
    takeLatest(FlightTypes.SEARCH, search),

    takeLatest(LocaleTypes.GET_LINES, getLines),
    takeLatest(LocaleTypes.GET_LOCALES, getLocales),

    takeLatest(BookingTypes.GET_BOOKINGS, getBookings),
    takeLatest(BookingTypes.SAVE, save),

    takeLatest(ChatTypes.NEW_MESSAGE, newMessage),
    takeLatest(ChatTypes.GET_MESSAGES, getMessages),

    takeLatest(BookingTypes.SIGN, sign),
    takeLatest(BookingTypes.PAYMENT, payment),

    takeLatest(GenderTypes.GET_GENDERS, getGenders),
  ])
}
