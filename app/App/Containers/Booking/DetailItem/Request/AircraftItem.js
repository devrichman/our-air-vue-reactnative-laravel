import React, { Component } from 'react'
import { Image, View } from 'react-native'
import { Text } from 'App/Components'
import { Metrics, Helpers, Fonts, Colors } from 'App/Theme'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Styles from '../ItemStyle'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

class AircraftItem extends Component {
  render() {
    const {
      type,
      amenities,
      assets,
      cruise_speed_knots: cruiseSpeedKnots,
      max_pax: maxPax,
    } = this.props.aircraft
    return (
      <View style={[Helpers.fill, Helpers.row, Metrics.tinyVerticalMargin, Styles.mainContainer]}>
        <View style={[Metrics.tinyHorizontalPadding, Metrics.tinyVerticalPadding]}>
          <Image
            style={Styles.categoryImage}
            source={{
              uri: assets[0].full_path,
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
                <Text bold light i18n={type} style={[Fonts.style.title, Fonts.style.medium]} />
              </View>
            </View>
            <View style={[Helpers.row, Helpers.horizontalMargin]}>
              <Text light i18n={amenities} />
            </View>
            <View style={[Helpers.row, Helpers.mainSpaceBetween, Helpers.horizontalMargin]}>
              <View style={[Helpers.row, Helpers.crossCenter]}>
                <Icon name="seat" size={20} color={Colors.white} />
                <Text light i18n={maxPax.toString()} style={Metrics.tinyHorizontalPadding} />
              </View>
              <View style={[Helpers.row, Helpers.crossCenter]}>
                <Icon name="speedometer" size={20} color={Colors.white} />
                <Text
                  light
                  i18n={cruiseSpeedKnots.toString()}
                  style={Metrics.tinyHorizontalPadding}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

AircraftItem.propTypes = {
  aircraft: PropTypes.object,
}

const mapDispatchToProps = (dispatch) => ({})
const mapStateToProps = (state) => ({})
export default connect(mapStateToProps, mapDispatchToProps)(AircraftItem)
