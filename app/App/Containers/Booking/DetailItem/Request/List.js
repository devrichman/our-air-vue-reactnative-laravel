import React from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native'
import Text from 'App/Components/AppText'
import { connect } from 'react-redux'
import { Helpers, Metrics, Images, ApplicationStyles } from 'App/Theme'
import { Background, Header } from 'App/Components/Ui'
import { PropTypes } from 'prop-types'
import Styles from '../ItemStyle'
import NavigationService from 'App/Services/NavigationService'

import CategoryItem from 'App/Containers/Flight/Category/Item'
import OptionItem from 'App/Components/Option/Item'
import ConfirmationItem from 'App/Components/Flight/Confirmation/Item'

import moment from 'moment'

class RequestList extends React.Component {
  render() {
    const { segments, categories, options } = this.props.booking.request

    return (
      <Background image={Images.background}>
        <KeyboardAvoidingView
          style={[Helpers.fill, Metrics.horizontalPadding]}
          behavior={Platform.OS === 'ios' ? 'height' : null}
        >
          <ScrollView
            contentContainerStyle={Helpers.scrollSpaceBetween}
            showsVerticalScrollIndicator={false}
          >
            <View style={Styles.ListView}>
              <Header
                title="booking.request"
                height={50}
                withBackButton
                withForwardButton
                onPressBackButton={() => NavigationService.navigate('BookingDetail')}
                onPressForwardButton={() => NavigationService.navigate('Ambassador')}
              />
            </View>
            <View>
              {Object.entries(segments).map(([key, segment]) => {
                return (
                  <View key={key} style={[Metrics.verticalMargin, ApplicationStyles.borderBottom]}>
                    <View style={[Helpers.row, Helpers.mainSpaceBetween]}>
                      <View style={Helpers.fill}>
                        <ConfirmationItem
                          bold
                          icon="airplane-takeoff"
                          info={segment.from.name ? segment.from.name : '-'}
                        />
                      </View>
                      <View style={Helpers.fill}>
                        <ConfirmationItem
                          bold
                          icon="airplane-landing"
                          info={segment.to.name ? segment.to.name : '-'}
                        />
                      </View>
                    </View>
                    <ConfirmationItem
                      bold
                      icon="calendar"
                      info={moment(segment.date).format('LLL')}
                    />
                    <ConfirmationItem
                      bold
                      icon="account"
                      info={(segment.pax ? segment.pax : 1).toString()}
                    />
                  </View>
                )
              })}
            </View>

            <View>
              <Text light bold i18n="booking.aircraft" style={Metrics.verticalMargin} />
              {Object.entries(categories).map(([key, category]) => {
                return <CategoryItem key={key} selection={false} category={category} />
              })}
            </View>

            <View style={Metrics.verticalMargin}>
              <Text light bold i18n="booking.options" style={Metrics.verticalMargin} />
              {Object.entries(options).map(([key, option]) => {
                return <OptionItem selection={false} key={key} item={option} />
              })}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Background>
    )
  }
}

RequestList.propTypes = {
  booking: PropTypes.object,
}

const mapStateToProps = (state) => ({
  booking: state.booking.booking,
})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(RequestList)
