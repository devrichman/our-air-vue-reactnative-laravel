import React, { Component } from 'react'
import { View, ActivityIndicator, Text } from 'react-native'
import { Helpers } from 'App/Theme'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import UserActions from 'App/Stores/User/Actions'
class Logout extends Component {
  componentDidMount() {
    this.props.logout()
  }
  render() {
    return (
      <View style={[Helpers.fill, Helpers.center]}>
        {this.props.loading ? <ActivityIndicator size="large" /> : <Text>Logged out</Text>}
      </View>
    )
  }
}

Logout.propTypes = {
  loading: PropTypes.bool,
  logout: PropTypes.func,
}

const mapStateToProps = (state) => ({ loading: state.user.logoutLoading })

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(UserActions.logout()),
})
export default connect(mapStateToProps, mapDispatchToProps)(Logout)
