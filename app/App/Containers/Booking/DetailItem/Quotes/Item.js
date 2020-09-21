import React, { Component } from 'react'
import { View, TouchableOpacity, Image } from 'react-native'
import { Text } from 'App/Components'
import { Helpers, Metrics, Fonts } from 'App/Theme'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Styles from './ItemStyle'
import NavigationService from 'App/Services/NavigationService'
import BookingActions from 'App/Stores/Booking/Actions'
import SettingsActions from 'App/Stores/Settings/Actions'

class Item extends Component {
  onQuote() {
    this.props.selectQuote(this.props.quote)
    this.props.setPreviousPage('BookingDetailQuoteDetail')
    NavigationService.navigate('BookingDetailQuoteDetail')
  }
  render() {
    const { aircrafts, amount, currency } = this.props.quote
    const aircraft = aircrafts[0]

    return (
      <TouchableOpacity
        style={[
          Styles.notSelected,
          Helpers.fill,
          Helpers.row,
          Metrics.tinyVerticalMargin,
          Styles.mainContainer,
        ]}
        onPress={this.onQuote.bind(this)}
      >
        <View style={[Metrics.tinyHorizontalPadding, Metrics.tinyVerticalPadding]}>
          <Image
            style={Styles.categoryImage}
            source={{
              uri: aircraft.assets[0].full_path,
            }}
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
                  uppercase
                  light
                  i18n={aircraft.type}
                  style={[Fonts.style.title, Fonts.style.medium]}
                />
              </View>
            </View>
            <View style={[Helpers.row, Helpers.horizontalMargin]}>
              <Text light i18n={aircraft.category.name} />
            </View>
            <View style={[Helpers.row, Helpers.mainSpaceBetween, Helpers.horizontalMargin]}>
              <Text bold light i18n={amount + ' ' + currency} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

Item.propTypes = {
  quote: PropTypes.object,
  selectQuote: PropTypes.func,
  setPreviousPage: PropTypes.func,
}

const mapDispatchToProps = (dispatch) => ({
  selectQuote: (quote) => dispatch(BookingActions.selectQuote(quote)),
  setPreviousPage: (page) => dispatch(SettingsActions.setPreviousPage(page)),
})
const mapStateToProps = (state) => ({})
export default connect(mapStateToProps, mapDispatchToProps)(Item)
