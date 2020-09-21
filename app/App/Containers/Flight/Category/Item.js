import React, { Component } from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import { Text } from 'App/Components'
import { Helpers, Metrics, Colors, Fonts } from 'App/Theme'
import Styles from './ItemStyle'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import BookingActions from 'App/Stores/Booking/Actions'

class Item extends Component {
  state = {
    selected: false,
  }

  toggleSelected() {
    if (this.props.selection === false) {
      return
    }

    const isSelected = this.state.selected === true
    if (isSelected) {
      this.setState({
        selected: false,
      })
      this.props.updateSelected(-1)
      this.props.removeCategory(this.props.category)
    } else {
      this.setState({
        selected: true,
      })
      this.props.updateSelected(1)
      this.props.addCategory(this.props.category)
    }
  }

  render() {
    const { assets } = this.props.category
    const { selected } = this.state

    return (
      <TouchableOpacity
        onPress={this.toggleSelected.bind(this)}
        style={(selected ? [Styles.selected] : [Styles.notSelected]).concat([
          Helpers.fill,
          Helpers.row,
          Metrics.tinyVerticalMargin,
          Styles.mainContainer,
        ])}
      >
        <View
          style={[
            Metrics.tinyHorizontalPadding,
            Metrics.tinyVerticalPadding,
            Helpers.mainSpaceBetween,
            Helpers.fill,
          ]}
        >
          <View>
            <View style={[Helpers.fill, Helpers.row]}>
              <View style={[Metrics.tinyHorizontalPadding, Metrics.tinyVerticalPadding]}>
                {assets[0] !== undefined && (
                  <Image
                    style={Styles.categoryImage}
                    source={{
                      uri: assets[0].full_path,
                    }}
                  />
                )}
              </View>
              <View style={[Helpers.column, Metrics.horizontalPadding]}>
                <View style={{}}>
                  <Text
                    bold
                    light
                    i18n="booking.your_flight"
                    style={[Fonts.style.title, Fonts.style.medium]}
                  />
                </View>
                <View>
                  <Text bold light i18n={this.props.category.name} style={Fonts.style.medium} />
                </View>

                <View style={Metrics.tinyVerticalMargin}>
                  <View style={Helpers.row}>
                    <Icon name="seat-recline-extra" size={20} color={Colors.white} />
                    <Text
                      light
                      i18n={(
                        this.props.booking.segments[0].pax +
                        (this.props.booking.segments[1] !== undefined
                          ? this.props.booking.segments[1].pax
                          : 0)
                      ).toString()}
                      style={Metrics.tinyHorizontalPadding}
                    />
                  </View>
                  <View style={Helpers.row}>
                    <Icon name="speedometer" size={20} color={Colors.white} />
                    <Text
                      light
                      i18n={this.props.category.average_speed.toString()}
                      style={Metrics.tinyHorizontalPadding}
                    />
                  </View>
                </View>
              </View>
              {selected ? (
                <View style={[Helpers.fill, Helpers.crossEnd, Metrics.tinyHorizontalPadding]}>
                  <View style={[Styles.whiteCircle, Helpers.center]}>
                    <Icon name="check" size={15} />
                  </View>
                </View>
              ) : null}
            </View>
          </View>
          <View style={[Helpers.fill, Helpers.row, Metrics.verticalPadding, Styles.details]}>
            <View style={[Helpers.column, Helpers.fill, Helpers.center]}>
              <View>
                <Icon name="ray-start-arrow" size={30} color={Colors.white} />
              </View>
              <View>
                <Icon name="clock-out" size={30} color={Colors.white} />
              </View>
              <View>
                <Icon name="cash-multiple" size={30} color={Colors.white} />
              </View>
            </View>
            <View style={[Helpers.column, Helpers.fill]}>
              <View>
                <Text
                  light
                  i18n="booking.your_flight_length"
                  i18nValue={this.props.category.distance.toString()}
                  style={Styles.detailItem}
                />
              </View>
              <View>
                <Text
                  light
                  i18n="booking.your_flight_time"
                  i18nValue={this.props.category.duration.toString()}
                  style={Styles.detailItem}
                />
              </View>
              <View>
                <Text
                  light
                  i18n="booking.your_flight_price"
                  i18nValue={this.props.category.segment_price.toString()}
                  style={Styles.detailItem}
                />
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

Item.propTypes = {
  category: PropTypes.object,
  addCategory: PropTypes.func,
  removeCategory: PropTypes.func,
  selection: PropTypes.bool,
  booking: PropTypes.object,
  updateSelected: PropTypes.func,
}

Item.defaultProps = {
  selection: true,
}

const mapStateToProps = (state) => ({
  booking: state.booking.current.flight,
})

const mapDispatchToProps = (dispatch) => ({
  addCategory: (category) => dispatch(BookingActions.addCategory('flight', category)),
  removeCategory: (category) => dispatch(BookingActions.removeCategory('flight', category)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Item)
