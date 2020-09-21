import Vue from 'vue'
import Vuex from 'vuex'

import common from './modules/common'
import auth from './modules/auth'
import settings from './modules/settings'
import locale from './modules/locale'
import options from './modules/options'
import services from './modules/services'
import bookings from './modules/bookings'
import users from './modules/users'
import flights from './modules/flights'
import airports from './modules/airports'
import contractors from './modules/contractors'
import aircrafts from './modules/aircrafts'
import genders from './modules/genders'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    common,
    auth,
    settings,
    locale,
    options,
    services,
    bookings,
    flights,
    users,
    airports,
    contractors,
    aircrafts,
    genders
  }
})

export default store
