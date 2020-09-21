import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import PropTypes from 'prop-types'

class ServiceIcon extends Component {
  render() {
    const { code, size, ...props } = this.props
    let icon = code
    switch (code) {
      case 'flight':
        icon = 'airplane'
        break
      case 'yacht':
        icon = 'ferry'
        break
    }

    return <Icon name={icon} size={size} {...props} />
  }
}

ServiceIcon.propTypes = {
  code: PropTypes.string.isRequired,
  size: PropTypes.number,
}

ServiceIcon.defaultProps = {
  size: 50,
}

export default ServiceIcon
