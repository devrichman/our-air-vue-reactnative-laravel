import { StyleSheet } from 'react-native'
import { Colors } from 'App/Theme'

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  checkedCircle: {
    backgroundColor: Colors.success,
    borderRadius: 7,
    height: 14,
    width: 14,
  },
  circle: {
    alignItems: 'center',
    borderColor: Colors.white,
    borderRadius: 11,
    borderWidth: 2,
    height: 22,
    justifyContent: 'center',
    width: 22,
  },
  flagImage: {
    height: 20,
    width: 30,
  },
  titleView: {
    marginTop: 30,
  },
})

export default styles
