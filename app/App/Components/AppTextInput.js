import React, { Component } from 'react'
import { TextInput } from 'react-native'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import { ApplicationStyles, Helpers, Colors } from 'App/Theme'

class AppTextInput extends Component {
  render() {
    const {
      bold,
      light,
      center,
      style: propStyles,
      children,
      placeholderI18n,
      secureTextEntry,
      ...props
    } = this.props
    let text = null
    if (placeholderI18n !== null) {
      text = this.props.lines.find((item) => item.full_key === placeholderI18n)
      if (text === undefined) {
        text = placeholderI18n
      } else {
        text = text.translation
      }
    }

    return (
      <TextInput
        style={[
          bold ? ApplicationStyles.textBold : ApplicationStyles.text,
          light ? ApplicationStyles.textLight : ApplicationStyles.textDark,
          center ? Helpers.textCenter : {},
          propStyles,
        ]}
        placeholderTextColor={light ? Colors.textLight : Colors.text}
        {...props}
        secureTextEntry={secureTextEntry}
        placeholder={
          text
            ? this.props.capitalize
              ? text.charAt(0).toUpperCase() + text.slice(1)
              : text
            : null
        }
      >
        {children
          ? this.props.capitalize && typeof children === 'string'
            ? children.charAt(0).toUpperCase() + children.slice(1)
            : children
          : null}
      </TextInput>
    )
  }
}

AppTextInput.propTypes = {
  bold: PropTypes.bool,
  center: PropTypes.bool,
  light: PropTypes.bool,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  children: PropTypes.node,
  placeholderI18n: PropTypes.string,
  lines: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  capitalize: PropTypes.bool,
  secureTextEntry: PropTypes.bool,
}

AppTextInput.defaultProps = {
  center: false,
  placeholderI18n: null,
  capitalize: true,
}

const mapStateToProps = (state) => ({
  lines: state.locale.lines,
})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(AppTextInput)
