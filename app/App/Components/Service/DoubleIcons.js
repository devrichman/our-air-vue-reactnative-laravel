import React, { Component } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { ApplicationStyles, Helpers, Colors, Fonts, Metrics } from 'App/Theme'
import { Text } from 'App/Components'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import PropTypes from 'prop-types'
import Styles from './DoubleIconsStyle'

class DoubleIcons extends Component {
  render() {
    const {
      icon1,
      icon2,
      iconSize,
      onPress1,
      onPress2,
      label1,
      label2,
      active1,
      active2,
    } = this.props

    return (
      <View style={[Helpers.fill, Helpers.row]}>
        <TouchableOpacity
          style={[Helpers.fill, Helpers.center, active1 ? '' : ApplicationStyles.reducedOpacity]}
          onPress={() => onPress1()}
        >
          <View style={Metrics.verticalPadding}>
            <Icon name={icon1} size={iconSize || 30} color={Colors.white} />
          </View>
          <Text
            style={{ color: Colors.secondary, fontSize: Fonts.size.medium }}
            center
            bold
            i18n={label1}
          />
        </TouchableOpacity>
        <View style={Helpers.center}>
          <View style={Styles.whiteLine} />
        </View>
        <TouchableOpacity
          style={[Helpers.fill, Helpers.center, active2 ? '' : ApplicationStyles.reducedOpacity]}
          onPress={() => onPress2()}
        >
          <View style={Metrics.verticalPadding}>
            <Icon name={icon2} size={iconSize || 30} color={Colors.white} />
          </View>
          <Text
            style={{ color: Colors.secondary, fontSize: Fonts.size.medium }}
            center
            bold
            i18n={label2}
          />
        </TouchableOpacity>
      </View>
    )
  }
}

DoubleIcons.propTypes = {
  icon1: PropTypes.string.isRequired,
  icon2: PropTypes.string.isRequired,
  onPress1: PropTypes.func.isRequired,
  onPress2: PropTypes.func.isRequired,
  label1: PropTypes.string,
  label2: PropTypes.string,
  iconSize: PropTypes.number,
  active1: PropTypes.bool,
  active2: PropTypes.bool,
}
export default DoubleIcons
