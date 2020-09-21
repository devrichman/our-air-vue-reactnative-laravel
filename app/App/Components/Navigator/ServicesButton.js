import React, { Component } from 'react'
import NavigationService from 'App/Services/NavigationService'
import { PropTypes } from 'prop-types'
import TabButton from './TabButton'
import { connect } from 'react-redux'
import SettingsActions from 'App/Stores/Settings/Actions'

class ServicesButton extends Component {
  _onPress() {
    this.props.setPreviousPage('Services')
    NavigationService.navigate('Services')
  }

  render() {
    return (
      <TabButton
        onPress={this._onPress.bind(this)}
        title="tab.home"
        icon="airport"
        service="Services"
      />
    )
  }
}

ServicesButton.propTypes = {
  setPreviousPage: PropTypes.func,
}
const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  setPreviousPage: (page) => dispatch(SettingsActions.setPreviousPage(page)),
})
export default connect(mapStateToProps, mapDispatchToProps)(ServicesButton)
