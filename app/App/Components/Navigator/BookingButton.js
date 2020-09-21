import React, { Component } from 'react'
import NavigationService from 'App/Services/NavigationService'
import { PropTypes } from 'prop-types'
import TabButton from './TabButton'
import { connect } from 'react-redux'
import SettingsActions from 'App/Stores/Settings/Actions'

class BookingButton extends Component {
  _onPress() {
    this.props.setPreviousPage('Bookings')
    NavigationService.navigate('Bookings')
  }

  render() {
    return (
      <TabButton
        onPress={this._onPress.bind(this)}
        title="tab.orders"
        icon="ticket-outline"
        service="Bookings"
      />
    )
  }
}

BookingButton.propTypes = {
  setPreviousPage: PropTypes.func,
}
const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  setPreviousPage: (page) => dispatch(SettingsActions.setPreviousPage(page)),
})
export default connect(mapStateToProps, mapDispatchToProps)(BookingButton)
