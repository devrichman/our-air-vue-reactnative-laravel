import React, { Component } from 'react'
import { ScrollView, View, KeyboardAvoidingView, Platform } from 'react-native'
import { TextInput, Button, Background } from 'App/Components/Ui'
import { connect } from 'react-redux'
import UserActions from 'App/Stores/User/Actions'
import { PropTypes } from 'prop-types'
import { Helpers, Metrics, Images } from 'App/Theme'
import NavigationService from 'App/Services/NavigationService'
import LogoHeader from 'App/Components/Ui/LogoHeader'

class StepOne extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
    }
  }
  _onChangeText(text, key) {
    this.setState((prevState) => ({
      user: {
        ...prevState.user,
        [key]: text,
      },
    }))
  }

  render() {
    return (
      <Background image={Images.background}>
        <LogoHeader light />
        <KeyboardAvoidingView
          style={[Helpers.fill, Metrics.mediumHorizontalPadding]}
          enabled={Platform.OS === 'ios'}
          behavior="height"
        >
          <ScrollView contentContainerStyle={Helpers.fill} showsVerticalScrollIndicator={false}>
            <View style={[Helpers.fill, Helpers.mainSpaceBetween]}>
              <View>
                <TextInput
                  light
                  textLabel="user.email"
                  placeholder="user.email_placeholder"
                  onChangeText={(text) => this._onChangeText(text, 'email')}
                />
                <TextInput
                  light
                  textLabel="user.password"
                  secureTextEntry
                  placeholder="user.password_placeholder"
                  onChangeText={(text) => this._onChangeText(text, 'password')}
                />

                <TextInput
                  light
                  textLabel="user.password_confirmation"
                  secureTextEntry
                  placeholder="user.password_confirmation_placeholder"
                  onChangeText={(text) => this._onChangeText(text, 'password_confirmation')}
                />
              </View>
              <View>
                <Button
                  textLabel="action.register"
                  onPress={() => {
                    this.props.stepone(this.state.user)
                  }}
                  disabled={this.props.loading}
                  loading={this.props.loading}
                />
                <Button
                  secondary
                  textLabel="action.already"
                  onPress={() => NavigationService.navigate('Login')}
                />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Background>
    )
  }
}

StepOne.propTypes = {
  stepone: PropTypes.func,
  loading: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  loading: state.user.steponeLoading,
})
const mapDispatchToProps = (dispatch) => ({
  stepone: (user) => dispatch(UserActions.stepone(user)),
})

export default connect(mapStateToProps, mapDispatchToProps)(StepOne)
