import React, { Component } from 'react'
import { View } from 'react-native'
import { Text } from 'App/Components'
import { Helpers, Metrics, Colors, Fonts } from 'App/Theme'
import Styles from './Style'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'

class Item extends Component {
  render() {
    const message = this.props.message
    return (
      <View style={[Helpers.fill, Helpers.row, Metrics.tinyVerticalMargin, Styles.chatItem]}>
        <View style={[Metrics.tinyHorizontalPadding, Metrics.tinyVerticalPadding]}>
          <Icon
            name={message.is_admin ? 'face-agent' : 'account-circle-outline'}
            size={40}
            color={message.is_admin ? Colors.main : Colors.secondary}
          />
        </View>

        <View
          style={[
            Metrics.tinyHorizontalPadding,
            Metrics.tinyVerticalPadding,
            Helpers.mainSpaceBetween,
            Helpers.fill,
          ]}
        >
          <View>
            <View style={[Helpers.fill, Helpers.row, Helpers.crossCenter]}>
              <View style={Helpers.row}>
                <Text
                  light
                  i18n={
                    message.is_admin
                      ? 'Ambassadrice'
                      : message.author.firstname + ' ' + message.author.lastname
                  }
                  style={[
                    Fonts.style.normal,
                    message.is_admin ? Styles.adminTitle : Styles.userTitle,
                  ]}
                />
                <Text i18n={moment(message.created_at).format(' LT')} />
              </View>
            </View>
            <View style={[Helpers.row, Helpers.horizontalMargin, Fonts.style.normal]}>
              <Text bold light i18n={message.content} />
            </View>
          </View>
        </View>
      </View>
    )
  }
}

Item.propTypes = {
  message: PropTypes.object,
}

Item.defaultProps = {}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Item)
