import React, { Component } from 'react'
import { View, Switch, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'

import { Helpers, Images, Metrics, Colors } from 'App/Theme'
import SearchSegment from './Search/Segment'
import { Header, Button, Background } from 'App/Components/Ui'
import { Text } from 'App/Components'
import NavigationService from 'App/Services/NavigationService'
import SettingsActions from 'App/Stores/Settings/Actions'
import FlightActions from 'App/Stores/Flight/Actions'
import BookingActions from 'App/Stores/Booking/Actions'

import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'

class Search extends Component {
  state = {
    displayTripBack: false,
  }

  show = (mode) => {
    this.setState({
      show: true,
      mode,
    })
  }

  next() {
    if (
      this.props.booking.segments[0].from !== '' &&
      this.props.booking.segments[0].to !== '' &&
      this.props.booking.segments[0].from !== this.props.booking.segments[0].to &&
      this.props.booking.segments[0].date !== null &&
      (!this.state.displayTripBack ||
        (this.props.booking.segments[1].from !== '' &&
          this.props.booking.segments[1].to !== '' &&
          this.props.booking.segments[1].from !== this.props.booking.segments[1].to &&
          this.props.booking.segments[1].date !== null))
    ) {
      this.props.submit(this.props.booking.segments)
    }
  }

  toggleSwitch() {
    if (this.state.displayTripBack) {
      this.props.removeSegment(1)
    } else {
      this.props.addSegment(1)
    }

    this.setState({
      displayTripBack: !this.state.displayTripBack,
    })
  }

  render() {
    const { displayTripBack } = this.state

    return (
      <Background image={Images.background}>
        <KeyboardAvoidingView
          style={[Helpers.fill, Metrics.horizontalPadding]}
          behavior={Platform.OS === 'ios' ? 'height' : null}
        >
          <Header
            title="booking.jet_title"
            description="booking.jet_description"
            withBackButton
            withForwardButton
            onPressBackButton={() => {
              this.props.setPreviousPage('Services')
              NavigationService.navigate('Services')
            }}
            onPressForwardButton={() => NavigationService.navigate('Ambassador')}
            height={70}
          />
          <ScrollView
            contentContainerStyle={[Metrics.verticalPadding]}
            showsVerticalScrollIndicator={false}
          >
            <SearchSegment index={0} />

            <View style={[Helpers.row, Helpers.crossCenter]}>
              <Switch
                style={Metrics.mediumVerticalMargin}
                thumbColor={Colors.secondary}
                trackColor={{ false: Colors.mainTransparent, true: Colors.main }}
                onValueChange={this.toggleSwitch.bind(this)}
                value={displayTripBack}
              />
              <Text
                style={Metrics.horizontalMargin}
                light
                i18n={displayTripBack ? 'booking.jet_roundTrip' : 'booking.jet_oneWay'}
              />
            </View>

            {displayTripBack ? (
              <View style={Helpers.fill}>
                <SearchSegment index={1} title={'action.back'} />
              </View>
            ) : null}
          </ScrollView>

          <View>
            <Button
              textLabel="action.next"
              onPress={this.next.bind(this)}
              loading={this.props.searchLoading}
            />
          </View>
        </KeyboardAvoidingView>
      </Background>
    )
  }
}

Search.propTypes = {
  submit: PropTypes.func,
  addSegment: PropTypes.func,
  removeSegment: PropTypes.func,
  booking: PropTypes.object,
  searchLoading: PropTypes.bool,
  setPreviousPage: PropTypes.func,
}

const mapStateToProps = (state) => ({
  booking: state.booking.current.flight,
  searchLoading: state.flight.searchLoading,
})

const mapDispatchToProps = (dispatch) => ({
  submit: (data) => dispatch(FlightActions.search(data)),
  addSegment: (index) => dispatch(BookingActions.addSegment('flight', index)),
  removeSegment: (index) => dispatch(BookingActions.removeSegment('flight', index)),
  setPreviousPage: (page) => dispatch(SettingsActions.setPreviousPage(page)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)
