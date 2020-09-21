import React, { Component } from 'react'
import { withNavigation } from 'react-navigation'
import { PropTypes } from 'prop-types'
import TabButton from './TabButton'

class MoreButton extends Component {
  _onPress() {
    this.props.navigation.toggleDrawer()
  }

  render() {
    return <TabButton onPress={this._onPress.bind(this)} title="tab.menu" icon="dots-vertical" />
  }
}

MoreButton.propTypes = {
  navigation: PropTypes.any,
}

export default withNavigation(MoreButton)
