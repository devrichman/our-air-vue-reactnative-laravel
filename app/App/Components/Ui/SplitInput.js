import React, { Component } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Text } from 'App/Components'
import { Colors, Helpers, Metrics } from 'App/Theme'
import Styles from './SplitInputStyle'
import { PropTypes } from 'prop-types'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

class UiSplitInput extends Component {
  render() {
    const {
      title,
      actionLeft,
      actionRight,
      iconName,
      valueLeft,
      valueRight,
      style: propStyles,
      borderBottom,
      borderTop,
    } = this.props

    return (
      <View style={[Helpers.fill, Helpers.smallVerticalPadding, Helpers.crossCenter, propStyles]}>
        {title ? <Text bold uppercase i18n={title} style={Styles.title} /> : null}
        <View
          style={[
            Helpers.row,
            Helpers.mainCenter,
            Metrics.verticalPadding,
            borderBottom ? Styles.borderBottom : null,
            borderTop ? Styles.borderTop : null,
            Metrics.verticalMargin,
            Helpers.mainSpaceAround,
          ]}
        >
          <TouchableOpacity style={[Helpers.fill, Helpers.center]} onPress={() => actionLeft()}>
            <Text light i18n={valueLeft} />
          </TouchableOpacity>
          <Icon name={iconName} size={30} color={Colors.white} />
          <TouchableOpacity style={[Helpers.fill, Helpers.center]} onPress={() => actionRight()}>
            <Text light i18n={valueRight} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

UiSplitInput.propTypes = {
  title: PropTypes.string,
  actionLeft: PropTypes.func,
  actionRight: PropTypes.func,
  iconName: PropTypes.string,
  valueLeft: PropTypes.string,
  valueRight: PropTypes.string,
  style: PropTypes.object,
  borderTop: PropTypes.bool,
  borderBottom: PropTypes.bool,
}

UiSplitInput.defaultProps = {
  borderTop: true,
  borderBottom: true,
}

export default UiSplitInput
