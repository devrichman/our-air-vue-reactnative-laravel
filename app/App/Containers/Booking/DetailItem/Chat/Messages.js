import React from 'react'
import {
  FlatList,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  View,
  TouchableOpacity,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Helpers, Metrics, Images, Colors } from 'App/Theme'
import { Header, Background, TextInput } from 'App/Components/Ui'
import MessageItem from './Item'
import Styles from './Style'
import NavigationService from 'App/Services/NavigationService'
import ChatActions from 'App/Stores/Chat/Actions'
import SettingsActions from 'App/Stores/Settings/Actions'
import BookingActions from 'App/Stores/Booking/Actions'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'

import io from 'socket.io-client'
import Echo from 'laravel-echo'
import { Config } from 'App/Config'

class Messages extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      msg: '',
      channel: null,
      echoClient: null,
    }
  }
  componentDidMount() {
    this.init()
  }
  componentDidUpdate() {
    if (this.state.channel !== 'clubairways_database_conversation.' + this.props.booking.id) {
      this.state.echoClient.leave(this.state.channel)
      this.init()
      this.flatlistRef.scrollToIndex({ index: 0, animatied: false })
    }
  }
  componentWillUnmount() {
    this.state.echoClient.leave(this.state.channel)
  }
  init() {
    const echoClient = new Echo({
      broadcaster: 'socket.io',
      client: io,
      host: Config.ECHO_URL,
    })
    const channel = 'clubairways_database_conversation.' + this.props.booking.id
    echoClient.channel(channel).listen('NewMessage', (data) => {
      this.realTimeMessage(data)
    })
    this.setState({
      channel: channel,
      echoClient: echoClient,
    })
  }
  realTimeMessage(message) {
    this.setState({
      msg: '',
    })
    this.props.appendMessage(message)
    this.props.addLastMessage(message)
  }
  sendMessage() {
    this.props.newMessage(this.props.booking.id, this.state.msg)
    this.flatlistRef.scrollToIndex({ index: 0, animatied: false })
    this.setState({
      msg: '',
    })
  }
  _onChangeText(text) {
    this.setState({
      msg: text,
    })
  }
  render() {
    return (
      <Background image={Images.background}>
        <KeyboardAvoidingView
          style={[Helpers.fill, Metrics.horizontalPadding]}
          behavior={Platform.OS === 'ios' ? 'height' : null}
        >
          <Header
            title={'booking.chat'}
            description="booking.chat"
            height={50}
            withBackButton
            withForwardButton
            onPressBackButton={() => {
              this.props.setPreviousPage('BookingDetail')
              NavigationService.navigate('BookingDetail')
            }}
            onPressForwardButton={() => NavigationService.navigate('Ambassador')}
          />
          {this.props.messages.length > 0 ? (
            <FlatList
              ref={(ref) => (this.flatlistRef = ref)}
              onEndReachedThreshold={0.01}
              inverted={true}
              data={this.props.messages}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => {
                return <MessageItem message={item} key={'message' + item.id.toString()} />
              }}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <ActivityIndicator size="large" color={Colors.white} />
          )}
          <View style={Helpers.row}>
            <View style={Styles.fillText}>
              <TextInput
                placeholder="chat.placeholder"
                placeholderTextColor={Colors.grey}
                light
                bold
                value={this.state.msg}
                onChangeText={(text) => this._onChangeText(text)}
                onSubmitEditing={() => this.sendMessage()}
              />
            </View>
            <View style={Styles.fillButton}>
              <TouchableOpacity onPress={this.sendMessage.bind(this)}>
                <Icon name="send" size={30} color={Colors.white} />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Background>
    )
  }
}

Messages.propTypes = {
  booking: PropTypes.object,
  setPreviousPage: PropTypes.func,
  newMessage: PropTypes.func,
  appendMessage: PropTypes.func,
  addLastMessage: PropTypes.func,
  messages: PropTypes.array,
}

const mapStateToProps = (state) => ({
  booking: state.booking.booking,
  messages: state.chat.messages,
})

const mapDispatchToProps = (dispatch) => ({
  setPreviousPage: (page) => dispatch(SettingsActions.setPreviousPage(page)),
  newMessage: (bookingId, content) => dispatch(ChatActions.newMessage(bookingId, content)),
  appendMessage: (message) => dispatch(ChatActions.appendMessage(message)),
  addLastMessage: (message) => dispatch(BookingActions.addLastMessage(message)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Messages)
