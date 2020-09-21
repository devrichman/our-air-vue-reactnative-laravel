import ClientsList from '@/screens/Clients/List'
import ClientsSave from '@/screens/Clients/Save'

const routes = [
  {
    name: 'client-list',
    path: '/clients',
    component: ClientsList
  },
  {
    name: 'clientsSave',
    path: '/clients/save/:id?',
    component: ClientsSave
  }
]

export default routes
