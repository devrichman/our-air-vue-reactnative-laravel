import React from 'react'
import { Dimensions, View, ActivityIndicator } from 'react-native'
import Image from 'App/Components/ScalableImage'
import { Images, Helpers, Metrics, Colors } from 'App/Theme'
import { medium } from 'App/Theme/Metrics'
import { Background } from 'App/Components/Ui'

export default class SplashScreen extends React.Component {
  render() {
    return (
      <Background image={Images.background}>
        <View style={[Helpers.fill, Helpers.center]}>
          <View style={Metrics.mediumVerticalPadding}>
            <Image width={Dimensions.get('window').width + medium * 2} source={Images.logoGif} />
          </View>
          <View style={Metrics.mediumVerticalPadding}>
            <ActivityIndicator color={Colors.white} size={'large'} />
          </View>
        </View>
      </Background>
    )
  }
}
