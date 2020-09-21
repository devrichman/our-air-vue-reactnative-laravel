import React, { Component } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Helpers, Colors, Metrics } from 'App/Theme'
import { TextInput } from 'App/Components'
import Styles from './IncrementalStyle'
import { PropTypes } from 'prop-types'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

class Incremental extends Component {
  state = {
    value: this.props.value,
  }

  decrement() {
    if (this.state.value > this.props.minValue) {
      const newValue = parseInt(this.state.value) - 1
      this.setState({
        value: newValue,
      })
      this.props.onChangeValue(newValue)
    }
  }

  increment() {
    const newValue = parseInt(this.state.value) + 1
    this.setState({
      value: newValue,
    })
    this.props.onChangeValue(newValue)
  }

  render() {
    return (
      <View style={[Helpers.row, Helpers.crossCenter, Metrics.smallVerticalPadding]}>
        <TouchableOpacity style={Styles.operand} onPress={this.decrement.bind(this)}>
          <Icon name="minus" size={30} color={Colors.white} />
        </TouchableOpacity>

        <View style={Metrics.smallHorizontalPadding}>
          <TextInput
            keyboardType="numeric"
            value={this.state.value.toString()}
            placeholderTextColor={Colors.white}
            style={Styles.counter}
            selectTextOnFocus
            onChangeText={this.props.onChangeValue}
          />
        </View>

        <TouchableOpacity style={Styles.operand} onPress={this.increment.bind(this)}>
          <Icon name="plus" size={30} color={Colors.white} />
        </TouchableOpacity>
      </View>
    )
  }
}

Incremental.propTypes = {
  value: PropTypes.number,
  minValue: PropTypes.number,
  onChangeValue: PropTypes.func,
}

Incremental.defaultProps = {
  minValue: 1,
  onChangeValue: () => {},
}

export default Incremental
