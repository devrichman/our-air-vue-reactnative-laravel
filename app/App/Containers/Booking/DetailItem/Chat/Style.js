import { StyleSheet } from 'react-native'
import { Colors } from 'App/Theme'
import { small } from 'App/Theme/Metrics'

const styles = StyleSheet.create({
  adminTitle: {
    color: Colors.main,
  },
  bottom: {
    marginBottom: 'auto',
  },
  chatItem: {
    backgroundColor: Colors.mainTransparent,
  },
  fillButton: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: small,
    paddingLeft: small,
  },
  fillText: {
    flex: 11,
  },
  userTitle: {
    color: Colors.secondary,
  },
})

export default styles
