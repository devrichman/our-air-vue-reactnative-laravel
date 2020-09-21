import { StyleSheet } from 'react-native'
import { Colors } from 'App/Theme'

const styles = StyleSheet.create({
  backButton: {
    marginRight: 20,
  },
  bottom: {
    marginBottom: 20,
    paddingBottom: 10,
  },
  fillButton: {
    flex: 2,
  },
  fillText: {
    alignItems: 'center',
    flex: 8,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  forwardButton: {
    textAlign: 'right',
  },
  title: {
    fontSize: 25,
    width: 350,
  },
  whiteLine: {
    backgroundColor: Colors.white,
    height: 1,
    width: '25%',
  },
})

export default styles
