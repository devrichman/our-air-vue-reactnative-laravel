import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TouchableOpacity, View } from 'react-native'
import Text from 'App/Components/AppText'
import { Helpers, Metrics, Colors } from 'App/Theme'
import Styles from './ItemStyle'
import { PropTypes } from 'prop-types'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

class DetailSubMenuItem extends Component {
  render() {
    return (
      <TouchableOpacity
        style={[
          Helpers.fill,
          Helpers.row,
          Helpers.crossCenter,
          Metrics.verticalPadding,
          Styles.itemRow,
          Styles.item,
        ]}
        onPress={this.props.onPress}
      >
        <View style={Styles.item}>
          <Icon name={this.props.lefticon} size={25} color={Colors.white} />
          <Text bold light style={Metrics.horizontalPadding} i18n={this.props.label}></Text>
          {this.props.booking.last_message && this.props.lefticon === 'message-text' ? (
            this.props.booking.last_message.is_admin ? (
              <Icon name="chat-alert" size={25} color={Colors.header} />
            ) : (
              <Text></Text>
            )
          ) : (
            <Text></Text>
          )}
        </View>
        <Icon name={this.props.righticon} size={25} color={Colors.white} />
      </TouchableOpacity>
    )
  }
}

DetailSubMenuItem.propTypes = {
  onPress: PropTypes.func,
  label: PropTypes.string,
  lefticon: PropTypes.string,
  righticon: PropTypes.string,
  booking: PropTypes.object,
}

const mapStateToProps = (state) => ({
  booking: state.booking.booking,
})
const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(DetailSubMenuItem)
