import OptionsList from '@/screens/Options/List'
import OptionsSave from '@/screens/Options/Save'

const routes = [
  {
    name: 'option-list',
    path: '/options',
    component: OptionsList
  },
  {
    name: 'optionsForm',
    path: '/options/save/:id?',
    component: OptionsSave
  }
]

export default routes
