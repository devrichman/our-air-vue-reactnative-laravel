import React, { Component } from 'react'
import { Modal, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'

import { Helpers, Metrics, Images, ApplicationStyles, Fonts } from 'App/Theme'
import { Text } from 'App/Components'
import { Header, Background, Button } from 'App/Components/Ui'

import CategoryItem from 'App/Containers/Flight/Category/Item'
import OptionItem from 'App/Components/Option/Item'
import ConfirmationItem from 'App/Components/Flight/Confirmation/Item'
import NavigationService from 'App/Services/NavigationService'
import BookingActions from 'App/Stores/Booking/Actions'
import SettingsActions from 'App/Stores/Settings/Actions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import moment from 'moment'
import Styles from './Styles'

class Summary extends Component {
  state = {
    modalVisible: false,
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible })
  }

  submit() {
    if (this.props.user.id) {
      this.props.confirm(false)
      this.props.save(this.props.booking)
    } else {
      this.props.confirm(true)
      this.setModalVisible(true)
    }
  }

  render() {
    const { segments, categories, options } = this.props.booking

    return (
      <Background image={Images.background}>
        <KeyboardAvoidingView
          style={[Helpers.fill, Metrics.horizontalPadding]}
          behavior={Platform.OS === 'ios' ? 'height' : null}
        >
          <Header
            title="booking.summary"
            height={50}
            withBackButton
            withForwardButton
            onPressBackButton={() => {
              this.props.setPreviousPage('Options')
              NavigationService.navigate('Options')
            }}
            onPressForwardButton={() => NavigationService.navigate('Ambassador')}
          />
          <ScrollView
            contentContainerStyle={Helpers.scrollSpaceBetween}
            showsVerticalScrollIndicator={false}
          >
            <View>
              {Object.entries(segments).map(([key, segment]) => {
                return (
                  <View key={key} style={[Metrics.verticalMargin, ApplicationStyles.borderBottom]}>
                    <View style={[Helpers.row, Helpers.mainSpaceBetween]}>
                      <View style={Helpers.fill}>
                        <ConfirmationItem
                          bold
                          icon="airplane-takeoff"
                          info={segment.from.label ? segment.from.label : '-'}
                        />
                      </View>
                    </View>
                    <View style={[Helpers.row, Helpers.mainSpaceBetween]}>
                      <View style={Helpers.fill}>
                        <ConfirmationItem
                          bold
                          icon="airplane-landing"
                          info={segment.to.label ? segment.to.label : '-'}
                        />
                      </View>
                    </View>
                    <ConfirmationItem
                      bold
                      icon="calendar"
                      info={moment(segment.date).format('LLL')}
                    />
                    <ConfirmationItem bold icon="account" info={segment.pax.toString()} />
                  </View>
                )
              })}
            </View>

            <View>
              <Text light bold i18n="booking.aircrafts" style={Metrics.verticalMargin} />
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
          <Button
            textLabel="Confirmer"
            onPress={this.submit.bind(this)}
            loading={this.props.saveLoading}
          />

          <Modal
            style={Styles.modalLayout}
            animationType="fade"
            transparent={true}
            visible={this.state.modalVisible}
          >
            <View style={Styles.modalView}>
              <View style={[Helpers.row, Helpers.horizontalMargin, Styles.modalTitle]}>
                <Text bold style={[Fonts.style.title, Fonts.style.medium]}>
                  You must be logged in.
                </Text>
              </View>
              <View style={[Helpers.row, Helpers.horizontalMargin]}>
                <Button
                  style={Styles.modalButton}
                  textLabel="  I already have an account.  "
                  onPress={() => {
                    this.setModalVisible(false)
                    NavigationService.navigate('Login')
                  }}
                />
              </View>
              <View style={[Helpers.row, Helpers.horizontalMargin]}>
                <Button
                  style={Styles.modalButton}
                  textLabel="  Create an account  "
                  onPress={() => {
                    this.setModalVisible(false)
                    NavigationService.navigate('StepOne')
                  }}
                />
              </View>
            </View>
          </Modal>
        </KeyboardAvoidingView>
      </Background>
    )
  }
}

Summary.propTypes = {
  user: PropTypes.object,
  booking: PropTypes.object,
  confirm: PropTypes.func,
  save: PropTypes.func,
  saveLoading: PropTypes.bool,
  setPreviousPage: PropTypes.func,
}

const mapStateToProps = (state) => ({
  user: state.user.user,
  booking: state.booking.current.flight,
  saveLoading: state.booking.saveLoading,
})

const mapDispatchToProps = (dispatch) => ({
  save: (data) => dispatch(BookingActions.save(data)),
  confirm: (confirmation) => dispatch(BookingActions.confirm(confirmation)),
  setPreviousPage: (page) => dispatch(SettingsActions.setPreviousPage(page)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Summary)
