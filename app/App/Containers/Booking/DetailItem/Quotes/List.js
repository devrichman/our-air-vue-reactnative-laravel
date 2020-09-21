import React from 'react'
import { View, KeyboardAvoidingView, Platform, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { Helpers, Metrics, Images } from 'App/Theme'
import { Background, Header } from 'App/Components/Ui'
import { PropTypes } from 'prop-types'
import SettingsActions from 'App/Stores/Settings/Actions'
import Styles from '../ItemStyle'
import NavigationService from 'App/Services/NavigationService'
import QuoteItem from './Item'

class QuotesList extends React.Component {
  render() {
    return (
      <Background image={Images.background}>
        <KeyboardAvoidingView
          style={[Helpers.fill, Metrics.horizontalPadding]}
          behavior={Platform.OS === 'ios' ? 'height' : null}
        >
          <View style={Styles.ListView}>
            <Header
              title="booking.quote"
              height={50}
              withBackButton
              onPressBackButton={() => {
                this.props.setPreviousPage('BookingDetail')
                NavigationService.navigate('BookingDetail')
              }}
              withForwardButton
              onPressForwardButton={() => NavigationService.navigate('Ambassador')}
            />
          </View>
          <View style={[Metrics.verticalPadding, Metrics.horizontalPadding]}>
            <FlatList
              data={this.props.booking.quotes}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <View style={Helpers.fill}>
                  <QuoteItem quote={item} keyExtractor={'quote' + index.toString()} />
                </View>
              )}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        </KeyboardAvoidingView>
      </Background>
    )
  }
}

QuotesList.propTypes = {
  booking: PropTypes.object,
  setPreviousPage: PropTypes.func,
}

const mapStateToProps = (state) => ({
  booking: state.booking.booking,
})

const mapDispatchToProps = (dispatch) => ({
  setPreviousPage: (page) => dispatch(SettingsActions.setPreviousPage(page)),
})

export default connect(mapStateToProps, mapDispatchToProps)(QuotesList)
