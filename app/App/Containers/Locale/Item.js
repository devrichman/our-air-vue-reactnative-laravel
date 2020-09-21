import React from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import Text from 'App/Components/AppText'
import { connect } from 'react-redux'
import { Helpers } from 'App/Theme'
import LocaleActions from 'App/Stores/Locale/Actions'
import Styles from './Styles'
import { PropTypes } from 'prop-types'
import { Config } from 'App/Config'
import moment from 'moment'

class Item extends React.Component {
  changeLocale(iso) {
    this.props.getLines(iso)
    this.props.setLocale(iso)
    moment.locale(iso)
  }

  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.changeLocale(this.props.locale.iso)
        }}
      >
        <View
          key={this.props.locale.iso}
          style={[Helpers.fill, Helpers.horizontalMargin, Styles.buttonContainer]}
        >
          <Image
            style={Styles.flagImage}
            source={{
              uri: Config.API_URL + '/assets/images/flag/' + this.props.locale.flag + '.png',
            }}
          />
          <Text light bold>
            {this.props.locale.language_label}
          </Text>
          <View style={Styles.circle}>
            {this.props.iso === this.props.locale.iso && <View style={Styles.checkedCircle} />}
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

Item.propTypes = {
  locale: PropTypes.object,
  iso: PropTypes.string,
  setLocale: PropTypes.func,
  getLines: PropTypes.func,
}

const mapStateToProps = (state) => ({
  iso: state.locale.iso,
})

const mapDispatchToProps = (dispatch) => ({
  setLocale: (locale) => dispatch(LocaleActions.setLocale(locale)),
  getLines: (locale) => dispatch(LocaleActions.getLines(locale)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Item)
