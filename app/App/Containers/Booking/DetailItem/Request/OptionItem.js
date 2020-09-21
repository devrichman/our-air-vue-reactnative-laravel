import React, { Component } from 'react'
import { View } from 'react-native'
import { Text } from 'App/Components'
import { Metrics, Helpers, Colors } from 'App/Theme'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Styles from '../ItemStyle'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

class OptionItem extends Component {
  render() {
    const { name, label, icon = 'room-service' } = this.props.option
    return (
      <View
        style={[
          Helpers.mainSpaceBetween,
          Helpers.row,
          Metrics.horizontalPadding,
          Styles.itemRow,
          Styles.item,
        ]}
      >
        <View style={Helpers.fill}>
          <Icon name={icon} size={40} color={Colors.white} style={Helpers.horizontalMargin} />
        </View>
        <View style={[Helpers.fill, Metrics.horizontalPadding, Metrics.verticalPadding]}>
          <Text light>{this.props.origin === 'quote' ? name : label}</Text>
        </View>
      </View>
    )
  }
}

OptionItem.propTypes = {
  option: PropTypes.object,
  origin: PropTypes.string,
}

const mapDispatchToProps = (dispatch) => ({})
const mapStateToProps = (state) => ({})
export default connect(mapStateToProps, mapDispatchToProps)(OptionItem)
