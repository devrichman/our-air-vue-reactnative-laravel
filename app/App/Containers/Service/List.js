import React, { Component } from 'react'
import { View, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import ServiceActions from 'App/Stores/Service/Actions'
import { Helpers, Images, Metrics, Colors } from 'App/Theme'
import { PropTypes } from 'prop-types'
import { Background, Header } from 'App/Components/Ui'
import DoubleIcons from 'App/Components/Service/DoubleIcons'
import NavigationService from 'App/Services/NavigationService'
import SettingsActions from 'App/Stores/Settings/Actions'

class ServiceList extends Component {
  componentDidMount() {
    this.props.getServices()
  }

  goTo(path) {
    this.props.setPreviousPage(path)
    NavigationService.navigate(path)
  }

  render() {
    return (
      <Background image={Images.background}>
        <View style={[Helpers.fill, Metrics.horizontalPadding, Metrics.verticalPadding]}>
          {this.props.listLoading ? (
            <View style={[Helpers.mainCenter, Helpers.fill]}>
              <ActivityIndicator color={Colors.main} size="large" />
            </View>
          ) : (
            <View style={Helpers.fill}>
              <DoubleIcons
                iconSize={80}
                icon1="airplane"
                icon2="helicopter"
                label1={'services.' + this.props.services[0].code}
                label2={'services.' + this.props.services[1].code}
                onPress1={this.goTo.bind(this, 'Flight')}
                onPress2={this.goTo.bind(this, 'NIY')}
                active1={this.props.services[0].active}
                active2={this.props.services[1].active}
              />
              <Header logoWidth={90} height={70} />
              <DoubleIcons
                iconSize={80}
                icon1="car"
                icon2="ferry"
                label1={'services.' + this.props.services[2].code}
                label2={'services.' + this.props.services[3].code}
                onPress1={this.goTo.bind(this, 'NIY')}
                onPress2={this.goTo.bind(this, 'NIY')}
                active1={this.props.services[2].active}
                active2={this.props.services[3].active}
              />
            </View>
          )}
        </View>
      </Background>
    )
  }
}

ServiceList.propTypes = {
  getServices: PropTypes.func,
  services: PropTypes.array,
  listLoading: PropTypes.bool,
  setPreviousPage: PropTypes.func,
}

const mapStateToProps = (state) => ({
  services: state.service.list,
  listLoading: state.service.listLoading,
})

const mapDispatchToProps = (dispatch) => ({
  getServices: () => dispatch(ServiceActions.list()),
  setPreviousPage: (page) => dispatch(SettingsActions.setPreviousPage(page)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ServiceList)
