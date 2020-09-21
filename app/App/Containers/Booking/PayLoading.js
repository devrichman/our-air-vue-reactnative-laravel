import React, { Component } from 'react'
import { View, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { Helpers, Colors } from 'App/Theme'
import { PropTypes } from 'prop-types'
import BookingActions from 'App/Stores/Booking/Actions'

class BookingPayLoading extends Component {
  componentDidMount() {
    this.props.payment(this.props.quoteId)
  }

  render() {
    return (
      <View style={[Helpers.mainCenter, Helpers.fill]}>
        <ActivityIndicator color={Colors.main} size="large" />
      </View>
    )
  }
}

BookingPayLoading.propTypes = {
  payment: PropTypes.func,
  quoteId: PropTypes.any,
}

const mapStateToProps = (state) => ({
  quoteId: state.booking.signatureQuoteId,
})

const mapDispatchToProps = (dispatch) => ({
  payment: (quoteId) => dispatch(BookingActions.payment(quoteId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(BookingPayLoading)
