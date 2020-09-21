import React from 'react'
import { View, FlatList, KeyboardAvoidingView, Platform } from 'react-native'
import { connect } from 'react-redux'
import { Helpers, Metrics, Images } from 'App/Theme'
import LocaleActions from 'App/Stores/Locale/Actions'
import UserActions from 'App/Stores/User/Actions'
import { Header, Background, Button } from 'App/Components/Ui'
import Styles from './Styles'
import { PropTypes } from 'prop-types'
import NavigationService from 'App/Services/NavigationService'
import LocaleItem from './Item'

class ChangeLanguage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
    }
  }

  componentDidMount() {
    this.props.getLocales()
    this.setState(() => ({
      user: {
        ...this.props.user,
      },
    }))
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.iso !== this.props.iso) {
      this.setState((prevState) => ({
        user: {
          ...prevState.user,
          locale_iso: this.props.iso,
        },
      }))
    }
  }

  onSubmit() {
    if (this.props.user.id !== undefined) {
      this.props.updateLanguage(this.state.user)
    }
    NavigationService.navigate(this.props.previousPage)
  }

  render() {
    return (
      <Background image={Images.background}>
        <KeyboardAvoidingView
          style={[Helpers.fill, Metrics.horizontalPadding]}
          behavior={Platform.OS === 'ios' ? 'height' : null}
        >
          <View style={Styles.titleView}>
            <Header
              title="drawer.language"
              height={50}
              withBackButton
              onPressBackButton={() => NavigationService.navigate(this.props.previousPage)}
            />
          </View>
          <View style={[Metrics.verticalPadding, Metrics.horizontalPadding]}>
            <FlatList
              contentContainerStyle={[Metrics.verticalPadding, Metrics.horizontalPadding]}
              data={this.props.locales}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => <LocaleItem locale={item} />}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
          <View style={Helpers.fill}>
            <Button
              primary
              loading={this.props.loadingLanguage}
              disabled={this.props.loadingLanguage}
              textLabel="action.confirm"
              onPress={() => this.onSubmit()}
            />
          </View>
        </KeyboardAvoidingView>
      </Background>
    )
  }
}

ChangeLanguage.propTypes = {
  updateLanguage: PropTypes.func,
  loadingLanguage: PropTypes.bool,
  user: PropTypes.object,
  iso: PropTypes.string,
  locales: PropTypes.array,
  getLocales: PropTypes.func,
  previousPage: PropTypes.string,
}

const mapStateToProps = (state) => ({
  loadingLanguage: state.user.updateLanguageLoading,
  user: state.user.user,
  iso: state.locale.iso,
  locales: state.locale.locales,
  previousPage: state.settings.previousPage,
})

const mapDispatchToProps = (dispatch) => ({
  updateLanguage: (user) => dispatch(UserActions.updateLanguage(user)),
  getLocales: () => dispatch(LocaleActions.getLocales()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ChangeLanguage)
