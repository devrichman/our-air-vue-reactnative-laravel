import Login from '@/screens/Auth/Login'

const routes = [
  {
    name: 'auth-login',
    path: '/login',
    component: Login,
    meta: { layout: 'empty', guest: true }
  }
]

export default routes
