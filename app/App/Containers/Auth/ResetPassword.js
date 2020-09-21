import React, { Component } from 'react'
import { View, KeyboardAvoidingView, ScrollView, Platform } from 'react-native'
import { connect } from 'react-redux'
import { TextInput, Button, Background } from 'App/Components/Ui'
import { Text } from 'App/Components'
import { Helpers, Metrics, Images } from 'App/Theme'
import UserActions from 'App/Stores/User/Actions'
import { PropTypes } from 'prop-types'
import LogoHeader from 'App/Components/Ui/LogoHeader'

class ResetPassword extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: '',
      email: '',
      password: '',
      password_confirmation: '',
    }
  }
  _onChangeText(text, key) {
    this.setState((prevState) => ({
      ...prevState,
      [key]: text,
    }))
  }

  componentDidMount() {
    this.setState((prevState) => ({
      ...prevState,
      token: this.props.navigation.getParam('token'),
      email: this.props.navigation.getParam('email'),
    }))
  }
  resetPassword() {
    this.props.changePassword(this.state)
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
          <ScrollView
            contentContainerStyle={Helpers.scrollSpaceAround}
            showsVerticalScrollIndicator={false}
          >
            <View>
              <TextInput
                light
                secureTextEntry
                textLabel="user.new_password"
                placeholder="user.password"
                onChangeText={(text) => this._onChangeText(text, 'password')}
              />

              <TextInput
                light
                secureTextEntry
                textLabel="user.new_password_confirmation"
                placeholder="user.password"
                onChangeText={(text) => this._onChangeText(text, 'password_confirmation')}
              />
              {this.props.success ? <Text light i18n={this.props.success} /> : null}
            </View>

            <Button
              loading={this.props.loading}
              textLabel="action.change_password"
              onPress={() => this.resetPassword()}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </Background>
    )
  }
}

ResetPassword.propTypes = {
  success: PropTypes.bool,
  loading: PropTypes.bool,
  changePassword: PropTypes.func,
  navigation: PropTypes.object,
}

const mapStateToProps = (state) => ({
  loading: state.user.resetPasswordLoading,
  success: state.user.resetPasswordSuccess,
})

const mapDispatchToProps = (dispatch) => ({
  changePassword: (password) => dispatch(UserActions.resetPassword(password)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword)
