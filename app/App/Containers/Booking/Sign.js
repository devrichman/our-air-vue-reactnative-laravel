import React, { Component } from 'react'
import { View, Platform } from 'react-native'
import NavigationService from 'App/Services/NavigationService'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { WebView } from 'react-native-webview'
import { Helpers } from 'App/Theme'

class GeneralTerms extends Component {
  render() {
    return (
      <View style={[Helpers.fill, Helpers.verticalPadding, Helpers.horizontalPadding]}>
        <WebView
          ref={(ref) => {
            this.webview = ref
          }}
          scalesPageToFit={Platform.OS !== 'ios'}
          source={{ uri: this.props.signature }}
          onNavigationStateChange={(navState) => {
            // TODO change redirect urls
            if (navState.url.includes('/signing/success')) {
              NavigationService.navigate('BookingPayLoading')
            } else if (
              navState.url.includes('/signing/cancel') ||
              navState.url.includes('/signing/error')
            ) {
              NavigationService.navigate('Services')
            }
          }}
        />
      </View>
    )
  }
}

GeneralTerms.propTypes = {
  signature: PropTypes.string,
}

const mapStateToProps = (state) => ({
  signature: state.booking.signature,
})

export default connect(mapStateToProps, null)(GeneralTerms)
