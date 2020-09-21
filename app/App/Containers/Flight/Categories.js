import React, { Component } from 'react'
import { View, FlatList, KeyboardAvoidingView, Platform } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import FlightCategoryItem from './Category/Item'
import { Button, Background, Header } from 'App/Components/Ui'
import { Images, Metrics, Helpers } from 'App/Theme'
import NavigationService from 'App/Services/NavigationService'
import SettingsActions from 'App/Stores/Settings/Actions'

class Categories extends Component {
  state = {
    nbSelected: 0,
  }

  updateSelectedNumber(update) {
    this.setState({ nbSelected: this.state.nbSelected + update })
  }

  next() {
    if (this.state.nbSelected > 0 && this.state.nbSelected <= 2) {
      this.props.setPreviousPage('Options')
      NavigationService.navigate('Options', {
        category: 'flight',
      })
    }
  }

  render() {
    return (
      <Background image={Images.background}>
        <KeyboardAvoidingView
          style={[Helpers.fill, Metrics.horizontalPadding]}
          enabled={Platform.OS === 'ios'}
          behavior="height"
        >
          <Header
            title={'booking.categories'}
            height={70}
            withBackButton
            withForwardButton
            onPressBackButton={() => {
              this.props.setPreviousPage('Flight')
              NavigationService.navigate('Flight')
            }}
            onPressForwardButton={() => NavigationService.navigate('Ambassador')}
          />
          <FlatList
            style={Metrics.topMargin}
            data={this.props.categories}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={Helpers.fill}>
                <FlightCategoryItem
                  category={item}
                  keyExtractor={(item) => item.id.toString()}
                  updateSelected={this.updateSelectedNumber.bind(this)}
                />
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
          <Button textLabel="action.next" onPress={this.next.bind(this)} />
        </KeyboardAvoidingView>
      </Background>
    )
  }
}

Categories.propTypes = {
  categories: PropTypes.array,
  setPreviousPage: PropTypes.func,
}

const mapStateToProps = (state) => ({
  categories: state.flight.categories,
})

const mapDispatchToProps = (dispatch) => ({
  setPreviousPage: (page) => dispatch(SettingsActions.setPreviousPage(page)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Categories)
