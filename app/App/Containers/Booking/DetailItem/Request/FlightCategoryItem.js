import React, { Component } from 'react'
import { View } from 'react-native'
import { Text } from 'App/Components'
import { Helpers } from 'App/Theme'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Styles from '../ItemStyle'

class FlightCategoryItem extends Component {
  render() {
    return (
      <View
        style={[Helpers.fill, Helpers.row, Helpers.horizontalMargin, Styles.item, Styles.itemRow]}
      >
        <View style={Helpers.fill}>
          <Text light>{this.props.category.name}</Text>
        </View>
        <View style={Helpers.fill}>
          <Text light>{this.props.category.description}</Text>
        </View>
      </View>
    )
  }
}

FlightCategoryItem.propTypes = {
  category: PropTypes.object,
}

const mapDispatchToProps = (dispatch) => ({})
const mapStateToProps = (state) => ({})
export default connect(mapStateToProps, mapDispatchToProps)(FlightCategoryItem)
