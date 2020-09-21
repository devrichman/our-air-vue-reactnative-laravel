import React, { Component } from 'react'
import { View, Platform, KeyboardAvoidingView, ScrollView } from 'react-native'
import { TextInput, Button, Background } from 'App/Components/Ui'
import { connect } from 'react-redux'
import { Helpers, Metrics, Images } from 'App/Theme'
import UserActions from 'App/Stores/User/Actions'
import NavigationService from 'App/Services/NavigationService'
import { PropTypes } from 'prop-types'
import LogoHeader from 'App/Components/Ui/LogoHeader'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = { user: {} }
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
          <ScrollView
            contentContainerStyle={Helpers.scrollSpaceAround}
            showsVerticalScrollIndicator={false}
          >
            <View style={Helpers.fill}>
              <TextInput
                textLabel="user.email"
                placeholder="user.email_placeholder"
                light
                onChangeText={(text) => this._onChangeText(text, 'email')}
              />
              <TextInput
                textLabel="user.password"
                secureTextEntry
                light
                placeholder="user.password_placeholder"
                onChangeText={(text) => this._onChangeText(text, 'password')}
              />
            </View>

            <View style={Helpers.fill}>
              <Button
                loading={this.props.loading}
                onPress={() => this.props.login(this.state.user)}
                disabled={this.props.loading}
                textLabel="action.login"
              />
              <Button
                secondary
                textLabel="action.register"
                onPress={() => NavigationService.navigate('StepOne')}
              />
              <Button
                link
                textLabel="action.forgot"
                onPress={() => NavigationService.navigate('ForgotPassword')}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Background>
    )
  }
}

Login.propTypes = {
  login: PropTypes.func,
  loading: PropTypes.bool,
}
const mapStateToProps = (state) => ({
  loading: state.user.loginLoading,
})

const mapDispatchToProps = (dispatch) => ({
  login: (user) => dispatch(UserActions.login(user)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
