import { StyleSheet } from 'react-native'
import { Colors } from 'App/Theme'

export default StyleSheet.create({
  borderBottom: {
    borderBottomWidth: 0.5,
    borderColor: Colors.grey,
    width: '100%',
  },
  borderTop: {
    borderColor: Colors.grey,
    borderTopWidth: 0.5,
    width: '100%',
  },
  title: {
    color: Colors.secondary,
  },
})
