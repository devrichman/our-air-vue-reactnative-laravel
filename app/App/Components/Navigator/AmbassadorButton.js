import React, { Component } from 'react'
import { withNavigation } from 'react-navigation'
import { PropTypes } from 'prop-types'
import TabButton from './TabButton'

class AmbassadorButton extends Component {
  _onPress() {
    this.props.navigation.navigate('Ambassador')
  }

  render() {
    return (
      <TabButton
        onPress={this._onPress.bind(this)}
        title="tab.ambassador"
        icon="face-agent"
        service="Ambassador"
      />
    )
  }
}

AmbassadorButton.propTypes = {
  navigation: PropTypes.any,
}

export default withNavigation(AmbassadorButton)
