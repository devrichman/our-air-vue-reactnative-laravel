import React, { Component } from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import { Text } from 'App/Components'
import { Helpers, Metrics, Colors, Fonts } from 'App/Theme'
import Styles from './ItemStyle'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Config } from 'App/Config'
import NavigationService from 'App/Services/NavigationService'
import BookingActions from 'App/Stores/Booking/Actions'

class Item extends Component {
  selectAirport() {
    this.props.setSegmentValue(
      this.props.airportTarget.target,
      { id: this.props.airport.id, label: this.props.airport.name },
      this.props.airportTarget.index
    )
    NavigationService.navigate('Flight')
  }
  render() {
    return (
      <TouchableOpacity
        onPress={this.selectAirport.bind(this)}
        style={[Styles.notSelected].concat([
          Helpers.fill,
          Helpers.row,
          Metrics.tinyVerticalMargin,
          Styles.mainContainer,
        ])}
      >
        <View style={[Metrics.tinyHorizontalPadding, Metrics.tinyVerticalPadding]}>
          <Icon
            name={
              this.props.airportTarget.target === 'from' ? 'airplane-takeoff' : 'airplane-landing'
            }
            size={50}
            color={Colors.white}
          />
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
            <View style={[Helpers.fill, Helpers.row, Helpers.crossCenter]}>
              <View style={Helpers.row}>
                <Text
                  bold
                  light
                  i18n={this.props.airport.name}
                  style={[Fonts.style.title, Fonts.style.medium]}
                />
              </View>
            </View>
            <View style={[Helpers.row, Helpers.horizontalMargin]}>
              <Image
                style={Styles.flagImage}
                source={{
                  uri:
                    Config.API_URL +
                    '/assets/images/flag/' +
                    this.props.airport.iso_country.toLowerCase() +
                    '.png',
                }}
              />
              <Text light> {this.props.airport.municipality.toUpperCase()}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

Item.propTypes = {
  airport: PropTypes.object,
  airportTarget: PropTypes.object,
  setSegmentValue: PropTypes.func,
}

const mapDispatchToProps = (dispatch) => ({
  setSegmentValue: (key, value, index) =>
    dispatch(BookingActions.setSegmentValue('flight', key, value, index)),
})
const mapStateToProps = (state) => ({})
export default connect(mapStateToProps, mapDispatchToProps)(Item)
