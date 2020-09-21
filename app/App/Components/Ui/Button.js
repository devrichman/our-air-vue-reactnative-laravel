import React, { Component } from 'react'
import { ActivityIndicator, TouchableOpacity } from 'react-native'
import Text from 'App/Components/AppText'
import { PropTypes } from 'prop-types'
import Styles from './ButtonStyle'
import { Metrics, Colors } from 'App/Theme'

class UiButton extends Component {
  render() {
    const {
      textLabel,
      secondary,
      link,
      loading,
      children,
      style: propStyles,
      ...props
    } = this.props

    return (
      <TouchableOpacity
        style={[
          Metrics.verticalPadding,
          Metrics.smallVerticalMargin,
          Styles.button,
          secondary ? Styles.secondary : null,
          link ? Styles.link : null,
          propStyles,
        ]}
        {...props}
      >
        {loading ? (
          <ActivityIndicator size="small" color={Colors.buttonText} />
        ) : (
          <Text
            bold={!link}
            center
            style={[
              Styles.buttonText,
              secondary ? Styles.secondaryText : null,
              link ? Styles.linkText : null,
            ]}
            i18n={textLabel}
          />
        )}
      </TouchableOpacity>
    )
  }
}

UiButton.propTypes = {
  children: PropTypes.node,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  textLabel: PropTypes.string,
  loading: PropTypes.bool,
  secondary: PropTypes.bool,
  link: PropTypes.bool,
}

UiButton.defaultProps = {
  loading: false,
  secondary: false,
  link: false,
}

export default UiButton
