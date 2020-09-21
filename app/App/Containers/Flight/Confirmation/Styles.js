import { StyleSheet } from 'react-native'
import { Colors } from 'App/Theme'
import { tiny } from 'App/Theme/Metrics'
const styles = StyleSheet.create({
  modalButton: {
    backgroundColor: Colors.grey,
  },
  modalTitle: {
    marginBottom: 20,
  },
  modalView: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: tiny,
    display: 'flex',
    marginTop: 100,
    paddingBottom: 10,
    paddingTop: 30,
  },
})

export default styles
