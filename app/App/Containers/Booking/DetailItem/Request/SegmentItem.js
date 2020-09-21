import React, { Component } from 'react'
import { View } from 'react-native'
import { Text } from 'App/Components'
import { Helpers } from 'App/Theme'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Styles from '../ItemStyle'
import moment from 'moment'

class SegmentItem extends Component {
  render() {
    return (
      <View
        style={[Helpers.fill, Helpers.row, Helpers.horizontalMargin, Styles.item, Styles.itemRow]}
      >
        <View style={[Helpers.fill, Styles.horizontalPadding]}>
          <Text light>{this.props.segment.from.name}</Text>
        </View>
        <View style={[Helpers.fill, Styles.horizontalPadding]}>
          <Text light>{this.props.segment.to.name}</Text>
        </View>
        <View style={[Helpers.fill, Styles.horizontalPadding]}>
          <Text light>{moment(this.props.segment.date).format('MM/DD/YYYY')}</Text>
        </View>
      </View>
    )
  }
}

SegmentItem.propTypes = {
  segment: PropTypes.object,
}

const mapDispatchToProps = (dispatch) => ({})
const mapStateToProps = (state) => ({})
export default connect(mapStateToProps, mapDispatchToProps)(SegmentItem)
