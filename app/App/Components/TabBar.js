import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { BottomTabBar } from 'react-navigation-tabs'

class TabBar extends Component {
  constructor(props) {
    super(props)
    const inTabComponent = ['Services', 'Booking', 'Ambassador', 'More']

    this.filteredProps = {
      ...props,
      navigation: {
        ...props.navigation,
        state: {
          ...props.navigation.state,
          routes: props.navigation.state.routes.filter((item) => inTabComponent.includes(item.key)),
        },
      },
    }
  }

  render() {
    return <BottomTabBar {...this.filteredProps} />
  }
}

TabBar.propTypes = {
  navigation: PropTypes.any,
}

export default TabBar
