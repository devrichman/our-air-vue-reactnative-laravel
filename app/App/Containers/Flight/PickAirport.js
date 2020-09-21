import React, { Component } from 'react'
import { View, TextInput, FlatList, Platform, KeyboardAvoidingView, ScrollView } from 'react-native'
import { Background, Header } from 'App/Components/Ui'
import { Images, Helpers, Metrics } from 'App/Theme'
import AirportItem from './Airport/Item'
import Styles from './Airport/ItemStyle'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import FlightActions from 'App/Stores/Flight/Actions'
import NavigationService from 'App/Services/NavigationService'
import SettingsActions from 'App/Stores/Settings/Actions'

class PickAirport extends Component {
  constructor(props) {
    super(props)
    this.state = { filter: '' }
  }
  componentDidMount() {
    const { navigation } = this.props
    this.focusListener = navigation.addListener('didFocus', () => {
      this.setState({ filter: '' })
      this.props.searchAirports('')
    })
  }
  _onChangeText(text) {
    this.setState({ filter: text })
    this.props.searchAirports(text)
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
  displayAirports() {
    return (
      <FlatList
        data={this.props.airports}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={Helpers.fill}>
            <AirportItem
              airport={item}
              airportTarget={this.props.airportTarget}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
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
            title={'booking.airports'}
            height={70}
            withBackButton
            withForwardButton
            onPressBackButton={() => {
              this.props.setPreviousPage('Flight')
              NavigationService.navigate('Flight')
            }}
            onPressForwardButton={() => NavigationService.navigate('Ambassador')}
          />

          <TextInput
            style={Styles.searchBar}
            value={this.state.filter}
            onChangeText={(text) => this._onChangeText(text)}
            clearButtonMode="always"
            autoFocus
            placeholder={this.language('booking.find_airport')}
            placeholderTextColor={'#FFF'}
          />
          <ScrollView>{this.displayAirports()}</ScrollView>
        </KeyboardAvoidingView>
      </Background>
    )
  }
}

PickAirport.propTypes = {
  searchAirports: PropTypes.func,
  airports: PropTypes.array,
  airportsLoading: PropTypes.bool,
  airportTarget: PropTypes.object,
  navigation: PropTypes.object,
  lines: PropTypes.array,
  setPreviousPage: PropTypes.func,
}

const mapStateToProps = (state) => ({
  airports: state.flight.airports,
  airportsLoading: state.flight.listAirportsLoading,
  airportTarget: state.flight.airportTarget,
  lines: state.locale.lines,
})
const mapDispatchToProps = (dispatch) => ({
  searchAirports: (text) => dispatch(FlightActions.searchAirports(text)),
  setPreviousPage: (page) => dispatch(SettingsActions.setPreviousPage(page)),
})
export default connect(mapStateToProps, mapDispatchToProps)(PickAirport)
