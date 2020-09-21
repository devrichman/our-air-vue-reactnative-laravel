/**
 * This file defines the base application styles.
 *
 * Use it to define generic component styles (e.g. the default text styles, default button styles...).
 */
import Helpers from './Helpers'
import Colors from './Colors'
import { tiny } from 'App/Theme/Metrics'

export default {
  text: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
  },
  textBold: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
  },
  textDark: {
    color: Colors.text,
  },
  textLight: {
    color: Colors.textLight,
  },
  textSecondary: {
    color: Colors.secondary,
  },
  container: {
    ...Helpers.fill,
    ...Helpers.mainCenter,
  },
  input: {
    marginHorizontal: 5,
    marginVertical: 5,
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.border,
    paddingHorizontal: 10,
  },
  numberInput: {
    padding: 0,
    paddingHorizontal: 5,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  mediumInput: {
    fontSize: 25,
  },
  largeInput: {
    fontSize: 35,
  },
  darkBackground: {
    backgroundColor: `${Colors.main}66`,
    borderRadius: tiny,
  },
  background: {
    backgroundColor: Colors.background,
  },
  backgroundMain: {
    backgroundColor: Colors.main,
  },
  layout: {
    backgroundColor: Colors.background,
  },
  button: {
    success: {
      borderRadius: 5,
      paddingVertical: 12,
      backgroundColor: Colors.main,
    },
    secondary: {
      paddingVertical: 12,
      backgroundColor: Colors.white,
    },
  },
  buttonText: {
    success: {
      color: Colors.white,
      textTransform: 'uppercase',
    },
    secondary: {
      color: Colors.text,
      textTransform: 'lowercase',
      textDecorationLine: 'underline',
    },
  },
  screen: {
    container: {
      flex: 1,
    },
  },
  modalBackground: {
    backgroundColor: Colors.modalBackground,
  },
  modalDatePicker: {
    backgroundColor: Colors.white,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.white,
  },
  reducedOpacity: {
    opacity: 0.4,
  },
}
