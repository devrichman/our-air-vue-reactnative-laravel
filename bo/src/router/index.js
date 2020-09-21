import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

Vue.use(Router)

import bookingRoutes from './routes/booking'
import optionRoutes from './routes/option'
import clientRoutes from './routes/client'
import contractorRoutes from './routes/contractor'
import aircraftRoutes from './routes/aircraft'
import flightRoutes from './routes/flight'
import userRoutes from './routes/user'
import miscRoutes from './routes/misc'

import Home from '@/screens/Home'
import PageNotFound from '@/screens/PageNotFound'

const router = new Router({
  mode: 'history',
  routes: [
    {
      name: 'home',
      path: '/',
      alias: '/home',
      component: Home
    },
    ...bookingRoutes,
    ...optionRoutes,
    ...clientRoutes,
    ...contractorRoutes,
    ...aircraftRoutes,
    ...flightRoutes,
    ...userRoutes,
    ...miscRoutes,
    { path: '*', component: PageNotFound }
  ]
})

router.beforeEach(async (to, from, next) => {
  store.dispatch('common/setGlobalLoading', true)
  await store.dispatch('auth/me')

  if (store.getters['auth/isLoggedIn']) {
    // load quote statuses if not loaded
    if (!store.getters['quoteStatuses']) {
      await store.dispatch('bookings/getQuoteStatuses')
    }
  }

  if (to.meta.guest !== true) {
    if (!store.getters['auth/isLoggedIn']) {
      return next({ name: 'auth-login' })
    }
  } else {
    if (store.getters['auth/isLoggedIn']) {
      return next('home')
    }
  }

  return next()
})

router.afterEach(() => {
  store.dispatch('common/setBooting', false)
  store.dispatch('common/setGlobalLoading', false)
})

export default router
