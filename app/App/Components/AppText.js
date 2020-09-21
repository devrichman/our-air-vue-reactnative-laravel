import React, { Component } from 'react'
import { Text } from 'react-native'
import { ApplicationStyles, Helpers } from 'App/Theme'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'

class AppText extends Component {
  render() {
    const {
      bold,
      light,
      center,
      uppercase,
      style: propStyles,
      children,
      i18n,
      i18nValue,
      ...props
    } = this.props
    let text = null
    if (i18n !== null) {
      text =
        Object.keys(this.props.lines).length > 0
          ? this.props.lines.find((item) => item.full_key === i18n)
          : undefined
      if (text === undefined) {
        text = i18n
      } else {
        text = text.translation
        if (i18nValue !== '') {
          let textParts = text.split('xxx')
          text = textParts.join(i18nValue)
        }
      }
    }
    return (
      <Text
        style={[
          bold ? ApplicationStyles.textBold : ApplicationStyles.text,
          light ? ApplicationStyles.textLight : ApplicationStyles.textDark,
          center ? Helpers.textCenter : {},
          uppercase ? Helpers.uppercase : {},
          propStyles,
        ]}
        {...props}
      >
        {text
          ? this.props.capitalize
            ? text.charAt(0).toUpperCase() + text.slice(1)
            : text
          : null}
        {children
          ? this.props.capitalize && typeof children === 'string'
            ? children.charAt(0).toUpperCase() + children.slice(1)
            : children
          : null}
      </Text>
    )
  }
}

AppText.propTypes = {
  bold: PropTypes.bool,
  center: PropTypes.bool,
  light: PropTypes.bool,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  children: PropTypes.node,
  i18n: PropTypes.string,
  lines: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  capitalize: PropTypes.bool,
  uppercase: PropTypes.bool,
  i18nValue: PropTypes.string,
}

AppText.defaultProps = {
  bold: false,
  light: false,
  center: false,
  i18n: null,
  capitalize: true,
  uppercase: false,
  i18nValue: '',
}

const mapStateToProps = (state) => ({
  lines: state.locale.lines,
})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(AppText)
