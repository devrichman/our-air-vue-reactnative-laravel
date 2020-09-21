import { StyleSheet, Platform } from 'react-native'
import { Colors } from 'App/Theme'

const styles = StyleSheet.create({
  textInput: {
    borderBottomColor: Colors.border,
    borderBottomWidth: 1,
    height: Platform.OS === 'ios' ? 40 : null,
  },
})

export default styles
