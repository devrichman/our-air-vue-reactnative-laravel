import React, { Component } from 'react'
import { Picker } from 'react-native'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import { ApplicationStyles, Helpers, Colors } from 'App/Theme'

class AppPicker extends Component {
  render() {
    const {
      bold,
      light,
      center,
      style: propStyles,
      placeholderI18n,
      pickerItems,
      ...props
    } = this.props
    let text = null
    let textItems = []

    if (placeholderI18n !== null) {
      text = this.props.lines.find((item) => item.full_key === placeholderI18n)
      if (text === undefined) {
        text = placeholderI18n
      } else {
        text = text.translation
      }
    }
    if (pickerItems !== null) {
      pickerItems.map((item, key) => {
        textItems[key] = this.props.lines.find((it) => it.full_key === item)
        if (textItems[key] === undefined) {
          textItems[key] = placeholderI18n
        } else {
          textItems[key] = textItems[key].translation
        }
      })
    }

    return (
      <Picker
        style={[
          bold ? ApplicationStyles.textBold : ApplicationStyles.text,
          light ? ApplicationStyles.textLight : ApplicationStyles.textDark,
          center ? Helpers.textCenter : {},
          propStyles,
        ]}
        {...props}
      >
        {placeholderI18n && (
          <Picker.Item
            style={light ? Colors.textLight : Colors.text}
            label={
              text
                ? this.props.capitalize
                  ? text.charAt(0).toUpperCase() + text.slice(1)
                  : text
                : null
            }
            value={0}
            key={0}
          />
        )}
        {pickerItems.map((item, key) => {
          return (
            <Picker.Item
              label={textItems[key]}
              value={placeholderI18n ? key + 1 : key}
              key={placeholderI18n ? key + 1 : key}
            />
          )
        })}
      </Picker>
    )
  }
}

AppPicker.propTypes = {
  bold: PropTypes.bool,
  center: PropTypes.bool,
  light: PropTypes.bool,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  placeholderI18n: PropTypes.string,
  lines: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  capitalize: PropTypes.bool,
  pickerItems: PropTypes.array,
}

AppPicker.defaultProps = {
  center: false,
  placeholderI18n: null,
  capitalize: true,
}

const mapStateToProps = (state) => ({
  lines: state.locale.lines,
})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(AppPicker)
