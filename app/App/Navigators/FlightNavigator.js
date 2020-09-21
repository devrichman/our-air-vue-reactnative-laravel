import { createAppContainer, createStackNavigator } from 'react-navigation'
import Search from 'App/Containers/Flight/Search.android.js'

const FlightNavigator = createStackNavigator({
  Search: Search,
})

export default createAppContainer(FlightNavigator)
