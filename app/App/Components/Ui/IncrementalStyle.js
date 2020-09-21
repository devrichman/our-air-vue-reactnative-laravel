import { StyleSheet } from 'react-native'
import { Colors } from 'App/Theme'
import { tiny } from 'App/Theme/Metrics'

const styles = StyleSheet.create({
  buttonSize: {
    flex: 1,
  },
  counter: {
    borderColor: Colors.secondary,
    borderRadius: tiny,
    borderWidth: 2,
    color: Colors.white,
    fontSize: 20,
    height: 40,
    padding: 0,
    textAlign: 'center',
    width: 40,
  },
  operand: {
    backgroundColor: Colors.secondary,
    borderRadius: tiny,
  },
  textSize: {
    flex: 2,
  },
})
export default styles
