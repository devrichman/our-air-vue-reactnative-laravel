import React, { Component } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Helpers, Metrics, Images } from 'App/Theme'
import { Text, Image } from 'App/Components'
import Styles from './HeaderStyle'
import { PropTypes } from 'prop-types'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Colors } from 'react-native/Libraries/NewAppScreen'

class Header extends Component {
  render() {
    const {
      title,
      logoWidth,
      height,
      withBackButton,
      onPressBackButton,
      withForwardButton,
      onPressForwardButton,
    } = this.props
    return (
      <View style={height ? [{ height: height }] : [Helpers.fill, Metrics.verticalMargin]}>
        <View style={withBackButton ? Helpers.row : null}>
          {withBackButton && (
            <View style={Styles.fillButton}>
              <TouchableOpacity onPress={onPressBackButton} style={Styles.backButton}>
                <Icon name="arrow-left" size={30} color={Colors.white} />
              </TouchableOpacity>
            </View>
          )}
          <View style={Styles.fillText}>
            {title ? (
              <Text
                light
                bold
                i18n={title}
                numberOfLines={1}
                minimumFontScale={0.01}
                adjustsFontSizeToFit={true}
                style={[Styles.title, Helpers.textCenter]}
              />
            ) : null}
          </View>
          <View style={Styles.fillButton}>
            {withForwardButton && (
              <TouchableOpacity onPress={onPressForwardButton}>
                <Icon name="headset" size={30} color={Colors.white} style={Styles.forwardButton} />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={[Helpers.center, Helpers.verticalPadding, Styles.bottom]}>
          <View style={[Helpers.row, Helpers.crossCenter, Metrics.verticalPadding]}>
            <View style={Styles.whiteLine} />
            <View style={Metrics.horizontalPadding}>
              <Image width={logoWidth || 40} source={Images.logoWhite} />
            </View>
            <View style={Styles.whiteLine} />
          </View>
        </View>
      </View>
    )
  }
}

Header.propTypes = {
  title: PropTypes.string,
  height: PropTypes.number,
  logoWidth: PropTypes.number,
  withBackButton: PropTypes.bool,
  onPressBackButton: PropTypes.func,
  withForwardButton: PropTypes.bool,
  onPressForwardButton: PropTypes.func,
}

export default Header
