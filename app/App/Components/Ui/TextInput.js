import React, { Component } from 'react'
import { View } from 'react-native'
import Text from 'App/Components/AppText'
import TextInput from 'App/Components/AppTextInput'
import Styles from './TextInputStyle'
import { PropTypes } from 'prop-types'
import { Metrics } from 'App/Theme'

class UiTextInput extends Component {
  render() {
    const {
      textLabel,
      light,
      secureTextEntry,
      placeholder,
      style: propStyles,
      ...props
    } = this.props

    return (
      <View style={Metrics.smallVerticalMargin}>
        <Text light={light} bold i18n={textLabel} />
        <TextInput
          style={[Styles.textInput, propStyles]}
          light={light}
          secureTextEntry={secureTextEntry}
          placeholderI18n={placeholder}
          {...props}
        />
      </View>
    )
  }
}

UiTextInput.propTypes = {
  textLabel: PropTypes.string,
  placeholder: PropTypes.string,
  light: PropTypes.bool,
  secureTextEntry: PropTypes.bool,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
}

UiTextInput.defaultProps = {}

export default UiTextInput
