import React, { Component } from 'react'
import { View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Colors, Helpers, Metrics } from 'App/Theme'
import { Text } from 'App/Components'
import PropTypes from 'prop-types'

class Item extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { icon, info, bold } = this.props
    return (
      <View style={[Helpers.row, Helpers.crossCenter, Metrics.smallVerticalMargin]}>
        <Icon name={icon} size={30} color={Colors.grey} />
        <Text light bold={bold} i18n={info} style={Metrics.smallHorizontalMargin} />
      </View>
    )
  }
}
Item.propTypes = {
  icon: PropTypes.string,
  bold: PropTypes.bool,
  info: PropTypes.string,
}

export default Item
