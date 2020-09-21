import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import Text from 'App/Components/AppText'
import { Helpers, Metrics, Colors } from 'App/Theme'
import Styles from './DrawerItemStyle'
import { PropTypes } from 'prop-types'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

class NavigatorDrawerItem extends Component {
  render() {
    return (
      <TouchableOpacity
        style={[
          Helpers.fill,
          Helpers.row,
          Helpers.crossCenter,
          Metrics.verticalPadding,
          Metrics.mediumHorizontalPadding,
          Styles.item,
        ]}
        onPress={this.props.onPress}
      >
        <Icon name={this.props.icon} size={15} color={Colors.text} />
        <Text style={Metrics.horizontalPadding}>{this.props.label}</Text>
      </TouchableOpacity>
    )
  }
}

NavigatorDrawerItem.propTypes = {
  onPress: PropTypes.func,
  label: PropTypes.string,
  icon: PropTypes.string,
}
export default NavigatorDrawerItem
