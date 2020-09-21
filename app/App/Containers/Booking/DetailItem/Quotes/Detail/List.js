import React from 'react'
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from 'react-native'
import Pdf from 'react-native-pdf'
import Text from 'App/Components/AppText'
import { connect } from 'react-redux'
import { Helpers, Metrics, Images, ApplicationStyles } from 'App/Theme'
import { Background, Header, Button } from 'App/Components/Ui'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { PropTypes } from 'prop-types'
import AircraftItem from '../../Request/AircraftItem'

import Styles from '../../ItemStyle'
import NavigationService from 'App/Services/NavigationService'

import OptionItem from 'App/Components/Option/Item'
import ConfirmationItem from 'App/Components/Flight/Confirmation/Item'
import { Config } from 'App/Config'
import moment from 'moment'
import SettingsActions from 'App/Stores/Settings/Actions'
import BookingActions from 'App/Stores/Booking/Actions'

class QuoteDetailList extends React.Component {
  state = {
    modalVisible: false,
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible })
  }
  onPrevious() {
    this.props.setPreviousPage('BookingDetailQuotes')
    NavigationService.navigate('BookingDetailQuotes')
  }
  acceptQuote() {
    this.props.sign(this.props.quote.id)
  }

  render() {
    const { segments, options } = this.props.quote
    const source = {
      uri: this.props.quote.assets
        ? Config.API_URL + '/storage/' + this.props.quote.assets.path
        : '',
    }
    return (
      <Background image={Images.background}>
        <KeyboardAvoidingView
          style={[Helpers.fill, Metrics.horizontalPadding]}
          behavior={Platform.OS === 'ios' ? 'height' : null}
        >
          <ScrollView
            contentContainerStyle={Helpers.scrollSpaceBetween}
            showsVerticalScrollIndicator={false}
          >
            <View style={Styles.ListView}>
              <Header
                title="booking.request"
                height={50}
                withBackButton
                onPressBackButton={() => {
                  this.props.setPreviousPage('BookingDetailQuotes')
                  NavigationService.navigate('BookingDetailQuotes')
                }}
                withForwardButton
                onPressForwardButton={() => NavigationService.navigate('Ambassador')}
              />
            </View>
            <View>
              {Object.entries(segments).map(([key, segment]) => {
                return (
                  <View key={key} style={[Metrics.verticalMargin, ApplicationStyles.borderBottom]}>
                    <View style={[Helpers.row, Helpers.mainSpaceBetween]}>
                      <View style={Helpers.fill}>
                        <ConfirmationItem
                          bold
                          icon="airplane-takeoff"
                          info={segment.from.name ? segment.from.name : '-'}
                        />
                      </View>
                      <View style={Helpers.fill}>
                        <ConfirmationItem
                          bold
                          icon="airplane-landing"
                          info={segment.to.name ? segment.to.name : '-'}
                        />
                      </View>
                    </View>
                    <ConfirmationItem
                      bold
                      icon="calendar"
                      info={moment(segment.date).format('LLL')}
                    />
                    <ConfirmationItem
                      bold
                      icon="account"
                      info={(segment.pax ? segment.pax : 1).toString()}
                    />
                  </View>
                )
              })}
            </View>
            <View style={[Metrics.verticalPadding, Metrics.horizontalPadding]}>
              <FlatList
                data={this.props.quote.aircrafts}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                  <AircraftItem aircraft={item} keyExtractor={'aircraft' + index.toString()} />
                )}
                keyExtractor={(item, index) => item.type + index.toString()}
              />
            </View>

            {/* <View> */}
            {/*  <Text light bold i18n="booking.aircraft" style={[Metrics.verticalMargin]} /> */}
            {/*  {Object.entries(categories).map(([key, category]) => { */}
            {/*    return <CategoryItem key={key} selection={false} category={category} /> */}
            {/*  })} */}
            {/* </View> */}

            <View style={Metrics.verticalMargin}>
              <Text light bold i18n="booking.options" style={Metrics.verticalMargin} />
              {Object.entries(options).map(([key, option]) => {
                return (
                  <OptionItem
                    withIcon={false}
                    selection={false}
                    key={key}
                    item={option}
                    withDescription={true}
                  />
                )
              })}
            </View>
            <View style={[Metrics.verticalPadding, Metrics.horizontalPadding]}>
              <Button
                disabled={!this.props.quote.assets}
                textLabel="booking.show_contract"
                onPress={() => this.setModalVisible(true)}
              />
              <View>
                <Modal animationType="slide" transparent={false} visible={this.state.modalVisible}>
                  <SafeAreaView style={Helpers.fill}>
                    <View>
                      <TouchableOpacity onPress={() => this.setModalVisible(false)}>
                        <View>
                          <Icon name="close" size={30} style={Helpers.textRight} />
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.container}>
                      <Pdf source={source} style={styles.pdf} />
                    </View>
                  </SafeAreaView>
                </Modal>
              </View>
            </View>
            <Button
              textLabel="booking.accept"
              onPress={this.acceptQuote.bind(this)}
              loading={this.props.signatureLoading}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </Background>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
})

QuoteDetailList.propTypes = {
  quote: PropTypes.object,
  setPreviousPage: PropTypes.func,
  sign: PropTypes.func,
  signatureLoading: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  quote: state.booking.quote,
  signature: state.booking.signature,
  signatureLoading: state.booking.signatureLoading,
})

const mapDispatchToProps = (dispatch) => ({
  setPreviousPage: (page) => dispatch(SettingsActions.setPreviousPage(page)),
  sign: (quoteId) => dispatch(BookingActions.sign(quoteId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(QuoteDetailList)
