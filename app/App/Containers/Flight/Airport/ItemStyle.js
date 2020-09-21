import { StyleSheet } from 'react-native'
import { Colors } from 'App/Theme'
import { tiny } from 'App/Theme/Metrics'
const styles = StyleSheet.create({
  airportImage: {
    borderRadius: tiny,
    height: 80,
    width: 80,
  },
  flagImage: {
    height: 20,
    width: 30,
  },
  mainContainer: {
    borderRadius: tiny,
  },
  searchBar: {
    borderBottomColor: Colors.grey,
    borderBottomWidth: 1,
    color: Colors.white,
    fontSize: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 20,
  },
})

export default styles
