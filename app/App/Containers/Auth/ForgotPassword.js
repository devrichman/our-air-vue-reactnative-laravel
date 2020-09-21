import React, { Component } from 'react'
import { View, Platform, KeyboardAvoidingView, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { Helpers, Metrics, Images } from 'App/Theme'
import { TextInput, Button, Background } from 'App/Components/Ui'
import { PropTypes } from 'prop-types'
import UserActions from 'App/Stores/User/Actions'
import { Text } from 'App/Components'
import LogoHeader from 'App/Components/Ui/LogoHeader'

class ForgotPassword extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
    }
  }

  _onChangeText(text) {
    this.setState({ email: text })
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
            contentContainerStyle={[Helpers.scrollSpaceAround]}
            showsVerticalScrollIndicator={false}
          >
            <View>
              <TextInput
                textLabel="user.forgot_password_email"
                placeholder="user.email_placeholder"
                light
                onChangeText={(text) => this._onChangeText(text, 'email')}
              />
              {this.props.successConfirm ? <Text light i18n={this.props.successConfirm} /> : null}
            </View>

            <View>
              <Button
                loading={this.props.loading}
                textLabel="action.send_email"
                onPress={() => this.props.sendEmail(this.state.email)}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Background>
    )
  }
}

ForgotPassword.propTypes = {
  successConfirm: PropTypes.string,
  sendEmail: PropTypes.func,
  loading: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  successConfirm: state.user.resetPasswordEmailSuccess,
  loading: state.user.resetPasswordEmailLoading,
})

const mapDispatchToProps = (dispatch) => ({
  sendEmail: (email) => dispatch(UserActions.resetPasswordEmail(email)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)
