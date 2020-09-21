import { StyleSheet } from 'react-native'
import { Colors } from 'App/Theme'
import { tiny } from 'App/Theme/Metrics'
const styles = StyleSheet.create({
  categoryImage: {
    borderRadius: tiny,
    height: 100,
    width: 100,
  },
  detailItem: {
    paddingVertical: 8,
  },
  details: {
    borderTopColor: Colors.border,
    borderTopWidth: 1,
  },
  greyLine: {
    backgroundColor: Colors.main,
  },
  mainContainer: {
    borderRadius: tiny,
  },
  notSelected: {
    backgroundColor: Colors.mainTransparent,
  },
  selected: {
    backgroundColor: `${Colors.button}`,
  },
  whiteCircle: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    height: 20,
    width: 20,
  },
  whiteLine: {
    backgroundColor: Colors.white,
  },
})

export default styles
