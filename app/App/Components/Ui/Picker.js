import React, { Component } from 'react'
import { View } from 'react-native'
import Text from 'App/Components/AppText'
import Styles from './PickerStyle'
import Picker from 'App/Components/AppPicker'
import { PropTypes } from 'prop-types'
import { Metrics } from 'App/Theme'

class UiPicker extends Component {
  render() {
    const { textLabel, light, pickerItems, placeholder, style: propStyles, ...props } = this.props

    return (
      <View style={Metrics.smallVerticalMargin}>
        <Text light={light} bold i18n={textLabel} />
        <Picker
          style={[Styles.picker, propStyles]}
          light={light}
          pickerItems={pickerItems}
          placeholderI18n={placeholder}
          {...props}
        />
      </View>
    )
  }
}

UiPicker.propTypes = {
  textLabel: PropTypes.string,
  placeholder: PropTypes.string,
  light: PropTypes.bool,
  pickerItems: PropTypes.array,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
}

UiPicker.defaultProps = {}

export default UiPicker
