import React, { Component } from 'react'
import { ImageBackground, SafeAreaView } from 'react-native'
import { Helpers, ApplicationStyles } from 'App/Theme'
import PropTypes from 'prop-types'

class Background extends Component {
  render() {
    const { image, children, style: propStyles } = this.props
    return (
      <ImageBackground source={image} style={[Helpers.fullSize, propStyles]} resizeMode="cover">
        <SafeAreaView style={[Helpers.fill, ApplicationStyles.darkBackground]}>
          {children}
        </SafeAreaView>
      </ImageBackground>
    )
  }
}

Background.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  image: PropTypes.node.isRequired,
  children: PropTypes.node,
}

export default Background
