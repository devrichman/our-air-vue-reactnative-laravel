import { createAppContainer, createStackNavigator } from 'react-navigation'
import SplashScreen from 'App/Containers/SplashScreen/SplashScreen'
import DrawerNavigator from './DrawerNavigator'

const AppNavigator = createStackNavigator(
  {
    SplashScreen: SplashScreen,
    DrawerNavigator: { screen: DrawerNavigator, path: 'drawer' },
  },
  {
    initialRouteName: 'SplashScreen',
    headerMode: 'none',
  }
)

export default createAppContainer(AppNavigator)
