import { createBottomTabNavigator } from 'react-navigation-tabs'

import ServiceList from 'App/Containers/Service/List'
import NIY from 'App/Containers/NotImplementedYet'
import Ambassador from 'App/Containers/Ambassador/List'
import NavigatorBookingButton from 'App/Components/Navigator/BookingButton'
import NavigatorAmbassadorButton from 'App/Components/Navigator/AmbassadorButton'
import NavigatorServicesButton from 'App/Components/Navigator/ServicesButton'
import NavigatorMoreButton from 'App/Components/Navigator/MoreButton'
import Login from 'App/Containers/Auth/Login'
import Logout from 'App/Containers/Auth/Logout'
import StepOne from 'App/Containers/Auth/Register/StepOne'
import StepTwo from 'App/Containers/Auth/Register/StepTwo'
import ResetPassword from 'App/Containers/Auth/ResetPassword'
import ForgotPassword from 'App/Containers/Auth/ForgotPassword'
import TabBarComponent from 'App/Components/TabBar'
import Options from 'App/Containers/Option/List'
import Bookings from 'App/Containers/Booking/List'
import BookingDetail from 'App/Containers/Booking/Detail'
import BookingDetailRequest from 'App/Containers/Booking/DetailItem/Request/List'
import BookingDetailQuotes from 'App/Containers/Booking/DetailItem/Quotes/List'
import BookingDetailChat from 'App/Containers/Booking/DetailItem/Chat/Messages'
import BookingDetailQuoteDetail from 'App/Containers/Booking/DetailItem/Quotes/Detail/List'
import Search from 'App/Containers/Flight/Search'
import FlightCategories from 'App/Containers/Flight/Categories'
import PickAirport from 'App/Containers/Flight/PickAirport'
import GeneralTerms from 'App/Containers/Settings/GeneralTerms'
import ConfirmationSummary from 'App/Containers/Flight/Confirmation/Summary'
import ChangeLanguage from 'App/Containers/Locale/ChangeLanguage'
import BookingCheck from 'App/Containers/Flight/Confirmation/Check'
import Account from 'App/Containers/Auth/Account'
import BookingSign from 'App/Containers/Booking/Sign'
import BookingPayLoading from 'App/Containers/Booking/PayLoading'
import BookingPay from 'App/Containers/Booking/Pay'

export default createBottomTabNavigator(
  {
    Services: {
      screen: ServiceList,
      navigationOptions: {
        tabBarButtonComponent: NavigatorServicesButton,
      },
    },
    Ambassador: {
      screen: Ambassador,
      navigationOptions: {
        tabBarButtonComponent: NavigatorAmbassadorButton,
      },
    },
    Booking: {
      screen: NIY,
      navigationOptions: {
        tabBarButtonComponent: NavigatorBookingButton,
      },
    },
    More: {
      screen: () => {},
      navigationOptions: {
        tabBarButtonComponent: NavigatorMoreButton,
      },
    },

    Login: Login,
    StepOne: StepOne,
    StepTwo: StepTwo,
    ForgotPassword: ForgotPassword,
    ResetPassword: {
      screen: ResetPassword,
      path: 'reset/password/:token/:email',
    },
    Account: Account,
    Requests: NIY,
    GeneralTerms: GeneralTerms,
    Logout: Logout,
    Flight: Search,
    Options: Options,
    Bookings: Bookings,
    BookingDetail: BookingDetail,
    BookingDetailRequest: BookingDetailRequest,
    BookingDetailQuotes: BookingDetailQuotes,
    BookingDetailChat: BookingDetailChat,
    BookingDetailQuoteDetail: BookingDetailQuoteDetail,
    ChangeLanguage: ChangeLanguage,
    FlightCategories: FlightCategories,
    PickAirport: PickAirport,
    ConfirmationSummary: ConfirmationSummary,
    BookingCheck: BookingCheck,
    BookingSign: BookingSign,
    BookingPayLoading: BookingPayLoading,
    BookingPay: BookingPay,
    NIY: NIY,
  },
  {
    initialRouteName: 'Services',
    tabBarPosition: 'bottom',
    tabBarOptions: {
      upperCaseLabel: false,
      style: {
        backgroundColor: '#fff',
        height: 70,
      },
      scrollEnabled: true,
      keyboardHidesTabBar: true,
    },
    backBehavior: 'history',
    tabBarComponent: TabBarComponent,
  }
)
