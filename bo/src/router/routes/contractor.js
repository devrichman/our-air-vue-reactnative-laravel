import ContractorsList from '@/screens/Contractors/List'
import ContractorsSave from '@/screens/Contractors/Save'

const routes = [
  {
    name: 'contractor-list',
    path: '/contractors',
    component: ContractorsList
  },
  {
    name: 'contractorsSave',
    path: '/contractors/save/:id?',
    component: ContractorsSave
  }
]

export default routes
