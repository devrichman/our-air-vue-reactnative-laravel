import React from 'react'
import { View, KeyboardAvoidingView, Platform, Linking, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { Helpers, Metrics, Images, Fonts } from 'App/Theme'
import { Header, Background, Button } from 'App/Components/Ui'
import { Text } from 'App/Components'
import Styles from './Styles'
import AmbassadorItem from './Item'
import NavigationService from 'App/Services/NavigationService'
import { Config } from 'App/Config'
import { PropTypes } from 'prop-types'

class AmbassadorList extends React.Component {
  componentDidMount() {}
  render() {
    const ambassadors = [
      {
        name: 'ambassador.one',
        picture: Config.API_URL + '/assets/images/ambassador/' + '01.jpg',
      },
      { name: 'ambassador.two', picture: Config.API_URL + '/assets/images/ambassador/' + '02.jpg' },
      {
        name: 'ambassador.three',
        picture: Config.API_URL + '/assets/images/ambassador/' + '03.jpg',
      },
    ]
    return (
      <Background image={Images.background}>
        <KeyboardAvoidingView
          style={[Helpers.fill, Metrics.horizontalPadding]}
          behavior={Platform.OS === 'ios' ? 'height' : null}
        >
          <View style={Styles.titleView}>
            <Header
              title="ambassador.title"
              height={50}
              withBackButton
              onPressBackButton={() => NavigationService.navigate(this.props.previousPage)}
            />
          </View>
          <ScrollView
            contentContainerStyle={Helpers.scrollSpaceBetween}
            showsVerticalScrollIndicator={false}
          >
            <View style={Metrics.verticalPadding}>
              <View style={Helpers.row}>
                <View style={Helpers.fill}>
                  <AmbassadorItem
                    ambassadorName={ambassadors[0].name}
                    picture={ambassadors[0].picture}
                    keyExtractor={ambassadors[0].name}
                  />
                </View>
                <View style={Helpers.fill}>
                  <AmbassadorItem
                    ambassadorName={ambassadors[1].name}
                    picture={ambassadors[1].picture}
                    keyExtractor={ambassadors[1].name}
                  />
                </View>
              </View>
              <View style={[Helpers.row, Metrics.smallVerticalMargin]}>
                <View style={Helpers.fill}>
                  <AmbassadorItem
                    ambassadorName={ambassadors[2].name}
                    picture={ambassadors[2].picture}
                    keyExtractor={ambassadors[2].name}
                  />
                </View>
              </View>
            </View>
            <View>
              <Text
                bold
                light
                i18n="ambassador.action_title"
                style={[Fonts.style.title, Fonts.style.medium, Helpers.textCenter]}
              />
            </View>
            <View>
              <Button
                primary
                textLabel="ambassador.phone"
                onPress={() => Linking.openURL('tel://' + this.props.phone)}
              />
              <Button
                primary
                textLabel="ambassador.email"
                onPress={() => Linking.openURL('mailto:' + this.props.mail)}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Background>
    )
  }
}

AmbassadorList.propTypes = {
  phone: PropTypes.string,
  mail: PropTypes.string,
  previousPage: PropTypes.string,
}

const mapStateToProps = (state) => ({
  phone: state.settings.phone,
  mail: state.settings.email,
  previousPage: state.settings.previousPage,
})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(AmbassadorList)
