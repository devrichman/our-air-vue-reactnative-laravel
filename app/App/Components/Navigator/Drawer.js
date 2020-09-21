import React, { Component } from 'react'
import { View, ScrollView, SafeAreaView, Linking } from 'react-native'
import NavigationService from 'App/Services/NavigationService'
import { PropTypes } from 'prop-types'
import NavigatorDrawerItem from 'App/Components/Navigator/DrawerItem'
import { Helpers } from 'App/Theme'
import { connect } from 'react-redux'
import { isConnected } from 'App/Stores/User/Selectors'
import SettingsActions from 'App/Stores/Settings/Actions'

class NavigatorDrawer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      navigation: [
        {
          onPress: () => NavigationService.navigate('Login'),
          icon: 'login',
          label: 'drawer.login',
          displayIfConnected: false,
          toDisplayAnonymously: false,
        },
        {
          onPress: () => NavigationService.navigate('Account'),
          icon: 'chevron-right',
          label: 'drawer.account',
          displayIfConnected: true,
          toDisplayAnonymously: false,
        },
        {
          onPress: () => {
            this.props.setPreviousPage('Bookings')
            NavigationService.navigate('Bookings')
          },
          icon: 'chevron-right',
          label: 'drawer.request',
          displayIfConnected: true,
          toDisplayAnonymously: false,
        },
        {
          onPress: () => Linking.openURL('tel://' + this.props.phone),
          icon: 'phone',
          label: 'drawer.callus',
          toDisplayAnonymously: true,
        },
        {
          onPress: () => Linking.openURL('mailto:' + this.props.mail),
          icon: 'email',
          label: 'drawer.emailus',
          toDisplayAnonymously: true,
        },
        {
          onPress: () => NavigationService.navigate('ChangeLanguage'),
          icon: 'earth',
          label: 'drawer.language',
          toDisplayAnonymously: true,
        },
        {
          onPress: () => NavigationService.navigate('GeneralTerms'),
          icon: 'gavel',
          label: 'drawer.cgu_cgv',
          toDisplayAnonymously: true,
        },
        {
          onPress: () => NavigationService.navigate('Logout'),
          icon: 'chevron-right',
          label: 'drawer.logout',
          displayIfConnected: true,
          toDisplayAnonymously: false,
        },
      ],
    }
  }
  language(text) {
    let trans = null
    if (text !== null) {
      trans =
        Object.keys(this.props.lines).length > 0
          ? this.props.lines.find((item) => item.full_key === text)
          : undefined
      if (trans === undefined) {
        trans = text
      } else {
        trans = trans.translation
      }
    }
    return trans
  }
  displayDrawerItems() {
    return (
      <ScrollView>
        <SafeAreaView style={Helpers.fill} forceInset={{ top: 'always', horizontal: 'never' }}>
          {this.state.navigation.map((item, index) =>
            // Display if user anonymous or user connected and display if connected or user disconnected and display if not connected

            item.toDisplayAnonymously ||
            (item.displayIfConnected && this.props.isConnected) ||
            (!item.displayIfConnected && !this.props.isConnected) ? (
              <NavigatorDrawerItem
                key={index}
                onPress={item.onPress}
                icon={item.icon}
                label={this.language(item.label)}
              />
            ) : null
          )}
        </SafeAreaView>
      </ScrollView>
    )
  }
  render() {
    return <View style={Helpers.fill}>{this.displayDrawerItems()}</View>
  }
}

NavigatorDrawer.propTypes = {
  user: PropTypes.object,
  isConnected: PropTypes.bool,
  phone: PropTypes.string,
  mail: PropTypes.string,
  lines: PropTypes.array,
  setPreviousPage: PropTypes.func,
}
const mapStateToProps = (state) => ({
  user: state.user.user,
  isConnected: isConnected(state),
  phone: state.settings.phone,
  mail: state.settings.email,
  lines: state.locale.lines,
})
const mapDispatchToProps = (dispatch) => ({
  setPreviousPage: (page) => dispatch(SettingsActions.setPreviousPage(page)),
})
export default connect(mapStateToProps, mapDispatchToProps, null)(NavigatorDrawer)
