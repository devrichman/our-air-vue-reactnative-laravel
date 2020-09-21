import React, { Component } from 'react'
import { KeyboardAvoidingView, Modal, Platform, View } from 'react-native'
import { Button, TextInput } from '.'
import { Text } from 'App/Components'
import { Helpers, ApplicationStyles, Metrics, Colors } from 'App/Theme'
import CalendarPicker from 'react-native-calendar-picker'
import PropTypes from 'prop-types'
import moment from 'moment'

class UIDateTimePicker extends Component {
  state = {
    selectedDate: this.props.selectedDate,
    current_hour: moment(this.props.selectedDate).format('HH'),
    current_min: moment(this.props.selectedDate).format('mm'),
  }
  pickDate = (date) => {
    this.setDateTime('date', date)
  }
  pickTime = (mode, value) => {
    let updateValue = parseInt(value) || 0
    let numbers = '0123456789'
    let newChar = value.substr(-1, 1)
    let oldChar = value.substr(0, value.length - 1)
    if (numbers.indexOf(newChar) < 0) {
      updateValue = parseInt(oldChar) || 0
    }
    if (mode === 'hour') {
      if (updateValue > 23) {
        updateValue = parseInt(oldChar) || 0
      }
      this.setState({
        current_hour: updateValue.toString(),
      })
    } else {
      if (updateValue > 59) {
        updateValue = parseInt(oldChar) || 0
      }
      this.setState({
        current_min: updateValue.toString(),
      })
    }
    this.setDateTime(mode, updateValue)
  }
  setDateTime = (mode, value) => {
    const defaultDate = this.state.selectedDate || new Date()
    let date = new Date(
      mode === 'date' ? new Date(value).getFullYear() : defaultDate.getFullYear(),
      mode === 'date' ? new Date(value).getMonth() : defaultDate.getMonth(),
      mode === 'date' ? new Date(value).getDate() : defaultDate.getDate(),
      mode === 'hour' ? value : defaultDate.getHours(),
      mode === 'minute' ? value : defaultDate.getMinutes()
    )
    this.setState({
      selectedDate: date,
    })
  }
  saveDateTime = () => {
    this.props.onSubmit(this.state.selectedDate)
  }

  render() {
    return (
      <Modal transparent animationType="fade" visible={this.props.show}>
        <KeyboardAvoidingView
          style={[
            Helpers.fill,
            Helpers.mainCenter,
            ApplicationStyles.modalDatePicker,
            Metrics.smallHorizontalPadding,
          ]}
          behavior={Platform.OS === 'ios' ? 'height' : null}
        >
          <View style={Helpers.row}>
            <View style={Helpers.fill}>
              <Text
                bold
                i18n={moment(this.state.selectedDate).format('L HH:mm')}
                style={Helpers.textCenter}
              />
            </View>
          </View>
          <View style={Helpers.row}>
            <CalendarPicker
              onDateChange={this.pickDate}
              selectedStartDate={this.state.selectedDate}
              minDate={new Date()}
              selectedDayColor={Colors.secondary}
              startFromMonday
              previousTitle={'<'}
              nextTitle={'>'}
            />
          </View>
          <View style={[Helpers.row, Metrics.horizontalMargin, Metrics.horizontalPadding]}>
            <View style={Helpers.fill}>
              <TextInput
                center
                bold
                placeholder="00"
                maxLength={2}
                keyboardType="number-pad"
                returnKeyType={'done'}
                selectTextOnFocus
                defaultValue={moment(this.props.selectedDate).format('HH')}
                onChangeText={(text) => this.pickTime('hour', text)}
                value={this.state.current_hour}
              />
            </View>
            <View style={Helpers.fill}>
              <TextInput center bold placeholder=":" editable={false} />
            </View>
            <View style={Helpers.fill}>
              <TextInput
                center
                bold
                placeholder="00"
                maxLength={2}
                keyboardType="number-pad"
                returnKeyType={'done'}
                selectTextOnFocus
                defaultValue={moment(this.props.selectedDate).format('mm')}
                onChangeText={(text) => this.pickTime('minute', text)}
                value={this.state.current_min}
              />
            </View>
          </View>
          <Button secondary textLabel="action.save" onPress={() => this.saveDateTime()} />
        </KeyboardAvoidingView>
      </Modal>
    )
  }
}

UIDateTimePicker.propTypes = {
  show: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  selectedDate: PropTypes.any,
}

export default UIDateTimePicker
