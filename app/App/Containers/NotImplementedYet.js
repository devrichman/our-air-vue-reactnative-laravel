import React from 'react'
import { KeyboardAvoidingView, Platform, View } from 'react-native'
import { connect } from 'react-redux'
import { Metrics, Helpers, Fonts, Images } from 'App/Theme'
import Text from 'App/Components/AppText'
import { Button, Background, Header } from 'App/Components/Ui'
import PropTypes from 'prop-types'
import SettingsActions from 'App/Stores/Settings/Actions'
import NavigationService from 'App/Services/NavigationService'

class NotImplementedYet extends React.Component {
  _onSubmit() {
    this.props.navigation.goBack()
  }

  render() {
    return (
      <Background image={Images.background}>
        <KeyboardAvoidingView
          style={[Helpers.fill, Metrics.horizontalPadding]}
          behavior={Platform.OS === 'ios' ? 'height' : null}
        >
          <Header
            title=""
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

          <View style={[Helpers.fill, Helpers.mainCenter]}>
            <Text
              style={[Fonts.style.h1, Metrics.mediumVerticalPadding]}
              i18n="services.not_implemented"
              light
            ></Text>
            <Button
              textLabel="action.back"
              style={Helpers.selfStretch}
              onPress={this._onSubmit.bind(this)}
            />
          </View>
        </KeyboardAvoidingView>
      </Background>
    )
  }
}

NotImplementedYet.propTypes = {
  navigation: PropTypes.any,
  setPreviousPage: PropTypes.func,
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  setPreviousPage: (page) => dispatch(SettingsActions.setPreviousPage(page)),
})

export default connect(mapStateToProps, mapDispatchToProps)(NotImplementedYet)
