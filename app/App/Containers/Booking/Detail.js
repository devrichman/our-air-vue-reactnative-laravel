import React, { Component } from 'react'
import { View, FlatList, KeyboardAvoidingView, Platform } from 'react-native'
import { connect } from 'react-redux'
import { Background, Header } from 'App/Components/Ui'
import { Images, Metrics, Helpers } from 'App/Theme'
import NavigationService from 'App/Services/NavigationService'
import DetailSubMenuItem from 'App/Containers/Booking/DetailItem/Item'
import Styles from './DetailItem/ItemStyle'
import SettingsActions from 'App/Stores/Settings/Actions'
import ChatActions from 'App/Stores/Chat/Actions'
import { PropTypes } from 'prop-types'

class BookingDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      details: [
        {
          onPress: () => {
            this.props.setPreviousPage('BookingDetailRequest')
            NavigationService.navigate('BookingDetailRequest')
          },
          lefticon: 'book-plus',
          righticon: 'chevron-right',
          label: 'booking.request',
          displayIfConnected: false,
          toDisplayAnonymously: false,
        },
        {
          onPress: () => {
            this.props.setPreviousPage('BookingDetailQuotes')
            NavigationService.navigate('BookingDetailQuotes')
          },
          lefticon: 'briefcase',
          righticon: 'chevron-right',
          label: 'booking.quotes',
          displayIfConnected: true,
          toDisplayAnonymously: false,
        },
        {
          onPress: () => {
            this.props.getMessages(this.props.booking.id)
            this.props.setPreviousPage('BookingDetailChat')
            NavigationService.navigate('BookingDetailChat')
          },
          lefticon: 'message-text',
          righticon: 'chevron-right',
          label: 'booking.chat',
          displayIfConnected: true,
          toDisplayAnonymously: false,
        },
      ],
    }
  }
  render() {
    return (
      <Background image={Images.background}>
        <KeyboardAvoidingView
          style={[Helpers.fill, Metrics.horizontalPadding]}
          behavior={Platform.OS === 'ios' ? 'height' : null}
        >
          <View style={Styles.ListView}>
            <Header
              title="booking.details"
              height={50}
              withBackButton
              onPressBackButton={() => {
                NavigationService.navigate('Bookings')
                this.props.setPreviousPage('Bookings')
              }}
              withForwardButton
              onPressForwardButton={() => NavigationService.navigate('Ambassador')}
            />
          </View>
          <FlatList
            data={this.state.details}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <DetailSubMenuItem
                key={index}
                onPress={item.onPress}
                lefticon={item.lefticon}
                righticon={item.righticon}
                label={item.label}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </KeyboardAvoidingView>
      </Background>
    )
  }
}

BookingDetail.propTypes = {
  booking: PropTypes.object,
  setPreviousPage: PropTypes.func,
  getMessages: PropTypes.func,
}

const mapStateToProps = (state) => ({
  booking: state.booking.booking,
})

const mapDispatchToProps = (dispatch) => ({
  setPreviousPage: (page) => dispatch(SettingsActions.setPreviousPage(page)),
  getMessages: (bookingId) => dispatch(ChatActions.getMessages(bookingId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(BookingDetail)
