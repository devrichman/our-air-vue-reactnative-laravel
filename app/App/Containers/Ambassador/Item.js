import React, { Component } from 'react'
import { View, Image } from 'react-native'
import { Text } from 'App/Components'
import { Helpers, Metrics } from 'App/Theme'
import Styles from './Styles'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class Item extends Component {
  render() {
    return (
      <View style={Helpers.center}>
        <View>
          <Image
            style={Styles.picture}
            source={{
              uri: this.props.picture,
            }}
          />
        </View>
        <View style={Metrics.smallVerticalMargin}>
          <Text bold light i18n={this.props.ambassadorName} style={Helpers.textCenter} />
        </View>
      </View>
    )
  }
}

Item.propTypes = {
  ambassadorName: PropTypes.string,
  picture: PropTypes.string,
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Item)
