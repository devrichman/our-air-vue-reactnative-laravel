import React, { Component } from 'react'
import { View, FlatList, TouchableOpacity } from 'react-native'
import { Text } from 'App/Components'
import { Helpers, Metrics } from 'App/Theme'
import Styles from './Styles'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import NavigationService from 'App/Services/NavigationService'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import ServiceIcon from 'App/Components/Service/Icon'
import BookingActions from 'App/Stores/Booking/Actions'
import SettingsActions from 'App/Stores/Settings/Actions'

class Item extends Component {
  selectBooking() {
    this.props.selectBooking(this.props.booking)
    this.props.setPreviousPage('BookingDetail')
    NavigationService.navigate('BookingDetail')
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this.selectBooking.bind(this)}
        style={[Styles.notSelected].concat([
          Helpers.fill,
          Helpers.row,
          Metrics.tinyVerticalMargin,
          Styles.mainContainer,
        ])}
      >
        <View
          style={[Metrics.tinyHorizontalPadding, Metrics.tinyVerticalPadding, Styles.iconPlace]}
        >
          <ServiceIcon code={this.props.booking.service.code} color={Colors.white} />
        </View>
        <View
          style={[
            Metrics.tinyHorizontalPadding,
            Metrics.tinyVerticalPadding,
            Helpers.mainSpaceBetween,
            Helpers.fill,
          ]}
        >
          <View>
            <View style={[Helpers.row, Helpers.horizontalMargin]}>
              <FlatList
                data={this.props.booking.request.segments}
                renderItem={({ item }) => (
                  <Text light uppercase>
                    {item.from.name} / {item.to.name} / {item.date}
                  </Text>
                )}
                keyExtractor={(item, index) => {
                  return item.from + item.to + index
                }}
              />
            </View>
            <View style={[Helpers.row, Helpers.horizontalMargin]}>
              <Text light bold>
                {this.props.booking.status.label}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

Item.propTypes = {
  booking: PropTypes.object,
  selectBooking: PropTypes.func,
  setPreviousPage: PropTypes.func,
}

const mapDispatchToProps = (dispatch) => ({
  setPreviousPage: (page) => dispatch(SettingsActions.setPreviousPage(page)),
  selectBooking: (booking) => dispatch(BookingActions.selectBooking(booking)),
})
const mapStateToProps = (state) => ({})
export default connect(mapStateToProps, mapDispatchToProps)(Item)
