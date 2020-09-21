import { StyleSheet } from 'react-native'
import { Colors } from 'App/Theme'
import { tiny } from 'App/Theme/Metrics'

const styles = StyleSheet.create({
  ListView: {
    marginTop: 10,
  },
  categoryImage: {
    borderRadius: tiny,
    height: 100,
    width: 100,
  },
  horizontalPadding: {
    paddingLeft: 2,
    paddingRight: 2,
  },
  item: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemRow: {
    borderBottomColor: Colors.border,
    borderBottomWidth: 1,
  },

  mainContainer: {
    borderRadius: tiny,
  },
})

export default styles
