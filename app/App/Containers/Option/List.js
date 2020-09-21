import React, { Component } from 'react'
import {
  FlatList,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native'

import { Helpers, Metrics, Images, Colors } from 'App/Theme'
import { Button, Header, Background } from 'App/Components/Ui'
import Option from 'App/Components/Option/Item'

import NavigationService from 'App/Services/NavigationService'
import OptionActions from 'App/Stores/Option/Actions'
import BookingActions from 'App/Stores/Booking/Actions'
import SettingsActions from 'App/Stores/Settings/Actions'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'

class OptionList extends Component {
  componentDidMount() {
    this.props.getOptions(this.props.navigation.getParam('category'))
  }

  submitOptions() {
    this.props.setPreviousPage('ConfirmationSummary')
    NavigationService.navigate('ConfirmationSummary')
  }

  render() {
    return (
      <Background image={Images.background}>
        <KeyboardAvoidingView
          style={[Helpers.fill, Metrics.horizontalPadding]}
          behavior={Platform.OS === 'ios' ? 'height' : null}
        >
          <Header
            title={'booking.options'}
            description="booking.options_description"
            height={50}
            withBackButton
            withForwardButton
            onPressBackButton={() => {
              this.props.setPreviousPage('FlightCategories')
              NavigationService.navigate('FlightCategories')
            }}
            onPressForwardButton={() => NavigationService.navigate('Ambassador')}
          />
          <ScrollView style={Metrics.verticalMargin}>
            {this.props.options.length > 0 ? (
              <FlatList
                data={this.props.options}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => {
                  return (
                    <Option
                      item={item}
                      onSelect={this.props.addOption}
                      onUnselect={this.props.removeOption}
                    />
                  )
                }}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
              />
            ) : (
              <ActivityIndicator size="large" color={Colors.white} />
            )}
          </ScrollView>
          <Button textLabel="action.next" onPress={this.submitOptions.bind(this)} />
        </KeyboardAvoidingView>
      </Background>
    )
  }
}

OptionList.propTypes = {
  options: PropTypes.array,
  getOptions: PropTypes.func,
  booking: PropTypes.object,
  navigation: PropTypes.object,
  addOption: PropTypes.func,
  removeOption: PropTypes.func,
  setPreviousPage: PropTypes.func,
}

const mapStateToProps = (state) => ({
  options: state.option.options,
  booking: state.booking.current,
})

const mapDispatchToProps = (dispatch) => ({
  getOptions: (category) => dispatch(OptionActions.getOptions(category)),
  addOption: (option) => dispatch(BookingActions.addOption('flight', option)),
  removeOption: (option) => dispatch(BookingActions.removeOption('flight', option)),
  setPreviousPage: (page) => dispatch(SettingsActions.setPreviousPage(page)),
})

export default connect(mapStateToProps, mapDispatchToProps)(OptionList)
