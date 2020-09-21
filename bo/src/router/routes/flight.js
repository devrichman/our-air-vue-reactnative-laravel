import FlightsCategoriesList from '@/screens/Flights/Categories/List'
import FlightsCategoriesSave from '@/screens/Flights/Categories/Save'

const routes = [
  {
    name: 'flights-categories-list',
    path: '/flights/categories',
    component: FlightsCategoriesList
  },
  {
    name: 'flights-categories-save',
    path: '/flights/categories/save/:id?',
    component: FlightsCategoriesSave
  }
]

export default routes
