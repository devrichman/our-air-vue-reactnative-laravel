import React, { Component } from 'react'
import { View, Platform, Linking } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'
import { WebView } from 'react-native-webview'
import { Helpers } from 'App/Theme'

class GeneralTerms extends Component {
  render() {
    let html

    if (this.props.general_terms) {
      let converter = new QuillDeltaToHtmlConverter(JSON.parse(this.props.general_terms).ops, {})
      html = converter.convert()
    }

    return (
      <View style={[Helpers.fill, Helpers.verticalPadding, Helpers.horizontalPadding]}>
        {this.props.general_terms && (
          <WebView
            ref={(ref) => {
              this.webview = ref
            }}
            scalesPageToFit={Platform.OS !== 'ios'}
            textZoom={250}
            source={{ html: html }}
            onNavigationStateChange={(navState) => {
              if (navState.url !== 'about:blank') {
                Platform.select({
                  ios: () => this.webview.stopLoading(),
                  android: () => this.webview.goBack(),
                })()
                Linking.openURL(navState.url)
                return false
              }
            }}
          />
        )}
      </View>
    )
  }
}

GeneralTerms.propTypes = {
  general_terms: PropTypes.string,
}

const mapStateToProps = (state) => ({
  general_terms: state.settings.general_terms,
})

export default connect(mapStateToProps, null)(GeneralTerms)
