import React, { Component } from 'react'
import { ScrollView, View, KeyboardAvoidingView, Platform } from 'react-native'
import { TextInput, Button, Background, Picker, IOSPicker } from 'App/Components/Ui'
import { Text } from 'App/Components'
import { connect } from 'react-redux'
import UserActions from 'App/Stores/User/Actions'
import GenderActions from 'App/Stores/Gender/Actions'
import { PropTypes } from 'prop-types'
import { Helpers, Metrics, Images } from 'App/Theme'
import LogoHeader from 'App/Components/Ui/LogoHeader'
import PhoneInput from 'react-native-phone-input'

class StepTwo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: this.props.user,
      selectedValue: '0',
    }
  }

  componentDidMount() {
    this.props.getGenders()
    this.setState((prevState) => ({
      user: {
        ...prevState.user,
        gender_id: 0,
      },
    }))
  }

  _onChangeText(text, key) {
    this.setState((prevState) => ({
      user: {
        ...prevState.user,
        [key]: text,
        locale_iso: this.props.iso,
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
          locale_iso: this.props.iso,
        },
      }))
    }
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
          this.setState((prevState) => ({
            user: {
              ...prevState.user,
              gender_id: buttonIndex,
            },
          }))
        }
      }
    )
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
                  textLabel="user.lastname"
                  placeholder="user.lastname_placeholder"
                  onChangeText={(text) => this._onChangeText(text, 'lastname')}
                />
                <TextInput
                  light
                  textLabel="user.firstname"
                  placeholder="user.firstname_placeholder"
                  onChangeText={(text) => this._onChangeText(text, 'firstname')}
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
                    selectedValue={this.state.selectedValue}
                    onValueChange={(itemValue) => this.setSelectedValue(itemValue)}
                    pickerItems={this.props.gendersText}
                  />
                )}
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
                  onChangePhoneNumber={(text) => this._onChangeText(text, 'phone')}
                />
              </View>
              <View>
                <Button
                  textLabel="action.register"
                  onPress={() => {
                    this.props.steptwo(this.state.user)
                  }}
                  disabled={this.props.loading}
                  loading={this.props.loading}
                />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Background>
    )
  }
}

StepTwo.propTypes = {
  steptwo: PropTypes.func,
  loading: PropTypes.bool,
  user: PropTypes.object,
  genders: PropTypes.array,
  gendersText: PropTypes.array,
  getGenders: PropTypes.func,
  iso: PropTypes.string,
  lines: PropTypes.array,
}

const mapStateToProps = (state) => ({
  loading: state.user.steptwoLoading,
  user: state.user.pending_user,
  genders: state.gender.genders,
  gendersText: state.gender.gendersText,
  iso: state.locale.iso,
  lines: state.locale.lines,
})

const mapDispatchToProps = (dispatch) => ({
  steptwo: (user) => dispatch(UserActions.steptwo(user)),
  getGenders: () => dispatch(GenderActions.getGenders()),
})

export default connect(mapStateToProps, mapDispatchToProps)(StepTwo)
