import React, { Component } from 'react'
import { View, Platform, Linking } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { WebView } from 'react-native-webview'
import { Helpers } from 'App/Theme'

class BookingPay extends Component {
  render() {
    const html =
      '<html lang="fr">' +
      '<head>' +
      '<title>Club Airways</title>' +
      '<meta name="mobile-web-app-capable" content="yes">' +
      '<meta name="viewport" content="width=device-width, initial-scale=1.0">' +
      '</head>' +
      '<body>' +
      '<script src="https://js.stripe.com/v3/"></script>' +
      '<script>' +
      "var stripe = Stripe('pk_test_A4m6Av8cTck576KxYGNwnEN400428hgxen');" +
      'stripe.redirectToCheckout({' +
      'sessionId:' +
      this.props.sessionId +
      '});' +
      '</script>' +
      '</body>' +
      '</html>'

    return (
      <View style={[Helpers.fill, Helpers.verticalPadding, Helpers.horizontalPadding]}>
        <WebView
          ref={(ref) => {
            this.webview = ref
          }}
          scalesPageToFit={Platform.OS !== 'ios'}
          textZoom={250}
          source={{ html: html }}
          onNavigationStateChange={(navState) => {
            // if (navState.url !== 'about:blank') {
            Platform.select({
              ios: () => this.webview.stopLoading(),
              android: () => this.webview.goBack(),
            })()
            Linking.openURL(navState.url)
            return false
            // }
          }}
        />
      </View>
    )
  }
}

BookingPay.propTypes = {
  sessionId: PropTypes.string,
}

const mapStateToProps = (state) => ({
  sessionId: state.booking.sessionId,
})

export default connect(mapStateToProps, null)(BookingPay)
