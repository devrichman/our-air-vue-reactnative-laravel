import { createDrawerNavigator } from 'react-navigation'
import NavigatorDrawer from 'App/Components/Navigator/Drawer'
import TabNavigator from './TabNavigator'

export default createDrawerNavigator(
  {
    TabNavigator: {
      screen: TabNavigator,
      path: 'tab',
    },
  },
  {
    contentComponent: NavigatorDrawer,
    drawerPosition: 'right',
  }
)
