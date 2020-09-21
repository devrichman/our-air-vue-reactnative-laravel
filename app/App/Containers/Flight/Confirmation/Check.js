import React, { Component } from 'react'
import { View, KeyboardAvoidingView, Platform } from 'react-native'

import { Helpers, Metrics, Images, Colors } from 'App/Theme'
import { Text } from 'App/Components'
import { Background, Button } from 'App/Components/Ui'

import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import NavigationService from 'App/Services/NavigationService'

class BookingCheck extends Component {
  render() {
    return (
      <Background image={Images.background}>
        <KeyboardAvoidingView
          style={[
            Helpers.fill,
            Metrics.horizontalPadding,
            Helpers.mainCenter,
            Helpers.mainSpaceAround,
            Metrics.mediumVerticalPadding,
          ]}
          behavior={Platform.OS === 'ios' ? 'height' : null}
        >
          <View style={[Helpers.center, Metrics.mediumHorizontalMargin]}>
            <Icon name="checkbox-marked-circle-outline" size={100} color={Colors.secondary} />
          </View>
          <Text
            center
            bold
            light
            i18n={'booking.confirmation_text'}
            style={Metrics.mediumHorizontalMargin}
          />
          <View>
            <Button textLabel={'OK'} onPress={() => NavigationService.navigate('Services')} />
          </View>
        </KeyboardAvoidingView>
      </Background>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(BookingCheck)
