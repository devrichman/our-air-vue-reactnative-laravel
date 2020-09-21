import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import NavigationService from 'App/Services/NavigationService'
import AppNavigator from 'App/Navigators/AppNavigator'
import styles from './RootScreenStyle'
import { connect } from 'react-redux'
import StartupActions from 'App/Stores/Startup/Actions'
import CommonActions from 'App/Stores/Common/Actions'
import { PropTypes } from 'prop-types'
import DropdownAlert from 'react-native-dropdownalert'
import { Colors } from 'App/Theme'

import moment from 'moment'
import 'moment/min/locales'

class RootScreen extends Component {
  componentDidMount() {
    moment.locale(this.props.localeIso)
    this.props.startup()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.showAlert === false && this.props.showAlert === true) {
      const { type, title, message } = this.props.alert
      this.dropdown.alertWithType(type, title, message)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={Colors.main} barStyle="light-content" />
        <AppNavigator
          uriPrefix={'clubairways://'}
          ref={(navigatorRef) => {
            NavigationService.setTopLevelNavigator(navigatorRef)
          }}
        />
        <DropdownAlert
          ref={(ref) => (this.dropdown = ref)}
          onClose={this.props.onCloseAlert}
          closeInterval={7000}
          updateStatusBar={false}
          defaultContainer={{ padding: 8, flexDirection: 'row' }}
        />
      </View>
    )
  }
}

RootScreen.propTypes = {
  startup: PropTypes.func,
  showAlert: PropTypes.bool,
  alert: PropTypes.object,
  onCloseAlert: PropTypes.func,
  localeIso: PropTypes.string,
}

const mapStateToProps = (state) => ({
  showAlert: state.common.showAlert,
  alert: state.common.alert,
  localeIso: state.locale.iso,
})

const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup()),
  onCloseAlert: () => dispatch(CommonActions.closeAlert()),
})

export default connect(mapStateToProps, mapDispatchToProps)(RootScreen)
