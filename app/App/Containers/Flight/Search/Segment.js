import React, { Component } from 'react'
import { View } from 'react-native'

import { Helpers, Metrics } from 'App/Theme'
import { DateTimePicker, Incremental, SplitInput } from 'App/Components/Ui'
import { Text } from 'App/Components'

import BookingActions from 'App/Stores/Booking/Actions'
import FlightActions from 'App/Stores/Flight/Actions'
import NavigationService from 'App/Services/NavigationService'

import Styles from './SegmentStyle'

import moment from 'moment'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'

class FlightSearchSegment extends Component {
  state = {
    mode: 'date',
    show: false,
    pax: 1,
    from: '',
    to: '',
    date: null,
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      pax: this.props.booking.segments[0].pax,
      date: this.props.booking.segments[0].date,
    })
  }

  datetimepicker = () => {
    this.setState({ show: true })
  }

  saveDateTimePicker = (date) => {
    this.setState({ show: false })
    this.setState({
      date: date,
    })
    this.props.setSegmentValue('date', date, this.props.index)
  }

  setPax = (text) => {
    this.setState({
      ...this.state,
      pax: parseInt(text),
    })

    this.props.setSegmentValue('pax', parseInt(text), this.props.index)
  }

  pickAirport = (target) => {
    let segment = {}
    if (target === 'from') {
      segment = { target: 'from', index: this.props.index }
    } else {
      segment = { target: 'to', index: this.props.index }
    }
    this.props.selectAirportTarget(segment)
    NavigationService.navigate('PickAirport')
  }

  render() {
    const { show } = this.state

    return (
      <View style={[Styles.mainContainer, Metrics.verticalPadding, Metrics.horizontalPadding]}>
        <DateTimePicker
          show={show}
          selectedDate={this.state.date || new Date()}
          onSubmit={this.saveDateTimePicker.bind(this)}
        />
        <SplitInput
          title={this.props.title ? this.props.title : 'booking.destination_title'}
          actionLeft={() => this.pickAirport('from')}
          actionRight={() => this.pickAirport('to')}
          iconName="airplane"
          valueLeft={
            this.props.booking.segments[this.props.index].from.label
              ? this.props.booking.segments[this.props.index].from.label
              : 'booking.from'
          }
          valueRight={
            this.props.booking.segments[this.props.index].to.label
              ? this.props.booking.segments[this.props.index].to.label
              : 'booking.to'
          }
        />
        <SplitInput
          actionLeft={this.datetimepicker.bind(this)}
          actionRight={this.datetimepicker.bind(this)}
          iconName="calendar"
          valueLeft={this.state.date ? moment(this.state.date).format('L') : 'booking.arrivalDate'}
          valueRight={
            this.state.date ? moment(this.state.date).format('HH:mm') : 'booking.arrivalHour'
          }
        />

        <View style={[Helpers.row, Helpers.crossCenter, Helpers.mainSpaceAround]}>
          <Text light i18n="booking.number_traveler" />
          <Incremental onChangeValue={this.setPax} value={this.state.pax} />
        </View>
      </View>
    )
  }
}

FlightSearchSegment.propTypes = {
  booking: PropTypes.object,
  index: PropTypes.number,
  title: PropTypes.string,
  setSegmentValue: PropTypes.func,
  selectAirportTarget: PropTypes.func,
}

const mapStateToProps = (state) => ({
  booking: state.booking.current.flight,
})

const mapDispatchToProps = (dispatch) => ({
  setSegmentValue: (key, value, index) =>
    dispatch(BookingActions.setSegmentValue('flight', key, value, index)),
  selectAirportTarget: (airportTarget) =>
    dispatch(FlightActions.selectAirportTarget(airportTarget)),
})

export default connect(mapStateToProps, mapDispatchToProps)(FlightSearchSegment)
