import SettingsForm from '@/screens/Settings/Form'
import LocaleForm from '@/screens/Locale/Form'

const routes = [
  {
    name: 'settings',
    path: '/settings',
    component: SettingsForm
  },
  {
    name: 'locales',
    path: '/locales',
    component: LocaleForm
  }
]

export default routes
