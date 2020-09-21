import React, { Component } from 'react'
import { View, Dimensions } from 'react-native'
import Image from 'App/Components/ScalableImage'
import { Helpers, Metrics, Images } from 'App/Theme'
import PropTypes from 'prop-types'

class LogoHeader extends Component {
  render() {
    const { light } = this.props
    return (
      <View style={[Helpers.center, Metrics.mediumVerticalPadding]}>
        <Image
          width={Dimensions.get('window').width - 100 * 2}
          source={light ? Images.logoWhite : Images.logoBlack}
        />
      </View>
    )
  }
}

LogoHeader.propTypes = {
  light: PropTypes.bool,
}

export default LogoHeader
