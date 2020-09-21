import { StyleSheet } from 'react-native'
import { Colors } from 'App/Theme'
import { tiny } from 'App/Theme/Metrics'
const styles = StyleSheet.create({
  ListView: {
    marginTop: 10,
  },
  bottomMargin: {
    marginBottom: 50,
  },
  iconPlace: {
    display: 'flex',
    justifyContent: 'center',
  },
  mainContainer: {
    borderRadius: tiny,
  },
  notSelected: {
    backgroundColor: Colors.mainTransparent,
  },
})

export default styles
