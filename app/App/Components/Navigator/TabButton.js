import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import Text from 'App/Components/AppText'
import { ApplicationStyles, Colors, Helpers, Metrics, Fonts } from 'App/Theme'
import { PropTypes } from 'prop-types'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { withNavigation } from 'react-navigation'

class TabButton extends Component {
  render() {
    const actualTabKey = this.props.navigation.state.routeKeyHistory.slice(-1)[0]

    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={[Helpers.fillCenter, Metrics.verticalPadding]}
      >
        <Icon
          name={this.props.icon}
          size={30}
          color={this.props.service === actualTabKey ? Colors.secondary : Colors.text}
        />
        <Text
          style={[
            Fonts.style.small,
            this.props.service === actualTabKey ? ApplicationStyles.textSecondary : '',
          ]}
          i18n={this.props.title}
        />
      </TouchableOpacity>
    )
  }
}

TabButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  service: PropTypes.string,
  navigation: PropTypes.any,
}

export default withNavigation(TabButton)
