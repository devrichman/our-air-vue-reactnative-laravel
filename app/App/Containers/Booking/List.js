import React from 'react'
import { View, SectionList, KeyboardAvoidingView, Platform } from 'react-native'
import Text from 'App/Components/AppText'
import { connect } from 'react-redux'
import { Helpers, Metrics, Images } from 'App/Theme'
import BookingActions from 'App/Stores/Booking/Actions'
import { Header, Background } from 'App/Components/Ui'
import NavigationService from 'App/Services/NavigationService'
import Item from './Item'
import Styles from './Styles'
import { PropTypes } from 'prop-types'
import moment from 'moment'
import SettingsActions from 'App/Stores/Settings/Actions'

class BookingList extends React.Component {
  componentDidMount() {
    console.log('CDidMount')
    this.props.bookingsReset()
    this.props.getBookings(this.props.user.id)
    this.props.setPreviousPage('Bookings')
  }

  _parseBookings() {
    let bookings = []
    if (this.props.bookingsIsLoading) {
      return []
    }
    console.log('not loading anymore')
    if (this.props.bookings === undefined || this.props.bookings.length <= 0) {
      console.log('here')
      return []
    }
    this.props.bookings.forEach((item) => {
      bookings.push({
        title: moment(item.created_at).format('MMMM YYYY'),
        data: [item],
      })
    })
    return bookings
  }

  _loadMore() {
    if (this.props.bookingsMeta.last_page > this.props.bookingsMeta.current_page) {
      this.props.getBookings(this.props.user.id, this.props.bookingsMeta.current_page + 1)
    }
  }

  handleRefresh = () => {
    this.props.bookingsReset()
    this.props.getBookings(this.props.user.id)
  }

  render() {
    console.log(this.props)
    return (
      <Background image={Images.background}>
        <KeyboardAvoidingView
          style={[Helpers.fill, Metrics.horizontalPadding]}
          behavior={Platform.OS === 'ios' ? 'height' : null}
        >
          <View style={Styles.ListView}>
            <Header
              title="booking.booking_list"
              height={50}
              withBackButton
              withForwardButton
              onPressBackButton={() => {
                this.props.setPreviousPage('Services')
                NavigationService.navigate('Services')
              }}
              onPressForwardButton={() => NavigationService.navigate('Ambassador')}
            />
          </View>
          <View
            style={[
              Metrics.verticalPadding,
              Metrics.horizontalPadding,
              Metrics.verticalMargin,
              Styles.bottomMargin,
              Helpers.fill,
            ]}
          >
            <SectionList
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => <Item booking={item} />}
              sections={this._parseBookings()}
              keyExtractor={(item, index) => item + index}
              stickySectionHeadersEnabled
              onEndReached={this._loadMore.bind(this)}
              onEndReachedThreshold={0.01}
              onRefresh={this.handleRefresh}
              refreshing={this.props.bookingsIsLoading || false}
              ListEmptyComponent={() => (
                <View>
                  <Text center bold i18n="booking.no_bookings" />
                </View>
              )}
              progressViewOffset={100}
            />
          </View>
        </KeyboardAvoidingView>
      </Background>
    )
  }
}

BookingList.propTypes = {
  user: PropTypes.object,
  bookings: PropTypes.array,
  bookingsMeta: PropTypes.object,
  bookingsIsLoading: PropTypes.bool,
  getBookings: PropTypes.func,
  bookingsReset: PropTypes.func,
  setPreviousPage: PropTypes.func,
}

const mapStateToProps = (state) => ({
  user: state.user.user,
  bookings: state.booking.bookings,
  bookingsMeta: state.booking.bookingsMeta,
  bookingsIsLoading: state.booking.bookingsIsLoading,
})

const mapDispatchToProps = (dispatch) => ({
  getBookings: (userId, page) => dispatch(BookingActions.getBookings(userId, page)),
  bookingsReset: () => dispatch(BookingActions.bookingsReset()),
  setPreviousPage: (page) => dispatch(SettingsActions.setPreviousPage(page)),
})

export default connect(mapStateToProps, mapDispatchToProps)(BookingList)
