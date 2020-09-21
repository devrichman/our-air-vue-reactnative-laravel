import BookingsList from '@/screens/Bookings/List'
import BookingsSave from '@/screens/Bookings/Save'

const routes = [
  {
    name: 'bookings',
    path: '/bookings',
    component: BookingsList
  },
  {
    name: 'booking-save',
    path: '/bookings/save/:id?',
    component: BookingsSave
  }
]

export default routes
