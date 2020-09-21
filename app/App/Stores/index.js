import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from 'App/Sagas'
import { reducer as ServiceReducer } from './Service/Reducers'
import { reducer as CommonReducer } from './Common/Reducers'
import { reducer as UserReducer } from './User/Reducers'
import { reducer as FlightReducer } from './Flight/Reducers'
import { reducer as SettingsReducer } from './Settings/Reducers'
import { reducer as LocaleReducer } from './Locale/Reducers'
import { reducer as OptionReducer } from './Option/Reducers'
import { reducer as BookingReducer } from './Booking/Reducers'
import { reducer as ChatReducer } from './Chat/Reducers'
import { reducer as GenderReducer } from './Gender/Reducers'

export default () => {
  const rootReducer = combineReducers({
    service: ServiceReducer,
    common: CommonReducer,
    user: UserReducer,
    flight: FlightReducer,
    settings: SettingsReducer,
    locale: LocaleReducer,
    option: OptionReducer,
    booking: BookingReducer,
    chat: ChatReducer,
    gender: GenderReducer,
  })

  return configureStore(rootReducer, rootSaga)
}
