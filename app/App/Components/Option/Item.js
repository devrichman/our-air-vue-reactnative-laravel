import React, { Component } from 'react'
import { TouchableOpacity, View } from 'react-native'

import { Metrics, Helpers, Colors } from 'App/Theme'
import { Text } from 'App/Components'
import Styles from './ItemStyle'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { PropTypes } from 'prop-types'

class OptionItem extends Component {
  state = {
    selected: false,
  }

  toggleSelected() {
    if (this.props.selection === false) {
      return
    }

    if (this.state.selected) {
      this.props.onUnselect(this.props.item)
    } else {
      this.props.onSelect(this.props.item)
    }

    this.setState({
      selected: !this.state.selected,
    })
  }

  render() {
    const { label, icon = 'room-service', description, name } = this.props.item
    return (
      <View
        style={[
          this.state.selected ? Styles.selected : Styles.notSelected,
          Helpers.mainSpaceBetween,
          Helpers.row,
          Metrics.horizontalPadding,
          Metrics.tinyVerticalMargin,
          Styles.optionContainer,
        ]}
      >
        <TouchableOpacity
          onPress={this.toggleSelected.bind(this)}
          style={[Helpers.fill, Helpers.rowCross]}
        >
          {this.state.selected ? (
            <View style={Styles.whiteCircle}>
              <Icon name="check" size={20} />
            </View>
          ) : null}

          {this.props.withIcon ? (
            <Icon
              name={icon}
              size={40}
              color={this.state.selected ? Colors.white : Colors.main}
              style={Metrics.horizontalMargin}
            />
          ) : null}

          <View style={[Helpers.fill, Helpers.column]}>
            <View style={Helpers.fillColMain}>
              <Text light bold i18n={label || name} />
            </View>

            {this.props.withDescription ? (
              <View style={Helpers.fill}>
                <Text light bold i18n={description} />
              </View>
            ) : null}
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

OptionItem.propTypes = {
  item: PropTypes.object,
  onSelect: PropTypes.func,
  onUnselect: PropTypes.func,
  selection: PropTypes.bool,
  withIcon: PropTypes.bool,
  withDescription: PropTypes.bool,
}

OptionItem.defaultProps = {
  selection: true,
  withIcon: true,
  withDescription: false,
}

export default OptionItem
