import { StyleSheet } from 'react-native'
import { Colors } from 'App/Theme'

const styles = StyleSheet.create({
  button: {
    backgroundColor: `${Colors.buttonGrey}66`,
    borderRadius: 30,
    color: Colors.buttonText,
    paddingVertical: 20,
  },
  buttonText: {
    color: Colors.buttonText,
    textTransform: 'uppercase',
  },
  link: {
    backgroundColor: Colors.transparent,
    paddingVertical: 5,
  },
  linkText: {
    color: Colors.buttonLinkText,
    textDecorationLine: 'underline',
    textTransform: 'lowercase',
  },
  secondary: {
    backgroundColor: Colors.buttonSecondary,
  },
  secondaryText: {
    color: Colors.buttonSecondaryText,
  },
})

export default styles
