import AircraftsList from '@/screens/Aircrafts/List'
import AircraftsSave from '@/screens/Aircrafts/Save'

const routes = [
  {
    name: 'aircrafts-list',
    path: '/aircrafts',
    component: AircraftsList
  },
  {
    name: 'aircrafts-save',
    path: '/aircrafts/save/:id?',
    component: AircraftsSave
  }
]

export default routes
