import { StyleSheet } from 'react-native'
import { Colors } from 'App/Theme'
import { tiny } from 'App/Theme/Metrics'
const styles = StyleSheet.create({
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
  notSelected: {
    backgroundColor: Colors.buttonGreyLight,
  },
  operand: {
    backgroundColor: Colors.secondary,
    borderRadius: tiny,
  },
  optionContainer: {
    borderRadius: tiny,
    height: 50,
  },
  selected: {
    backgroundColor: `${Colors.button}`,
  },
  whiteCircle: {
    backgroundColor: Colors.white,
    borderRadius: 10,
  },
})

export default styles
