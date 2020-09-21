import React, { Component } from 'react'
import { View, Platform, KeyboardAvoidingView, ScrollView, Switch } from 'react-native'
import { TextInput, Button, Background, Header, Picker, IOSPicker } from 'App/Components/Ui'
import { Text } from 'App/Components'
import { connect } from 'react-redux'
import { Helpers, Metrics, Images, Colors } from 'App/Theme'
import UserActions from 'App/Stores/User/Actions'
import GenderActions from 'App/Stores/Gender/Actions'
import NavigationService from 'App/Services/NavigationService'
import SettingsActions from 'App/Stores/Settings/Actions'
import { PropTypes } from 'prop-types'
import PhoneInput from 'react-native-phone-input'

class Account extends Component {
  constructor(props) {
    super(props)
    this.state = { user: {} }
  }

  componentDidMount() {
    this.props.getGenders()
    this.setState(() => ({
      user: {
        id: this.props.user.id,
        lastname: this.props.user.lastname,
        firstname: this.props.user.firstname,
        email: this.props.user.email,
        phone: this.props.user.phone,
        gender_id: this.props.user.gender_id,
        locale_id: this.props.user.locale_id,
        old_password: '',
        password: '',
        password_confirmation: '',
        updatepassword: false,
      },
    }))
  }

  _onChangeText(text, key) {
    this.setState((prevState) => ({
      user: {
        ...prevState.user,
        [key]: text,
      },
    }))
  }

  setSelectedValue(value) {
    if (value !== 0) {
      this.setState((prevState) => ({
        selectedValue: value,
        user: {
          ...prevState.user,
          gender_id: value,
        },
      }))
    }
  }

  toggleSwitch() {
    this.setState((prevState) => ({
      user: {
        ...prevState.user,
        updatepassword: !this.state.user.updatepassword,
      },
    }))
  }

  changeGender() {
    const options = this.props.lines
      .filter(
        (
          { full_key } // eslint-disable-line camelcase
        ) =>
          full_key === 'user.gender_m' || // eslint-disable-line camelcase
          full_key === 'user.gender_f' || // eslint-disable-line camelcase
          full_key === 'user.gender_cancel' // eslint-disable-line camelcase
      )
      .map(({ translation }) => translation)
    IOSPicker.showActionSheetWithOptions(
      {
        options: [...options, 'Cancel'],
        cancelButtonIndex: 2,
      },
      (buttonIndex) => {
        if (buttonIndex === 2) {
          // cancel action
        } else {
          this.setState({
            ...this.state,
            gender_id: buttonIndex,
          })
        }
      }
    )
  }

  render() {
    return (
      <Background image={Images.background}>
        <KeyboardAvoidingView
          style={[Helpers.fill, Metrics.horizontalPadding]}
          behavior={Platform.OS === 'ios' ? 'height' : null}
        >
          <Header
            title="user.informations"
            description=""
            withBackButton
            withForwardButton
            onPressBackButton={() => {
              this.props.setPreviousPage('Services')
              NavigationService.navigate('Services')
            }}
            onPressForwardButton={() => NavigationService.navigate('Ambassador')}
            height={70}
          />
          <ScrollView
            contentContainerStyle={Helpers.scrollSpaceAround}
            showsVerticalScrollIndicator={false}
          >
            <View style={Helpers.fill}>
              <TextInput
                textLabel="user.firstname"
                light
                onChangeText={(text) => this._onChangeText(text, 'firstname')}
                value={this.state.user.firstname}
              />
              <TextInput
                textLabel="user.lastname"
                light
                onChangeText={(text) => this._onChangeText(text, 'lastname')}
                value={this.state.user.lastname}
              />
              {Platform.OS === 'ios' ? (
                <View>
                  <Text light bold i18n="user.gender" />
                  <Text light>
                    {this.props.gendersText[this.state.gender_id ? this.state.gender_id : 0]}
                  </Text>
                  <Button onPress={this.changeGender.bind(this)} textLabel="user.change_gender" />
                </View>
              ) : (
                <Picker
                  light
                  textLabel="user.gender"
                  placeholder="user.gender_placeholder"
                  selectedValue={this.state.user.gender_id}
                  onValueChange={(itemValue) => this.setSelectedValue(itemValue)}
                  pickerItems={this.props.gendersText}
                />
              )}
              <TextInput
                textLabel="user.email"
                light
                onChangeText={(text) => this._onChangeText(text, 'email')}
                value={this.state.user.email}
              />
              <PhoneInput
                ref={(ref) => {
                  this.phone = ref
                }}
                initialCountry={'fr'}
                textComponent={TextInput}
                textProps={{
                  textLabel: 'user.phone',
                  placeholder: 'user.phone_placeholder',
                  light: true,
                }}
                value={this.state.user.phone}
                onChangePhoneNumber={(text) => this._onChangeText(text, 'phone')}
              />
              <View style={[Helpers.row, Helpers.crossCenter]}>
                <Switch
                  style={Metrics.mediumVerticalMargin}
                  thumbColor={Colors.secondary}
                  trackColor={{ false: Colors.mainTransparent, true: Colors.main }}
                  onValueChange={this.toggleSwitch.bind(this)}
                  value={this.state.user.updatepassword}
                />
                <Text
                  style={Metrics.horizontalMargin}
                  light
                  i18n={
                    this.state.user.updatepassword
                      ? 'user.update_password'
                      : 'user.not_update_password'
                  }
                />
              </View>

              {this.state.user.updatepassword ? (
                <View>
                  <TextInput
                    textLabel="user.old_password"
                    secureTextEntry
                    light
                    placeholder="user.password_placeholder"
                    onChangeText={(text) => this._onChangeText(text, 'old_password')}
                  />
                  <TextInput
                    textLabel="user.new_password"
                    secureTextEntry
                    light
                    placeholder="user.new_password_placeholder"
                    onChangeText={(text) => this._onChangeText(text, 'password')}
                  />
                  <TextInput
                    textLabel="user.new_password_confirmation"
                    secureTextEntry
                    light
                    placeholder="user.new_password_confirmation_placeholder"
                    onChangeText={(text) => this._onChangeText(text, 'password_confirmation')}
                  />
                </View>
              ) : null}
            </View>

            <View style={Helpers.fill}>
              <Button
                loading={this.props.loading}
                onPress={() => this.props.update(this.state.user)}
                disabled={this.props.loading || this.props.getGendersLoading}
                textLabel="action.update_account"
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Background>
    )
  }
}

Account.propTypes = {
  update: PropTypes.func,
  loading: PropTypes.bool,
  user: PropTypes.object,
  lines: PropTypes.array,
  setPreviousPage: PropTypes.func,
  genders: PropTypes.array,
  gendersText: PropTypes.array,
  getGenders: PropTypes.func,
  getGendersLoading: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  loading: state.user.updateLoading,
  user: state.user.user,
  lines: state.locale.lines,
  genders: state.gender.genders,
  gendersText: state.gender.gendersText,
  getGendersLoading: state.gender.getGendersLoading,
})

const mapDispatchToProps = (dispatch) => ({
  update: (user) => dispatch(UserActions.update(user)),
  setPreviousPage: (page) => dispatch(SettingsActions.setPreviousPage(page)),
  getGenders: () => dispatch(GenderActions.getGenders()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Account)
